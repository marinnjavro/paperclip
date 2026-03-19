namespace :embeddings do
  desc "Generate embeddings for all public cogs with content"
  task backfill_cogs: :environment do
    cogs = Cog.where(is_public: true)
              .where(embedding: nil)
              .where(id: Cog.joins(blocks: :cards).select(:id))

    total = cogs.count
    puts "Generating embeddings for #{total} cogs..."

    cogs.find_each.with_index do |cog, index|
      print "  [#{index + 1}/#{total}] #{cog.name}... "
      cog.upsert_to_vectorsearch
      puts "done"
      sleep 0.5
    end

    puts "Backfill complete."
  end
end
