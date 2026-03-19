import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { Cog, Card } from 'src/__generated__/graphql'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import {
  formatTime,
  getDifferenceInSeconds,
  secondsToMinutesAndSeconds
} from '@/utils/time'
import { CogViewerContext } from '@/components/view/state/CogViewerContext'

import ButtonPrimary from '@/components/shared/ButtonPrimary'
import Icon from '@/components/shared/Icon'
import Pie from '@/components/shared/Pie'
import EmailInput from '@/components/view/EmailInput'

interface ClosingCardProps {}

const FEEDBACK_MESSAGE = {
  75: {
    title: 'Well played',
    subtitle: "You're doing great!",
    score: 'Good job!'
  },
  50: {
    title: 'You can do better',
    subtitle: "You're doing great!",
    score: 'Normal'
  },
  20: {
    title: 'Try it again',
    subtitle: "You're doing great!",
    score: 'Bad'
  }
}

const ClosingCard: React.FC<ClosingCardProps> = () => {
  const router = useRouter()
  const { cogId } = router.query
  const { actionCards } = useContext(CogViewerContext)

  const [isInputOpen, setIsInputOpen] = useState(false)

  const [results, setResults] = useLocalStorage(`RESULTS_${cogId}`, null)
  const currentReplay = results?.replays?.slice(-1)[0]

  useEffect(() => {
    // when student reaches closing card, end the current replay
    if (!!results.replays.slice(-1)[0].endDate) return

    const updatedResults = { ...results }
    updatedResults.replays.slice(-1)[0].endDate = new Date().toLocaleString()
    setResults(updatedResults)
  }, [])

  const getScore = () => {
    let score = 0
    const maxScore = actionCards.length

    /* if there are no action cards, user always scores 100% */
    if (!(actionCards.length > 0)) {
      return 100
    }

    actionCards.forEach((card) => {
      // find correct answers for each action card
      const correctAnswers = card?.actions?.reduce(
        (c: number[], v: { question: string; answer: boolean }, i: number) =>
          v.answer === true ? c.concat(i) : c,
        []
      )

      // check user's answers
      const isSelectionCorrect = _.isEmpty(
        _.xor(correctAnswers, currentReplay?.answers[card.id])
      )

      if (isSelectionCorrect) {
        score++
      }
    })

    return Math.round((score / maxScore) * 100)
  }

  const getFeedbackMessage = (score: number) => {
    if (score >= 75) return FEEDBACK_MESSAGE[75]
    if (score >= 50) return FEEDBACK_MESSAGE[50]
    if (score >= 0) return FEEDBACK_MESSAGE[20]
  }

  const getDuration = () => {
    if (!currentReplay.startDate || !currentReplay.endDate) return '00:00'

    const seconds = getDifferenceInSeconds(
      new Date(currentReplay.startDate),
      new Date(currentReplay.endDate)
    )
    return formatTime(seconds)
  }

  const handleReplay = () => {
    router.reload()
  }

  const feedback = getFeedbackMessage(getScore())

  return (
    <div className="relative flex h-[100vh] w-full flex-col justify-end bg-[#2E2E43]">
      <EmailInput isOpen={isInputOpen} setIsOpen={setIsInputOpen} />
      <div className="absolute overflow-hidden">
        <img
          src="/assets/static/elements/closing-card-background.png"
          className="fade-md h-full"
          draggable={false}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black opacity-90"
      ></div>

      <div className="page-spacing z-10">
        <div className="text-center">
          <h1 className="pb-[14px] text-5xl font-semibold text-white">
            {feedback?.title}
          </h1>
          <p className="text-lg font-medium text-white">{feedback?.subtitle}</p>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="relative">
            <Pie percentage={20} color="#7102FF" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-white">{getDuration()}</p>
              <p className="text-sm text-white">Quickly</p>
            </div>
          </div>
          <div className="relative">
            <Pie percentage={getScore()} color="#06E9EE" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-white">{getScore()}%</p>
              <p className="text-sm text-white">{feedback?.score}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center px-4 pb-16">
          <ReplayButton replay={() => handleReplay()} />
          <div className="w-full pt-4">
            <ButtonPrimary
              label="Submit result"
              icon="chevronRight"
              classNames="w-full"
              onClick={() => setIsInputOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const ReplayButton = ({ replay }: { replay: () => void }) => (
  <div
    className="flex w-full cursor-pointer items-center justify-center gap-2 p-4 text-white"
    onClick={() => replay()}
  >
    <p className="text-sm font-semibold">Try again</p>
    <Icon type="cog" width={20} height={20} />
  </div>
)

export default ClosingCard
