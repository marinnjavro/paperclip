import { Card } from 'src/__generated__/graphql'

const Name = ({ card }: { card: Card }) => {
  return (
    <h3 className="mr-1 px-3 pt-3 text-xxs font-bold leading-tight text-day-text-label-primary dark:text-white">
      {card.name}
    </h3>
  )
}

export default Name
