class AddUseForLlmContextOnCogs < ActiveRecord::Migration[7.0]
  def change
    add_column :cogs, :use_for_llm_context, :boolean, default: false
    Cog.where.not(embedding: nil).update_all(use_for_llm_context: true)
  end
end
