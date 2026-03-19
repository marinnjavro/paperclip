class AddIsPinnedToCogs < ActiveRecord::Migration[7.0]
  def change
    add_column :cogs, :is_pinned, :boolean, default: false
  end
end
