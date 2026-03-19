import { useState, useEffect } from 'react'
import { Card } from 'src/__generated__/graphql'
import { OptionType } from '@/utils/types/cogentTypes'
import useLocalStorage from '@/utils/hooks/useLocalStorage'

import ButtonPrimary from '@/components/shared/ButtonPrimary'
import ActionOption from '@/components/view/FullScreenCard/ActionCardContent/ActionOption'
import MultipleAnswersToolTip from '@/components/view/FullScreenCard/ActionCardContent/MultipleAnswersTooltip'
import CardText from '@/components/view/FullScreenCard/elements/CardText'
import ActionMedia from '@/components/view/FullScreenCard/ActionCardContent/ActionMedia'
import CardName from '../elements/CardName'

interface ActionCardContentProps {
  card: Card
  slideToCard: (fromId: string, toId: string) => void
  addToHistory: (id: string) => void
  nextSlide: () => void
  toggleSwiping: () => void
  blockIndex: number
}

const ActionCardContent = ({
  card,
  slideToCard,
  addToHistory,
  nextSlide,
  toggleSwiping,
  blockIndex
}: ActionCardContentProps) => {
  const [results, setResults] = useLocalStorage(
    `RESULTS_${card?.block?.cogId}`,
    null
  )

  const currentReplay = results?.replays.slice(-1)[0]
  const isSubmitted = currentReplay?.answers[card?.id]?.length > 0

  const [answers, setAnswers] = useState<OptionType[]>([])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  useEffect(() => {
    if (!card?.actions) return
    if (!isSubmitted) {
      toggleSwiping()
    }

    const answers = card?.actions
      .filter((option: OptionType) => option.answer === true)
      .map((answer: OptionType) => `option-${card?.actions.indexOf(answer)}`)

    setAnswers(answers)
  }, [])

  const handleOptionOnClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    e.stopPropagation()
    if (isSubmitted) return
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value])
      return
    }
    const filteredArray = selectedOptions.filter((option) => option !== value)
    setSelectedOptions(filteredArray)
  }

  const handleSubmitAnswer = () => {
    // save selected options to local storage
    const updatedReplay = { ...currentReplay }
    const formattedSelection = selectedOptions.map((option) =>
      parseInt(option.slice(-1))
    )
    updatedReplay.answers[card?.id] = formattedSelection

    const updatedResults = { ...results }
    updatedResults.replays.slice(-1)[0] = updatedReplay
    setResults(updatedResults)

    if (!card?.actions) return
    toggleSwiping()
  }

  return (
    <div className="h-[100vh] overflow-hidden">
      <div className="flex h-screen items-center justify-center bg-[#2b2c3d]">
        <div className="relative h-full max-h-full w-full overflow-y-auto">
          <div className="z-1 sticky top-0 flex w-full flex-col items-start justify-between pb-6">
            {/* Top section content */}
            <ActionMedia card={card} />
            <div></div>
          </div>
          <div
            className={`z-2 pointer-events-none relative ${
              card.photoUrl || card.videoUrl ? '-mt-20' : 'mt-5'
            } h-full`}
          >
            {/* Bottom section content */}

            <div className="scroll-padding z-1">
              <div>
                <div className="inverted-border-radius"></div>
                <div
                  className={`${
                    blockIndex % 2 === 0
                      ? 'fullscreen-card--a bg-[#2b2c3d]'
                      : 'fullscreen-card--b bg-[#1e1e2b]'
                  } pointer-events-auto h-[97%]`}
                >
                  <div className="overflow-x-hidden px-4 pb-8">
                    {!!answers && answers?.length >= 2 && (
                      <div className="ml-4 flex">
                        <MultipleAnswersToolTip
                          selectedAnswers={selectedOptions.length}
                          totalAnswers={answers.length}
                        />
                      </div>
                    )}
                    <div className="mb-2">
                      <CardName name={card.name || ''} />
                    </div>
                    <p className="mb-5 text-sm font-medium opacity-75">
                      Choose the correct answer:
                    </p>
                    <div
                      className="flex cursor-auto flex-col gap-3 text-sm text-support-gray-002"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {!!card?.actions &&
                        card?.actions?.map((action: OptionType, i: number) => (
                          <ActionOption
                            id={`option-${i}`}
                            key={`action-option-${i}`}
                            option={card?.actions[i]}
                            isSelected={selectedOptions.includes(`option-${i}`)}
                            handleOnClick={handleOptionOnClick}
                            answerSubmitted={isSubmitted}
                          />
                        ))}
                    </div>

                    <div
                      className={`${
                        isSubmitted ? 'pb-0' : 'pb-32'
                      } mt-16 flex w-full justify-center`}
                    >
                      <div className="flex w-full flex-col items-center justify-center">
                        {!isSubmitted ? (
                          <ButtonPrimary
                            label="Answer the question"
                            iconPosition="right"
                            icon="arrowsRight"
                            onClick={() => handleSubmitAnswer()}
                            classNames="w-full"
                          />
                        ) : (
                          <ButtonPrimary
                            label="Continue"
                            iconPosition="right"
                            icon="arrowsRight"
                            onClick={() => nextSlide()}
                            classNames="w-full"
                          />
                        )}
                      </div>
                    </div>
                    {isSubmitted && (
                      <div className="mt-10 w-full border-t border-solid border-white border-opacity-10">
                        <div className="pt-7">
                          <CardText
                            id={card?.id}
                            text={card?.text || ''}
                            blockId={card?.blockId}
                            slideToCard={slideToCard}
                            handleVerticalOnClick={addToHistory}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActionCardContent
