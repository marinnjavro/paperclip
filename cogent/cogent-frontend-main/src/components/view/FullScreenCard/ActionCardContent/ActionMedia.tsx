import { Card } from 'src/__generated__/graphql'

import VideoPlayer from '@/components/shared/VideoPlayer'

const ActionMedia = ({ card }: { card: Card }) => (
  <>
    {!!card.photoUrl && (
      <div className="h-[322.5px] w-full bg-[#565879]">
        <img
          src={card.photoUrl}
          draggable="false"
          alt="Card Image"
          className="h-full w-full bg-[#565879] object-contain"
        />
      </div>
    )}
    {!!card.videoUrl && (
      <div className="h-[322.5px] overflow-hidden bg-black pb-3">
        <VideoPlayer url={card.videoUrl} autoPlay={true} />
      </div>
    )}
  </>
)

export default ActionMedia
