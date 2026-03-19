import { useState } from 'react'
import { Card, User } from 'src/__generated__/graphql'
import AudioPlayer from '@/components/shared/AudioPlayer'
import VideoPlayer from '@/components/shared/VideoPlayer'
import ActionCardContent from '@/components/view/FullScreenCard/ActionCardContent'
import CardName from '@/components/view/FullScreenCard/elements/CardName'
import CardText from '@/components/view/FullScreenCard/elements/CardText'
import OpeningCard from '@/components/shared/OpeningCard'
import VerticalStack from '@/components/view/VerticalStack'

interface FullscreenCardProps {
  blockIndex: number
  user?: User
  card: Card
  slideToCard: (fromId: string, toId: string) => void
  verticalCards: Card[]
  nextSlide: () => void
  toggleSwiping: () => void
}

const FullscreenCard: React.FC<FullscreenCardProps> = ({
  blockIndex,
  user,
  card,
  slideToCard,
  verticalCards,
  nextSlide,
  toggleSwiping
}) => {
  const [verticalHistory, setVerticalHistory] = useState<string[]>([])

  const addToHistory = (id: string) => {
    setVerticalHistory([id, ...verticalHistory])
  }

  const removeFromHistory = () => {
    setVerticalHistory(verticalHistory.slice(1))
  }

  // prettier-ignore
  const cardContent: { [key: string]: JSX.Element } = {
    'opening': <OpeningCardContent card={card} user={user} />,
    'media and text': <MediaTextCardContent card={card} slideToCard={slideToCard} addToHistory={addToHistory} blockIndex={blockIndex} />,
    'multimedia': <MultimediaCardContent card={card}  />,
    'audio': <AudioCardContent card={card}  />,
    'action': <ActionCardContent card={card} slideToCard={slideToCard} addToHistory={addToHistory} nextSlide={nextSlide} toggleSwiping={toggleSwiping} blockIndex={blockIndex} />
  }

  return (
    <div className="h-full w-full">
      {verticalHistory.length > 0 && (
        <VerticalStack
          blockIndex={blockIndex}
          verticalCards={verticalCards}
          verticalHistory={verticalHistory}
          removeFromHistory={removeFromHistory}
        />
      )}
      <div
        className={`${
          blockIndex % 2 === 0
            ? 'fullscreen-card--a bg-[#2b2c3d]'
            : 'fullscreen-card--b bg-[#1e1e2b]'
        } relative h-screen w-full overflow-hidden text-base`}
      >
        {cardContent[card.cardType]}
      </div>
    </div>
  )
}

export default FullscreenCard

const OpeningCardContent = ({ card, user }: { card: Card; user?: User }) => (
  <OpeningCard
    blockName={card.name || ''}
    author={user?.name || ''}
    organization={user?.organization?.name || ''}
    photoUrl={user?.photoUrl || ''}
  />
)

const MediaTextCardContent = ({
  card,
  slideToCard,
  addToHistory,
  blockIndex
}: {
  card: Card
  slideToCard: (fromId: string, toId: string) => void
  addToHistory: (id: string) => void
  blockIndex: number
}) => (
  <>
    <div className="flex h-screen items-center justify-center overflow-y-auto bg-[#2b2c3d]">
      <div className="relative h-full max-h-full w-full ">
        <div className="z-1 sticky top-0 flex w-full flex-col items-start justify-between pb-4">
          {/* Top section content */}
          <div
            className={`${
              !!card.photoUrl ? 'h-[344px] bg-[#565879]' : 'h-0'
            } rounded-el-mask relative h-screen w-full overflow-hidden`}
          >
            {!!card.photoUrl && (
              <img
                src={card.photoUrl}
                height="100%"
                width="100%"
                draggable="false"
                alt="Card Image"
                className="rounded-bl-0 no-repeat h-[344px] w-full bg-fixed bg-top object-contain"
              />
            )}
          </div>
          <div
            className={`${
              !!card.videoUrl ? 'h-[344px] bg-black' : 'h-0'
            } w-full`}
          >
            {!!card.videoUrl && (
              <div className="rounded-el-mask full-screen-video-padding h-[322.5px] w-full object-contain">
                <VideoPlayer autoPlay={true} url={card.videoUrl} />
              </div>
            )}
          </div>
        </div>
        <div
          className={`z-2 scroll-padding pointer-events-none relative ${
            card.videoUrl ? '-mt-20' : card.photoUrl ? '-mt-[100px]' : 'mt-5'
          } h-full`}
        >
          {/* Bottom section content */}
          <div className="">
            <div>
              <div className="inverted-border-radius"></div>
              <div
                className={`${
                  blockIndex % 2 === 0
                    ? 'fullscreen-card--a bg-[#2b2c3d]'
                    : 'fullscreen-card--b bg-[#1e1e2b]'
                } pointer-events-auto h-[97%]`}
              >
                <div className="min-h-[284px] overflow-x-hidden px-4 pb-8">
                  <div className="mb-2">
                    <CardName name={card.name || ''} />
                  </div>
                  {!!card.text && (
                    <CardText
                      id={card.id}
                      blockId={card.blockId}
                      text={card.text}
                      slideToCard={slideToCard}
                      handleVerticalOnClick={addToHistory}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

const MultimediaCardContent = ({ card }: { card: Card }) => (
  <>
    <div className="relative h-full w-full overflow-hidden">
      {!!card.photoUrl && (
        <img
          src={card.photoUrl}
          height="100%"
          width="100%"
          draggable="false"
          alt="Card Image"
          className="h-full w-full bg-[#565879] object-contain"
        />
      )}
      <div className="h-full w-full">
        {!!card.videoUrl && <VideoPlayer url={card.videoUrl} autoPlay={true} />}
      </div>
    </div>
  </>
)

const AudioCardContent = ({ card }: { card: Card }) => (
  <>
    <div className="h-screen w-full overflow-hidden px-4">
      <div className="pt-16">
        <CardName name={card.name || ''} />
      </div>
      <div className="h-[75%] px-2 pt-[50%]">
        {!!card.audioUrl && (
          <AudioPlayer url={card.audioUrl} cardId={card.id} />
        )}
      </div>
    </div>
  </>
)
