import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import { fileTypes } from '@/components/block/Card/CardEditor'
import CardNameInput from '@/components/block/Card/CardEditor/elements/CardNameInput'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'
import VideoPlayer from '@/components/shared/VideoPlayer'
import FileUpload from '@/components/shared/FileUpload'
import EditButton from '@/components/shared/EditButton'

interface MultimediaInputsProps {
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardName: (name: string) => void
  updateCardPhoto: (files: FileList) => void
  updateCardVideo: (files: FileList) => void
}

const MultimediaCardInputs: React.FC<MultimediaInputsProps> = ({
  card,
  setIsSaving,
  updateCardName,
  updateCardPhoto,
  updateCardVideo
}) => {
  const hasMedia = !!card.photoUrl || !!card.videoUrl

  const [dragActive, setDragActive] = useState<boolean>(false)

  const handleMediaChange = (files: FileList) => {
    if (!files) return
    setIsSaving(true)
    if (files && fileTypes.image.includes(files[0].type)) {
      updateCardPhoto(files)
    }
    if (files && fileTypes.video.includes(files[0].type)) {
      updateCardVideo(files)
    }
  }

  const Edit = () => (
    <div className="absolute -top-1 -left-3 z-10 p-5">
      <FileUpload
        accepts={['image', 'video']}
        handleFiles={handleMediaChange}
        dragActive={dragActive}
        setDrag={setDragActive}
      >
        <div
          className="flex items-center p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <EditButton />
        </div>
      </FileUpload>
    </div>
  )

  return (
    <div className="relative flex h-full flex-col">
      <div className="mt-4 mb-5">
        <CardNameInput
          card={card}
          setIsSaving={setIsSaving}
          updateCardName={updateCardName}
          maxChars={46}
        />
      </div>
      <div className="relative h-full overflow-hidden">
        {hasMedia ? (
          <>
            <Edit />
            {!!card.videoUrl && (
              <div className="rounded-el-mask h-full overflow-hidden rounded-3xl">
                <VideoPlayer url={card.videoUrl} />
              </div>
            )}
            {!!card.photoUrl && (
              <img
                src={card.photoUrl}
                alt="Card Image"
                className="rounded-el-mask h-full w-full rounded-t-3xl bg-[#565879]  object-contain"
              />
            )}
          </>
        ) : (
          <div className="flex h-full flex-1 items-center justify-center">
            <FileUpload
              accepts={['image', 'video']}
              handleFiles={handleMediaChange}
              dragActive={dragActive}
              setDrag={setDragActive}
            >
              <div className="flex h-full w-full flex-1 cursor-pointer items-center justify-center pb-20">
                <MediaPlaceholder size="large" label="Upload photo or video" />
              </div>
            </FileUpload>
          </div>
        )}
      </div>
    </div>
  )
}

export default MultimediaCardInputs
