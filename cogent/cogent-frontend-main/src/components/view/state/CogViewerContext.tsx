import { createContext } from 'react'
import { Card } from 'src/__generated__/graphql'

interface CogViewerContextInterface {
  actionCards: Card[]
}

export const CogViewerContext = createContext<CogViewerContextInterface>({
  actionCards: []
})
