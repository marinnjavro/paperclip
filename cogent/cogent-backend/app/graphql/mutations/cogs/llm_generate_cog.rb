module Mutations
  module Cogs
    class LlmGenerateCog < Mutations::BaseMutation
      description 'Generates new Cog with LLM'

      field :cog, Types::CogType, null: true

      argument :attributes, Types::Input::LlmCogInput, required: true

      def resolve(attributes:)
        authorize!(:create, Cog)
        attr = attributes.to_h
        Faraday.default_connection_options = Faraday::ConnectionOptions.new({timeout: 1000})

        if attr[:url].present?
          settings = {
            length: attr[:length_setting],
            style: attr[:style_setting],
            teach: attr[:teach_setting],
            depth: attr[:depth_setting]
          }.compact
          cog = Llm::CogsFromUrl.new(current_user, attr[:url], attr[:guidance], settings).generate
        elsif attr[:query].present?
          cog = Llm::Cogs.new(current_user, attr[:query]).generate
        else
          raise_error!("Please provide either a URL or a topic to generate from.")
        end

        { cog: cog }
      rescue ArgumentError => e
        raise_error!(e.message)
      rescue Net::ReadTimeout, Net::OpenTimeout
        raise_error!("The website took too long to respond. Please try again.")
      rescue SocketError, Errno::ECONNREFUSED
        raise_error!("Could not reach the website. Please check the URL and try again.")
      rescue RuntimeError => e
        raise_error!(e.message)
      end
    end
  end
end
