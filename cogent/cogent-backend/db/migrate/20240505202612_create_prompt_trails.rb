class CreatePromptTrails < ActiveRecord::Migration[7.0]
  def change
    create_table :prompt_trails, id: :uuid do |t|
      t.uuid :cog_id
      t.text :question
      t.text :response

      t.timestamps
    end
  end
end
