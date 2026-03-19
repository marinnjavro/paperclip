class GenerateCogEmbeddingJob < ApplicationJob
  queue_as :default
  retry_on StandardError, attempts: 3, wait: :polynomially_longer

  def perform(cog_id)
    cog = Cog.find(cog_id)
    return unless cog.blocks.joins(:cards).exists?

    cog.upsert_to_vectorsearch
  end
end
