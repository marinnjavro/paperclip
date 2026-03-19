class AddParentCardIdToCards < ActiveRecord::Migration[7.0]
  def change
    add_column :cards, :parent_card_id, :uuid
  end
end
