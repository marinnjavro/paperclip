const MultipleAnswersToolTip = ({
  selectedAnswers,
  totalAnswers
}: {
  selectedAnswers: number
  totalAnswers: number
}) => {
  return (
    <div className="flex rounded bg-day-base-secondary-darker p-1 text-xs font-light text-day-base-secondary">
      <span className="mr-2">multiple answers</span>
      <span>
        {selectedAnswers}/{totalAnswers}
      </span>
    </div>
  )
}

export default MultipleAnswersToolTip
