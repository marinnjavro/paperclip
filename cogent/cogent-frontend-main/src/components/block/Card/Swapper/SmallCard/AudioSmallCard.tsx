import React from 'react'
import SmallCardName from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardName'
import AudioPlayer from '@/components/shared/AudioPlayer'

const AudioSmallCard = React.memo(function MultimediaComponent({
  name,
  id,
  audioUrl
}: {
  name: string | undefined | null
  id: string
  audioUrl?: string | undefined | null
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="pt-3 pb-4">{!!name && <SmallCardName name={name} />}</div>
      <div className="flex h-full w-full items-center justify-center overflow-hidden px-3">
        {!!audioUrl && (
          <div className="w-full pb-2 sm:h-[90%] sm:pb-0 sm:pt-[30%]">
            <AudioPlayer cardId={id} url={audioUrl} isDisabled={true} />
          </div>
        )}
      </div>
    </div>
  )
})

export default AudioSmallCard
