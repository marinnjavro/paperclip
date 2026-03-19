class CreateCustomPrompts < ActiveRecord::Migration[7.0]
  def up
    create_table :custom_prompts, id: :uuid do |t|
      t.text :content

      t.timestamps
    end

    execute <<-SQL
      INSERT INTO custom_prompts (content, created_at, updated_at)
      VALUES (
        'You are a university professor and expert skilled in summarizing and creating content.\nYou have been provided with guidelines on how to create the cog in JSON format:\n{{  "cog": "Every single cog is a media project, which consists of Blocks. Every block, in turn, consists of one or more Cards. It consist of name, description, tags, and blocks.",  "blocks": "A Logical block or simply a Block is a basic cog''s structure element. A block consists of one or more cards, which are organised as follows:\n  Block opening card. This card is being created automatically for each given block, but can be deleted by a content creator later on. Main horizontal storyline.\n  That’s a number of cards (of any type) put in certain order. It consist of short name, position, and cards.",\n  "cards": "Card is an atomic piece of content it is an adaptive piece which can combine text and an image. It consist of short name, text, position, and type (''opening'', ''media and text'')."\n}}\n{format_instructions}\nBased on this data, use your creative skills to create an ideal cog about with the similar cog name: {query}.\nCog should be composed of four blocks and {number_of_cards} cards in each block.\nFour blocks should be built with this taxonomy:\n1. Introduction to the Concept: Introduction to new ideas and basic principles.\n2. Problematics: Identification and understanding of related challenges.\n3. Resolution: Application of knowledge to solve identified challenges.\n4. Test Knowledge: Evaluation of learner''s understanding and knowled\nAvoid using sample data or repeating themes.\nThe ''opening'' card type should always be the first card in a block.\n\n',
        NOW(),
        NOW()
      );
    SQL
  end

  def down
    drop_table :custom_prompts
  end
end
