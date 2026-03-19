namespace :db do
  namespace :llm do
    task prepare: :environment do
      return unless Rails.env.development?
      version = 20240322013702
      migration = ActiveRecord::MigrationContext.new('db/migrate').migrations.detect { |m| m.version == version }

      Cog.where.not(embedding: nil).delete_all

      ActiveRecord::Migrator.new(:down, [migration], ActiveRecord::SchemaMigration, version).migrate
      ActiveRecord::Migrator.new(:up, [migration], ActiveRecord::SchemaMigration, version).migrate
      puts "Migrated up & down #{migration.name}"
      ActiveRecord::Base.transaction do

        cogs = Cog.create!([
          {name: "Netflix Market Segmentation mini-case study", user_id: User.first.id, is_pinned: false, tags: ["Netflix", "Market segmentation", "Entrepreneurship"], description: "Mini case about Netflix' approach to market segmentation.", is_public: true},
          {name: "Hick's Law", user_id: User.first.id, is_pinned: false, tags: ["Hick's law"], description: "Cog about Hick's law", is_public: true},
          {name: "Business Model Canvas", user_id: User.first.id, is_pinned: false, tags: ["Entrepreneurship", "Business Model Innovation"], description: "This Cog is about the Business Model Canvas", is_public: true},
          {name: "Making the Pizza", user_id: User.first.id, is_pinned: false, tags: ["Pizza cog", "Tutorial"], description: "This Cog describes how to make a pizza. The purpose of this Cog is to show how most simple Cog can be created with three cards one of which is reusable.", is_public: true},
          {name: "Why Knewton Failed", user_id: User.first.id, is_pinned: false, tags: ["Knewton"], description: "Small cog about the failure of Knewton", is_public: true},
          {name: "Airbnb Pitch Deck (2008)", user_id: User.first.id, is_pinned: false, tags: ["Entrepreneurship", "Pitch", "Airbnb"], description: "This Cog presents the pitch deck that AIRBNB used to raise initial capital", is_public: true},
          {name: "Market Segmentation", user_id: User.first.id, is_pinned: true, tags: ["Disciplined entrepreneurship", "MiM6", "MiM7", "Market segmentation"], description: "What is market segmentation? How can markets be analyzed and divided?", is_public: true},
          {name: "Financial statements", user_id: User.first.id, is_pinned: false, tags: ["Balance sheet", "Income statement", "CF statement"], description: "Covering the topic of Balance Sheet, Income Statement, Cash flow Statement, and statement of shareholder equity", is_public: true},
          {name: "Time Value of Money", user_id: User.first.id, is_pinned: false, tags: ["Interest Rate", "Time", "Value"], description: "The time value of money means that a sum of money is worth more now than the same sum of money in the future. \n", is_public: true},
          {name: "Escalating Commitment", user_id: User.first.id, is_pinned: false, tags: ["Escalating commitment", "Sunk costs", "Game", "Entrepreneurship", "Decision making", "Bargaining"], description: "Cog on the concept of escalating commitment and sunk cost.", is_public: true},
          {name: "Angel Investor Game", user_id: User.first.id, is_pinned: false, tags: ["Game", "Angel investor", "Entrepreneurship"], description: "Angel Investor game to be used at the beginning of Entrepreneurship class. This game helps students choose ideas to work on.", is_public: true},
          {name: "Clustering Strategy", user_id: User.first.id, is_pinned: false, tags: ["Strategy", "Clustering", "Basicfit"], description: "Cog about clustering strategy used by businesses. This example focuses on Basic Fit - Europe's leading chain of gyms.", is_public: true},
          {name: "Where to look for insight", user_id: User.first.id, is_pinned: false, tags: ["Hbr", "Insight", "Entrepreneurship"], description: "This Cog is based on the HBR article 'Where to look for insight'", is_public: true},
          {name: "Rise and Fall of FTX", user_id: User.first.id, is_pinned: false, tags: ["Ftx", "Sbf", "Crypto", "Exuberance"], description: "This brief Cog provides a high-level story of the rise and fall of FTX in one block.", is_public: true},
          {name: "Do you have the right stuff to start a business?", user_id: User.first.id, is_pinned: false, tags: ["Entrepreneurship", "Self-diagnosis", "Start a business", "Harvard business press"], description: "Excerpt from 'Entrepreneur's Toolkit: Tools and Techniques to Launch and Grow Your Business'", is_public: true},
          {name: "Risk and Return Fundamentals", user_id: User.first.id, is_pinned: false, tags: ["Risk", "Return"], description: "Risk and Return Fundamentals covers return calculation, risk measurement, and diversification strategies in a brief overview of investment risk and returns.\n", is_public: true},
          {name: "Discounted cash flow analysis", user_id: User.first.id, is_pinned: false, tags: ["DCF", "Cash", "Flow", "Finance"], description: "Discover the power of Discounted Cash Flow (DCF) analysis! Learn how to value future cash flows, make smart investment decisions, and master this essential financial tool.\n\n", is_public: true},
          {name: "The Entrepreneurial Pitch", user_id: User.first.id, is_pinned: false, tags: ["Pitch", "Entrepreneurship"], description: "Cog on how to pitch your startup", is_public: true},
          {name: "Navigating Market Behaviors", user_id: User.first.id, is_pinned: false, tags: ["Valuation", "Market Behaviors", "Capital Budgeting", "Stock Valuation", "Bond Valuation", "Security Market Line"], description: "Cover security market line, capital budgeting, bond and stock valuation, and how market anomalies affect investment strategies.", is_public: true},
          {name: "Beachhead Market", user_id: User.first.id, is_pinned: false, tags: ["Beachhead market", "MiM6", "MiM7", "Entrepreneurship"], description: "A beachhead market is a strategic initial target market segment a company focuses on to establish a strong presence before expanding to broader markets.", is_public: true},
          {name: "Dollar Bargaining Game", user_id: User.first.id, is_pinned: false, tags: ["Escalating commitment", "Dollar game", "Sunk costs", "Game", "Entrepreneurship", "Decision making", "Dollar bargaining game", "Bargaining"], description: "Cog about the Dollar Bargaining game. Professor asks the class to bid on a 20 EUR bill. Rules are simple - each bidder commits to the amount and increase in bid has to be minimum 50 cents.", is_public: true},
        ])
        cogs.each{ |cc| cc.upsert_to_vectorsearch }
      end
    end
  end
end
