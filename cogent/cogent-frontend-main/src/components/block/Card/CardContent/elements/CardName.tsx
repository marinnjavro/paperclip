type CardNameProps = {
  name: string
}

const CardName = ({ name }: CardNameProps): JSX.Element => {
  return (
    <h2 className="text-sm font-semibold  text-day-text-label-primary dark:text-white sm:text-lg">
      {name}
    </h2>
  )
}

export default CardName
