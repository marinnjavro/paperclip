class CreateCogTrail < ActiveRecord::Migration[7.0]
  def change
    create_table :cog_trails do |t|
      t.integer :original_cog_id
      t.integer :previous_cog_id
      t.integer :new_cog_id

      t.timestamps
    end
  end
end
