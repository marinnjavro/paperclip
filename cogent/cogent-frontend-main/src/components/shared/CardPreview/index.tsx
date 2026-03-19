import { Card, User } from 'src/__generated__/graphql'
import AudioWave from '@/assets/static/elements/audio-wave.svg'
import PlayPause from '@/assets/static/elements/play-pause.svg'
import Play from '@/assets/static/elements/play.svg'
import Icon from '@/components/shared/Icon'
import UserIconPlaceholder from '@/components/shared/UserIconPlaceholder'

type CardTemplateProps = {
  user: User
  card: Card
  small?: boolean
}

const CardPreview = ({
  user,
  card,
  small = false
}: CardTemplateProps): JSX.Element => {
  // prettier-ignore
  const cardPreviewContent: { [key: string]: JSX.Element } = {
    'opening': <OpeningCardPreview card={card} user={user}/>,
    'photo and text': <PhotoTextCardPreview card={card} />,
    'video and text': <VideoTextCardPreview card={card} />,
    'media and text': <MediaTextCardPreview card={card} />,
    'text': <TextCardPreview card={card} />,
    'multimedia': <MultimediaCardPreview card={card}/>,
    'audio': <AudioCardPreview card={card} />,
    'action': <ActionCardPreview card={card} />
    
  }

  return (
    <div className="card-preview aspect-ratio--wrapper--9-16 w-full cursor-pointer overflow-hidden rounded-lg border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 p-0 dark:border-white dark:border-opacity-10 dark:bg-night-base-03">
      <div className="aspect-ratio--content pointer-events-none overflow-hidden break-words">
        {cardPreviewContent[card.cardType]}
      </div>
    </div>
  )
}

export default CardPreview

const CardName = ({ name }: { name: string }) => (
  <div className="mb-2 truncate text-[8px] font-medium leading-tight text-day-text-label-primary dark:text-white">
    {name}
  </div>
)

const CardText = ({ text }: { text: string }) => (
  <div
    className="text-[6px] 
     font-medium leading-tight"
    dangerouslySetInnerHTML={{ __html: text }}
  ></div>
)

const SmallCardPhoto = ({ photoUrl }: { photoUrl: string }) => (
  <div className="fade-md flex justify-center">
    <img
      src={photoUrl}
      width="100%"
      height="100%"
      alt="Card Image"
      className="h-[45px] w-full object-cover text-[4px]"
    />
  </div>
)

const SmallCardVideo = ({ videoUrl }: { videoUrl: string }) => (
  <div className="fade-md flex justify-center">
    <div className="pointer-events-none flex h-[45px] w-full items-center justify-center overflow-hidden bg-support-gray-006">
      <Play width={16} height={16} className="pb-[5%]" />
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
        height={12}
        width={12}
        className={`${
          option.answer ? 'fc-option--correct' : 'fc-option--incorrect'
        } action-icon `}
        type={`${option.answer ? 'actionCheckMark' : 'actionCrossMark'}`}
      />
      <span
        className="ml-1.5 flex-1
        text-[6px] leading-snug"
      >
        {option.question}
      </span>
    </div>
  )
}

const OpeningCardPreview = ({ card, user }: { card: Card; user: User }) => (
  <div className="h-full w-full overflow-y-hidden bg-[url('/assets/static/elements/gradient-background.png')] bg-cover bg-center bg-no-repeat">
    <div className="flex h-full w-full flex-col items-center justify-center justify-between gap-[10%] px-2 text-white">
      <div className="mb-[10%] flex h-full w-full items-end break-words text-center">
        <h2 className="w-full text-xs font-bold leading-tight line-clamp-3">
          {card.name}
        </h2>
      </div>
      <div className="flex w-full flex-col items-center justify-center pb-[15%]">
        <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-solid border-white border-opacity-10 bg-day-text-label-tertirary-inverse">
          {!!user?.photoUrl ? (
            <img
              src={user?.photoUrl}
              alt="User Image"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserIconPlaceholder size="sm" />
          )}
        </div>
        <div className="mt-[5%] flex w-full flex-col text-center">
          <span className="w-full text-[10px] font-bold line-clamp-2">
            {!!user?.name ? user.name : '-'}
          </span>
          <span className="mt-[2%] truncate text-[8px] text-xs font-light">
            {user?.organization?.name}
          </span>
        </div>
      </div>
    </div>
  </div>
)

const TextCardPreview = ({ card }: { card: Card }) => (
  <div className="fade-md h-full overflow-hidden p-2.5">
    {!!card.name && <CardName name={card.name} />}
    {!!card.text && <CardText text={card.text} />}
  </div>
)

const PhotoTextCardPreview = ({ card }: { card: Card }) => (
  <div className="fade-md flex h-full flex-col overflow-hidden">
    {!!card.photoUrl && <SmallCardPhoto photoUrl={card.photoUrl} />}
    <div className="p-2.5">
      {!!card.name && <CardName name={card.name} />}
      {!!card.text && <CardText text={card.text} />}
    </div>
  </div>
)

const MediaTextCardPreview = ({ card }: { card: Card }) => (
  <div className="fade-md flex h-full flex-col overflow-hidden">
    {!!card.photoUrl && <SmallCardPhoto photoUrl={card.photoUrl} />}
    {!!card.videoUrl && <SmallCardVideo videoUrl={card.videoUrl} />}
    <div className="p-2.5">
      {!!card.name && <CardName name={card.name} />}
      {!!card.text && <CardText text={card.text} />}
    </div>
  </div>
)

const MultimediaCardPreview = ({ card }: { card: Card }) => (
  <div className="flex h-full flex-col overflow-hidden">
    {!!card.name && (
      <div className="px-2.5 pt-2.5 pb-0.5">
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
          className="w-full rounded-xl object-cover text-[4px]"
        />
      )}
      {!!card.videoUrl && (
        <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-support-gray-006">
          <Play width={16} height={16} />
        </div>
      )}
    </div>
  </div>
)

const AudioCardPreview = ({ card }: { card: Card }) => (
  <div className="flex h-full flex-col overflow-hidden pb-2">
    {!!card.name ? (
      <div className="p-2.5">
        <CardName name={card.name} />
      </div>
    ) : (
      <div className="invisible p-2.5">
        <CardName name="AudioCard" />
      </div>
    )}
    <div className="flex h-full flex-col items-center justify-center justify-between px-2 pt-[10%] pb-2">
      {!!card.audioUrl && (
        <>
          <AudioWave />
          <PlayPause className="mt-[5%]" height={20} width={20} />
        </>
      )}
    </div>
  </div>
)

const VideoTextCardPreview = ({ card }: { card: Card }) => (
  <div className="fade-md flex h-full flex-col overflow-hidden">
    {!!card.videoUrl && <SmallCardVideo videoUrl={card.videoUrl} />}
    <div className="p-2.5 pt-1.5">
      {!!card.name && <CardName name={card.name} />}
      {!!card.text && <CardText text={card.text} />}
    </div>
  </div>
)

const ActionCardPreview = ({ card }: { card: Card }) => (
  <div className="fade-md flex h-full flex-col overflow-hidden">
    {!!card.photoUrl && <SmallCardPhoto photoUrl={card.photoUrl} />}
    {!!card.videoUrl && <SmallCardVideo videoUrl={card.videoUrl} />}
    <div className="p-2.5 pt-2.5">
      <CardName name={card.name || ''} />
    </div>
    {!!card.actions && (
      <div className="mx-3 flex flex-col gap-2 overflow-hidden">
        {card.actions.map((action: any, i: number) => (
          <ActionOption key={`action-option-${i}`} option={card.actions[i]} />
        ))}
      </div>
    )}
  </div>
)
