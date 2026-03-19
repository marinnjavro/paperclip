class CreateCogs < ActiveRecord::Migration[7.0]
  def change
    create_table :cogs, id: :uuid do |t|
      t.string :name
      t.references :user, type: :uuid
      t.timestamps
    end
  end
end
