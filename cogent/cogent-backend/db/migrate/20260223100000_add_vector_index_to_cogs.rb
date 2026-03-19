class AddVectorIndexToCogs < ActiveRecord::Migration[7.0]
  # pgvector HNSW/IVFFlat indexes have a 2000 dimension limit.
  # Cog embeddings are 3072d (text-embedding-3-large), so we skip the index.
  # With <1000 cogs, exact search is fast enough.
  # For scale, consider reducing embedding dimensions or using a separate vector store.
  def up
    # No-op: exact search is sufficient for current scale
  end

  def down
    # No-op
  end
end
