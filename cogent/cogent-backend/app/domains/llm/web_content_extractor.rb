module Llm
  class WebContentExtractor
    include HTTParty

    MAX_TOKENS = 12_000 # ~48K chars, leaves room for prompt + format instructions in gpt-4o-mini's 128K context
    REQUEST_TIMEOUT = 15 # seconds
    MIN_CONTENT_LENGTH = 100 # characters
    USER_AGENT = "Mozilla/5.0 (compatible; Cogent/1.0; +https://cogent.lu)"

    MAX_IMAGES = 15
    SKIP_IMAGE_PATTERNS = /icon|logo|sprite|badge|avatar|1x1|pixel|tracking|button|arrow|spacer|protection|shackle/i

    attr_reader :url, :extracted_text, :title, :images

    def initialize(url)
      @url = url.to_s.strip
      @images = []
    end

    def extract
      validate_url!
      fetch_page
      parse_content
      validate_content!
      truncate_to_token_limit
      self
    end

    private

    def validate_url!
      uri = URI.parse(url)
      unless uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
        raise ArgumentError, "Please enter a valid URL starting with http:// or https://"
      end
    rescue URI::InvalidURIError
      raise ArgumentError, "The URL format is invalid. Please check and try again."
    end

    def fetch_page
      response = self.class.get(url, {
        headers: { "User-Agent" => USER_AGENT, "Accept" => "text/html" },
        timeout: REQUEST_TIMEOUT,
        follow_redirects: true
      })

      unless response.success?
        raise "The website returned an error (#{response.code}). It may be blocking access."
      end

      if response.body.blank?
        raise "The page returned empty content."
      end

      @raw_html = response.body
    end

    def parse_content
      doc = Nokogiri::HTML(@raw_html)

      # Extract title
      @title = doc.at_css('title')&.text&.strip

      # Remove non-content elements
      removable = %w[
        script style nav header footer aside form iframe noscript
        svg [role="navigation"] [role="banner"] [role="contentinfo"]
        .sidebar .navigation .menu .nav .advertisement .ads .cookie-banner
        .social-share .comments #comments
      ]
      removable.each { |selector| doc.css(selector).remove }

      # Try to find main content area, fall back to body
      main = doc.at_css('article') ||
             doc.at_css('main') ||
             doc.at_css('[role="main"]') ||
             doc.at_css('.content') ||
             doc.at_css('#content') ||
             doc.at_css('body')

      # Extract images from the content area
      extract_images(main)

      # Extract text, preserving some structure with newlines
      @extracted_text = extract_text_from(main).strip
    end

    def extract_images(node)
      return if node.nil?

      seen = Set.new
      node.css('img').each do |img|
        src = img['src'] || img['data-src'] || img['data-original']
        next if src.blank?

        # Skip data URIs and tiny inline images
        next if src.start_with?('data:')

        # Skip icons, logos, spacers, etc.
        next if src.match?(SKIP_IMAGE_PATTERNS)

        # Also check alt text for icon/logo patterns
        alt = img['alt'].to_s
        next if alt.match?(SKIP_IMAGE_PATTERNS)

        # Resolve relative URLs to absolute
        begin
          absolute_url = URI.join(url, src).to_s
        rescue URI::InvalidURIError, URI::BadURIError
          next
        end

        # Deduplicate
        next if seen.include?(absolute_url)
        seen.add(absolute_url)

        @images << absolute_url
        break if @images.length >= MAX_IMAGES
      end
    end

    def extract_text_from(node)
      return "" if node.nil?

      # Walk through child nodes to preserve paragraph structure
      text_parts = []
      node.children.each do |child|
        if child.text?
          cleaned = child.text.gsub(/\s+/, ' ').strip
          text_parts << cleaned unless cleaned.empty?
        elsif %w[p div h1 h2 h3 h4 h5 h6 li blockquote tr].include?(child.name)
          inner = extract_text_from(child)
          text_parts << "\n#{inner}\n" unless inner.strip.empty?
        elsif child.name == 'br'
          text_parts << "\n"
        else
          text_parts << extract_text_from(child)
        end
      end

      text_parts.join(' ').gsub(/\n\s+\n/, "\n\n").gsub(/\n{3,}/, "\n\n")
    end

    def validate_content!
      if extracted_text.length < MIN_CONTENT_LENGTH
        raise "The page has too little text content to generate a Cog from. Try a different URL with more written content."
      end
    end

    def truncate_to_token_limit
      encoder = Tiktoken.encoding_for_model("gpt-4o-mini")
      tokens = encoder.encode(extracted_text)

      if tokens.length > MAX_TOKENS
        @extracted_text = encoder.decode(tokens.first(MAX_TOKENS))
      end
    end
  end
end
