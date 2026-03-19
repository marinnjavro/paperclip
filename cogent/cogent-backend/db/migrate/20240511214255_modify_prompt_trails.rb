class ModifyPromptTrails < ActiveRecord::Migration[7.0]
  def up
    # Add new columns
    add_column :prompt_trails, :object_type, :string
    add_column :prompt_trails, :object_id, :uuid


    # Migrate data
    execute <<-SQL
      UPDATE prompt_trails
      SET object_id = cog_id, object_type = 'Cog'
    SQL

    # Remove old column
    remove_column :prompt_trails, :cog_id
  end

  def down
    # Add old column
    add_column :prompt_trails, :cog_id, :uuid

    # Migrate data back
    execute <<-SQL
      UPDATE prompt_trails
      SET cog_id = object_id
      WHERE object_type = 'Cog'
    SQL

    # Remove new columns
    remove_column :prompt_trails, :object_id
    remove_column :prompt_trails, :object_type
  end
end