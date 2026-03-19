import { Card, User } from 'src/__generated__/graphql'

interface PaginationProps {
  blockIndex: number
  cards: Card[]
  currentIndex: number
  slideTo: (index: number) => void
  isDisabled: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  blockIndex,
  cards,
  currentIndex,
  slideTo,
  isDisabled
}) => {
  return (
    <div className="flex gap-x-2">
      {!!cards &&
        cards.map((card, index) => (
          <PaginationDot
            key={`dot-${index}`}
            blockIndex={blockIndex}
            index={index}
            currentIndex={currentIndex}
            slideTo={slideTo}
            isDisabled={isDisabled}
          />
        ))}
    </div>
  )
}

export default Pagination

const PaginationDot = ({
  blockIndex,
  index,
  currentIndex,
  slideTo,
  isDisabled
}: {
  blockIndex: number
  index: number
  currentIndex: number
  slideTo: (index: number) => void
  isDisabled: boolean
}) => (
  <button
    className={`${
      index <= currentIndex ? 'bg-day-base-secondary' : 'bg-gray-500'
    } h-[3px] flex-1 rounded-[2px]`}
    onClick={() => {
      if (isDisabled) return
      slideTo(index)
    }}
  />
)
