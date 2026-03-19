import { useEffect, useState } from 'react'

type ElementIndexNumberProps = {
  index: number
  elementId: string
  updateIndex?: (elementId: string, value: number) => void
  disabled?: boolean
}

const getIndexString = (index: number): string => {
  let indexString = index.toString()
  if (index >= 0 && index <= 9) {
    indexString = `0${indexString}`
  }
  return indexString
}

const ElementIndexNumber = ({
  index,
  elementId,
  updateIndex,
  disabled = false
}: ElementIndexNumberProps): JSX.Element => {
  const [indexInput, setIndexInput] = useState<string>(getIndexString(index))
  const [timer, setTimer] = useState<any>(null)

  useEffect(() => {
    setIndexInput(getIndexString(index))
  }, [index])

  const onIndexChange = (value: string) => {
    setIndexInput(value)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      if (!updateIndex) return
      updateIndex(elementId, parseInt(value))
    }, 2000)
    setTimer(newTimer)
  }

  return (
    <div className="mt-2">
      <div className="w-min min-w-[2.1rem] rounded-xl border border-solid border-opacity-violet border-opacity-0 bg-opacity-violet bg-opacity-30 py-1.5 dark:border-night-base-secondary-darker dark:bg-night-base-secondary-darker">
        <span className="flex text-sm font-semibold text-support-violet-101 dark:text-night-base-secondary">
          <input
            type="text"
            name="index"
            className="block w-[2.1rem] w-full rounded-md border-none bg-transparent py-0 px-1 text-center text-sm placeholder:text-support-violet-101 focus:outline-none focus:ring-0 dark:bg-night-base-secondary-darker dark:placeholder:text-night-base-secondary"
            value={indexInput}
            onChange={(e) => onIndexChange(e.target.value)}
            disabled={disabled}
          />
        </span>
      </div>
    </div>
  )
}

export default ElementIndexNumber
