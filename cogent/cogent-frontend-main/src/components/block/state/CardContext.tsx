import { createContext, useContext } from 'react'
import { Card } from 'src/__generated__/graphql'

type CardContextType = {
  card: Card
  verticalCards: Card[]
  saveToHistory: (id: string) => void
  removeFromHistory: () => void
}

export const CardContext = createContext<CardContextType | null>(null)

export const useCardContext = () => {
  const cardContext = useContext(CardContext)

  if (!cardContext) {
    throw new Error('cardContext has to be used within <CardContext.Provider>')
  }

  return cardContext
}
