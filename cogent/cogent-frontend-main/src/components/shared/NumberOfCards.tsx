type NumberOfCardsProps = {
  cardsNumber: number
}

const NumberOfCards = ({ cardsNumber }: NumberOfCardsProps): JSX.Element => {
  return (
    <div className="mt-2">
      <div className="flex items-center font-semibold">
        <span className="mr-2">Cards</span>
        <div className="min-w-[2.2rem] rounded-xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-04 px-2 py-1.5 text-center text-sm dark:border-white dark:border-opacity-10 dark:bg-night-base-02 ">
          <span>{cardsNumber}</span>
        </div>
      </div>
    </div>
  )
}

export default NumberOfCards
