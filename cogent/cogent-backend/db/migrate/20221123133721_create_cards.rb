# rails db:migrate:down VERSION=20221123133721
# rails db:migrate:up VERSION=20221123133721
# select enum_range(NULL::card_types)
# ALTER TYPE card_types ADD VALUE 'video and text';
class CreateCards < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      CREATE TYPE card_types AS ENUM ('opening', 'text', 'photo and text', 'video and text', 'audio', 'multimedia', 'action');
    SQL
    create_table :cards, id: :uuid do |t|
      t.string :name
      t.column :card_type, :card_types
      t.text   :text
      t.references :block, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
  def down
    drop_table :cards
    execute <<-SQL
      DROP TYPE IF EXISTS card_types;
    SQL
  end
end
