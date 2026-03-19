class AddPositionToBlocks < ActiveRecord::Migration[7.0]
  def change
    add_column :blocks, :position, :integer
  end
end
