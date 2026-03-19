class AddMediaAndTextCardType < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'card_types' AND e.enumlabel = 'media and text') THEN
          ALTER TYPE card_types ADD VALUE 'media and text';
        END IF;
      END $$;
    SQL
  end
  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

