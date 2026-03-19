import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import CardPhoto from '@/components/block/Card/CardContent/elements/CardPhoto'
import VideoPlayer from '@/components/shared/VideoPlayer'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'
import FileUpload from '@/components/shared/FileUpload'
import { FileType, fileTypes } from '@/components/shared/FileUpload'
import EditButton from '@/components/shared/EditButton'

interface MediaInputProps {
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardPhoto?: (url: FileList) => void
  updateCardVideo?: (url: FileList) => void
  label: string
  types: FileType[]
}

const MediaInput: React.FC<MediaInputProps> = ({
  card,
  setIsSaving,
  updateCardPhoto,
  updateCardVideo,
  label,
  types
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false)

  const handleMediaChange = (files: FileList) => {
    if (!files) return
    setIsSaving(true)
    if (
      files &&
      fileTypes.image[0].includes(files[0].type) &&
      updateCardPhoto
    ) {
      updateCardPhoto(files)
    }
    if (
      files &&
      fileTypes.video[0].includes(files[0].type) &&
      updateCardVideo
    ) {
      updateCardVideo(files)
    }
  }

  return card.photoUrl || card.videoUrl ? (
    <>
      {card.photoUrl && (
        <div className="rounded-el-mask relative overflow-hidden rounded-t-3xl">
          <CardPhoto photoUrl={card.photoUrl} />
          <FileUpload
            accepts={types}
            handleFiles={handleMediaChange}
            dragActive={dragActive}
            setDrag={setDragActive}
          >
            <div className="absolute top-3 left-3">
              <EditButton />
            </div>
          </FileUpload>
        </div>
      )}
      {card.videoUrl && (
        <div className="overflow-hidden">
          <div className="fade-md relative h-[210px] overflow-hidden rounded-t-3xl xxs:h-[248.25px]">
            <VideoPlayer url={card.videoUrl} />
            <FileUpload
              accepts={types}
              handleFiles={handleMediaChange}
              dragActive={dragActive}
              setDrag={setDragActive}
            >
              <div className="absolute top-3 left-3">
                <EditButton />
              </div>
            </FileUpload>
          </div>
        </div>
      )}
    </>
  ) : (
    <FileUpload
      accepts={types}
      handleFiles={handleMediaChange}
      dragActive={dragActive}
      setDrag={setDragActive}
    >
      <MediaPlaceholder label={label} />
    </FileUpload>
  )
}

export default MediaInput
