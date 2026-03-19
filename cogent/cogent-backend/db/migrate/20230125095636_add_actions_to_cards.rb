class AddActionsToCards < ActiveRecord::Migration[7.0]
  def change
    add_column :cards, :actions, :json
  end
end
