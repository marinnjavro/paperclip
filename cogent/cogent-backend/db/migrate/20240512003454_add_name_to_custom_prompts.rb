class AddNameToCustomPrompts < ActiveRecord::Migration[7.0]
  def change
    add_column :custom_prompts, :name, :string
    add_column :custom_prompts, :notes, :text
    CustomPrompt.update_all(name: 'Llm::Cogs')
    %w[Llm::Cards Llm::Dalle].each do |name|
      CustomPrompt.new(name: name).save(validate: false)
    end
  end
end
