import { Card } from 'src/__generated__/graphql'

export const filterOpeningCards = (cards: Card[]) =>
  cards.filter((card: Card) => card.cardType !== 'opening')

export const getOpeningCard = (cards: Card[]) =>
  cards.find((card: Card) => card.cardType === 'opening')

export const getActionCards = (cards: Card[]) =>
  cards.filter((card: Card) => card.cardType === 'action')
