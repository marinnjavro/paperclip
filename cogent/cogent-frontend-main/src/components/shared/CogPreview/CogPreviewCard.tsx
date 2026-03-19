import { CardInterface } from '@/utils/types/cogentTypes'
import { trimString } from '@/utils/functions'
import AudioWave from '@/assets/static/elements/audio-wave.svg'
import PlayPause from '@/assets/static/elements/play-pause.svg'
import VideoPlayer from '@/components/shared/VideoPlayer'
import Icon from '@/components/shared/Icon'

type CardTemplateProps = {
  card: CardInterface
  small: boolean
}

const CogPreviewCard = ({ card, small }: CardTemplateProps): JSX.Element => {
  const CardName = ({ name }: { name: string }) => (
    <div className="mb-[1px] truncate text-[2px] font-medium leading-tight text-white">
      {name}
    </div>
  )

  const CardText = ({ text }: { text: string }) => (
    <div
      className="text-[2px] font-medium leading-tight"
      dangerouslySetInnerHTML={{ __html: trimString(text, 350) }}
    ></div>
  )

  const SmallCardPhoto = ({ photoUrl }: { photoUrl: string }) => (
    <div className="fade-md flex justify-center">
      <img
        src={photoUrl}
        width="100%"
        height="100%"
        alt="Card Image"
        className="lower-opacity--image h-[10px] w-full object-cover text-[2px]"
      />
    </div>
  )

  const SmallCardVideo = () => (
    <div className="fade-md flex justify-center">
      <div className="pointer-events-none relative flex h-[10px] w-full justify-center overflow-hidden bg-support-gray-006">
        <div className="absolute top-1/2 left-1/2 h-min w-min -translate-y-1/2 -translate-x-1/2 transform rounded-full bg-day-base-primary p-[1px]"></div>
      </div>
    </div>
  )

  const ActionOption = ({
    option
  }: {
    option: { answer: string; question: string }
  }) => {
    return (
      <div className="flex items-center">
        <Icon
          height={3}
          width={3}
          className={`${
            option.answer ? 'fc-option--correct' : 'fc-option--incorrect'
          } action-icon `}
          type={`${option.answer ? 'actionCheckMark' : 'actionCrossMark'}`}
        />
        <span className="ml-[1px] flex-1 text-[2px] leading-snug">
          {trimString(option.question, 25)}
        </span>
      </div>
    )
  }

  const TextCardPreview = () => (
    <div className="fade-md h-full overflow-hidden p-[2px]">
      {!!card.name && <CardName name={card.name} />}
      {!!card.text && <CardText text={card.text} />}
    </div>
  )

  const PhotoTextCardPreview = () => (
    <div className="fade-md flex h-full flex-col overflow-hidden">
      {!!card.photoUrl && <SmallCardPhoto photoUrl={card.photoUrl} />}
      <div className="p-[2px]">
        {!!card.name && <CardName name={card.name} />}
        {!!card.text && <CardText text={card.text} />}
      </div>
    </div>
  )

  const MultimediaCardPreview = () => (
    <div className="flex h-full flex-col overflow-hidden">
      {!!card.name && (
        <div className="px-[2px] pt-[2px] pb-[1px]">
          <CardName name={card.name} />
        </div>
      )}
      <div className="flex h-full justify-center overflow-hidden">
        {!!card.photoUrl && (
          <img
            src={card.photoUrl}
            width="100%"
            height="100%"
            alt="Card Image"
            className={`${
              card.name ? 'rounded-t-[2px]' : ''
            } w-full text-[2px]`}
          />
        )}
        {!!card.videoUrl && (
          <div
            className={`${
              card.name ? 'rounded-t-[2px]' : ''
            } relative flex w-full justify-center overflow-hidden bg-support-gray-006`}
          >
            <div className="absolute top-1/2 left-1/2 h-min w-min -translate-y-1/2 -translate-x-1/2 transform rounded-full bg-day-base-primary p-[1px]"></div>
          </div>
        )}
      </div>
    </div>
  )

  const AudioCardPreview = () => (
    <div className="flex h-full flex-col overflow-hidden">
      {!!card.name && (
        <div className="p-[2px]">
          <CardName name={card.name} />
        </div>
      )}
      <div
        className={`${
          card.name ? 'mt-[20%] sm:mt-[10%]' : 'mt-[60%]'
        } flex h-full w-full flex-col items-center px-[2px]`}
      >
        {!!card.audioUrl && (
          <>
            <AudioWave />
            <PlayPause className="mt-[30%]" height={3} width={3} />
          </>
        )}
      </div>
    </div>
  )

  const VideoTextCardPreview = () => (
    <div className="fade-md flex h-full flex-col overflow-hidden">
      {!!card.videoUrl && <SmallCardVideo />}
      <div className="p-[2px]">
        {!!card.name && <CardName name={card.name} />}
        {!!card.text && <CardText text={card.text} />}
      </div>
    </div>
  )

  const ActionCardPreview = () => (
    <div className="fade-md flex h-full flex-col overflow-hidden">
      {!!card.photoUrl && <SmallCardPhoto photoUrl={card.photoUrl} />}
      {!!card.videoUrl && <SmallCardVideo />}
      <div className="p-[2px]">
        <CardName name={card.name} />
      </div>
      {!!card.actions && (
        <div className="mx-[2px] flex flex-col gap-[2px] overflow-hidden">
          {card.actions.map((action: any, i: number) => (
            <ActionOption key={`action-option-${i}`} option={card.actions[i]} />
          ))}
        </div>
      )}
    </div>
  )

  // prettier-ignore
  const cardPreviewContent: { [key: string]: JSX.Element } = {
    'photo and text': <PhotoTextCardPreview />,
    'video and text': <VideoTextCardPreview />,
    'text': <TextCardPreview />,
    'multimedia': <MultimediaCardPreview />,
    'audio': <AudioCardPreview />,
    'action': <ActionCardPreview/>
    
  }

  return (
    <div className="card-preview aspect-ratio--wrapper--9-16 w-full cursor-pointer overflow-hidden rounded-[3px] border border-solid border-white border-opacity-5 bg-night-base-03">
      <div className="aspect-ratio--content overflow-hidden">
        {cardPreviewContent[card.cardType]}
      </div>
    </div>
  )
}

export default CogPreviewCard
