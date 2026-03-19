import { useRef, useState, useEffect } from 'react'
import { Card, User } from 'src/__generated__/graphql'
import Icon from '@/components/shared/Icon'
import UserIconPlaceholder from '@/components/shared/UserIconPlaceholder'

interface OpeningCardInputsProps {
  card: Card
  user: User | undefined | null
  setIsSaving: (value: boolean) => void
  updateCardName: (name: string) => void
}

const OpeningCardInputs: React.FC<OpeningCardInputsProps> = ({
  card,
  user,
  setIsSaving,
  updateCardName
}) => {
  const [cardName, setCardName] = useState<string>(card.name || '')
  const [timer, setTimer] = useState<any>(null)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextArea = () => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height = '18px'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  }

  useEffect(resizeTextArea, [cardName])

  const handleTextChange = (value: string) => {
    setCardName(value)
    setIsSaving(true)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      updateCardName(value)
    }, 3000)
    setTimer(newTimer)
  }

  return (
    <>
      <div className="scrollbar--sm flex h-full w-full overflow-hidden overflow-y-auto bg-[url('/assets/static/elements/gradient-background-light.png')] bg-cover bg-center bg-no-repeat pt-[10%] dark:bg-[url('/assets/static/elements/gradient-background.png')]">
        <div className="flex w-full flex-col items-center justify-center justify-between gap-[10%] px-4 text-day-text-label-primary dark:text-white">
          <div className="mb-10 flex h-full items-end">
            <textarea
              ref={textAreaRef}
              rows={1}
              className="scrollbar--hidden leading-2 m-0 ml-[1px] w-full	resize-none overflow-y-hidden border-none bg-transparent p-0 text-center text-3xl font-bold placeholder:italic placeholder:text-support-gray-002 placeholder:opacity-50 focus:outline-none focus:ring-0"
              aria-label="Opening card text input"
              placeholder="Enter opening card text..."
              value={cardName}
              onChange={(e) => handleTextChange(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center pb-[15%]">
            <div
              className={`h-24 w-24 shrink-0 overflow-hidden rounded-full border border-solid border-white border-opacity-10 bg-day-text-label-tertirary-inverse`}
            >
              {!!user?.photoUrl ? (
                <img
                  src={user?.photoUrl}
                  alt="User Image"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  className="h-full h-full object-cover"
                  src="/assets/static/images/avatar-placeholder.png"
                  alt=""
                />
              )}
            </div>
            <div className="mt-[5%] flex w-full flex-col px-5 text-center">
              <span className="text-xl font-bold">
                {!!user?.name ? user?.name : '-'}
              </span>
              <span className="mt-[2%] text-sm font-light">
                {user?.organization?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OpeningCardInputs
