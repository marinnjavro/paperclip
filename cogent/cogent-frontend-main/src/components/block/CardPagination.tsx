import { Card, User } from 'src/__generated__/graphql'

interface CardPaginationProps {
  cards: Card[]
  progress: number
}

const CardPagination: React.FC<CardPaginationProps> = ({ cards, progress }) => {
  const widthPrecentage = 100 / cards.length - 1

  return (
    <div className="mx-4 mt-4 flex gap-x-2">
      {cards.map((card, index) => (
        <PaginationDot
          key={`dot-${index}`}
          index={index}
          progress={progress}
          progressPrecentage={widthPrecentage * index}
        />
      ))}
    </div>
  )
}

export default CardPagination

const PaginationDot = ({
  index,
  progress,
  progressPrecentage
}: {
  index: number
  progress: number
  progressPrecentage: number
}) => {
  const isActive = index === 0 || (progress / progressPrecentage) * 100 >= 100
  return (
    <button
      className={`${
        isActive
          ? 'bg-day-base-primary dark:bg-night-base-secondary'
          : 'bg-opacity-silver opacity-40'
      } h-[3px] flex-1 rounded-[2px]`}
    />
  )
}
