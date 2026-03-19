const CardName = ({
  name,
  truncate = false
}: {
  name: string
  truncate?: boolean
}) => {
  return (
    <h3
      className={`${
        truncate ? 'truncate' : ''
      } px-2 font-semibold leading-tight text-day-text-label-primary dark:text-white sm:px-3`}
    >
      {name}
    </h3>
  )
}

export default CardName
