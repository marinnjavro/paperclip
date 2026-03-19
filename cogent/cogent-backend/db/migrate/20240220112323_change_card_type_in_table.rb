class ChangeCardTypeInTable < ActiveRecord::Migration[7.0]
  def up
    Card.where(card_type: 'text').update_all(card_type: 'media and text')
    Card.where(card_type: 'photo and text').update_all(card_type: 'media and text')
    Card.where(card_type: 'video and text').update_all(card_type: 'media and text')
  end

  def down
    Card.where(card_type: 'media and text').update_all(card_type: 'photo and text')
  end
end
