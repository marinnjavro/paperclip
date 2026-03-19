class AddVectorColumnToCards < ActiveRecord::Migration[7.0]
  def change
    add_column :cogs, :embedding, :vector,
      limit: LangchainrbRails
        .config
        .vectorsearch
        .llm
        .default_dimension
  end
  # LangchainrbRails
  #   .config
  #   .vectorsearch
  #   .llm
  #   .default_dimension 3072
end
