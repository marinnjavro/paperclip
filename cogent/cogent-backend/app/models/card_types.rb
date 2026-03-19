# frozen_string_literal: true

class CardTypes
  attr_reader :type
  TYPES = ['opening', 'media and text', 'text', 'photo and text', 'video and text', 'audio', 'multimedia', 'action'].freeze

  CATEGORIES = {
    'teaching' => ['opening', 'text', 'photo and text', 'video and text', 'audio', 'multimedia', 'media and text'].freeze,
    'testing'  => ['action'].freeze
  }.freeze

  def initialize(type)
    @type = type
  end

  def category
    self.class.category_for(type)
  end

  def self.category_for(card_type)
    CATEGORIES.find { |_cat, types| types.include?(card_type) }&.first
  end

  def self.types_for_category(category)
    CATEGORIES[category] || []
  end

  def self.all_categories
    CATEGORIES.keys
  end
end
