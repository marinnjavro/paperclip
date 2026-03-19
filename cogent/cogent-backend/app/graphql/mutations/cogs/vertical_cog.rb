module Mutations
  module Cogs
    class VerticalCog < Mutations::BaseMutation
      description 'Creates Vertical Cog'

      field :cog, Types::CogType, null: true

      argument :id, ID, required: true
      argument :parent_card_id, ID, required: true
      #argument :attributes, Types::Input::CogInput, required: true


      def resolve(id:, parent_card_id:)
        authorize!(:create, Cog)
        original_cog = Cog.find(id)
        parent_card = Card.find(parent_card_id)
        first_card = nil
        before_card = nil
        total_cards_count = original_cog.cards.count
        # ActiveRecord::Base.transaction do
        #   blocks = original_cog.blocks.order(position: :asc)
        #   blocks.each_with_index do |block, block_index|
        #   cards = block.cards.order(position: :asc)
        #     ap cards
        #     cards.each_with_index do |card, index|
        #       if block.position == 1 && card.position == 1
        #         parent_card_id = parent_card.id
        #       else
        #         parent_card_id = before_card.id
        #       end
        #       #if card.card_type != 'opening'
        #       new_card = card.amoeba_dup
        #       new_card.parent_card_id = parent_card_id
        #       new_card.block_id = parent_card.block_id
        #       new_card.save
        #
        #       ap "---------------"
        #       ap "#{block.position} - #{card.position}"
        #       ap new_card.id
        #       ap parent_card_id
        #       ap block.position == 1 && card.position == 1
        #       ap "---------------"
        #       before_card = new_card
        #       first_card = new_card if block.position == 1 && card.position == 1
        #     end
        #   end
        # end
        { cog: original_cog }
      end
    end
  end
end
#<p>Exploring the impact of trade restrictions on the German economy in the Cold War era.</p>
#<p>The disruptions in trade routes due to the war further exacerbated the economic difficulties faced by Croatia.</p>


#model_errors!(new_record)
# if new_record.save
#   blocks = new_record.blocks.order(position: :asc)
#   #BLOCKS HAVE TO BE THE SAME AS THE ORIGINAL
#   blocks.each_with_index do |block, index|
#     parent_card_id = blocks[index-1].cards.order(position: :asc).last.id if block.position != 1
#     block.cards.order(position: :asc).first.update!(parent_card_id: parent_card_id)
#     cards = block.cards.order(position: :asc)
#     cards.each_with_index do |card, index|
#       card.update(block_id: original_record.block_id)
#       if index+1 <= cards.count
#         cards[index+1].update!(parent_card_id: card.id) if cards[index+1]
#       end
#     end
#   end
#   { cog: new_record }
# else
#   model_errors!(new_record)
# end

# ActiveRecord::Base.transaction do
#   blocks = original_cog.blocks.order(position: :asc)
#   blocks.each_with_index do |block, block_index|
#     cards = block.cards.order(position: :asc)
#     ap cards
#     cards.each_with_index do |card, index|
#       if block.position == 1 && card.position == 1
#         parent_card_id = parent_card.id
#       elsif block.position != blocks[block_index-1].position && card.position == 1
#         parent_card_id = blocks[index-1].cards.order(position: :asc).last.id
#       else
#         parent_card_id = cards[index-1].id
#       end
#       #if card.card_type != 'opening'
#       new_card = card.amoeba_dup
#       new_card.parent_card_id = parent_card_id
#       new_card.block_id = parent_card.block_id
#       new_card.save
#
#       ap "---------------"
#       ap "#{block.position} - #{card.position}"
#       ap new_card.id
#       ap parent_card_id
#       ap "---------------"
#
#       first_card = new_card if index == 0
#     end
#   end
# end

#<p>Exploring the impact of trade restrictions on the German economy in the Cold War era.</p>
#<p>The disruptions in trade routes due to the war further exacerbated the economic difficulties faced by Croatia.</p>
#<p>The division of Germany into East and West Germany occurred after World War II, with the eastern part falling under Soviet influence and the western part under Western influence. This division lasted until the reunification of Germany in 1990.</p>
