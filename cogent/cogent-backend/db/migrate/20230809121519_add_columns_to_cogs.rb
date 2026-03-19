class AddColumnsToCogs < ActiveRecord::Migration[7.0]
  def change
    add_column :cogs, :tags, :text, array: true, default: [], null: false
    add_column :cogs, :description, :string
    add_column :cogs, :is_public, :boolean, default: false
  end
end
