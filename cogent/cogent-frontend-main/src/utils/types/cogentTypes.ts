export interface CogInterface {
  id: string
  name: string
  blocks: BlockInterface[]
}

export interface BlockInterface {
  id: string
  name: string
  position: number
  cards: CardInterface[]
}

export interface CardInterface {
  cardType: string
  blockId: string
  id: string
  name: string
  photoUrl?: string | any
  videoUrl?: string | any
  audioUrl?: string | any
  position: number
  text?: string
  actions?: any
}

export type OptionType = {
  question: string
  answer: boolean
}
