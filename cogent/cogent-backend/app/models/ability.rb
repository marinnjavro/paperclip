# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    can :read, User, :email, id: user.id
    can :read, User, :phone, id: user.id
    can :update, User, id: user.id

    if user.has_role?(:staff) || user.has_role?(:super_admin)
      can :create, Cog
      can :update, Cog, user_id: user.id
      can :destroy, Cog, user_id: user.id

      can :create, Block
      can :update, Block, cog: { user_id: user.id }
      can :destroy, Block, cog: { user_id: user.id }

      can :create, Card
      can :update, Card, cog: { user_id: user.id }
      can :destroy, Card, cog: { user_id: user.id }

      # can :update, BroadcastChatSignup do |broadcast_chat_signup|
      #   talent_profile_id = broadcast_chat_signup.broadcast_chat.talent_profile_id
      #   talent_profile_id == user.talent_profile.id
      # end
    end

    return unless user.has_role?(:super_admin)

    can :manage, :all

    # Define abilities for the user here. For example:
    #
    #   return unless user.present?
    #   can :read, :all
    #   return unless user.admin?
    #   can :manage, :all
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, published: true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/blob/develop/docs/define_check_abilities.md
  end
end
