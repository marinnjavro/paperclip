import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import CardNameInput from '@/components/block/Card/CardEditor/elements/CardNameInput'
import AudioPlayer from '@/components/shared/AudioPlayer'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'
import FileUpload from '@/components/shared/FileUpload'
import EditButton from '@/components/shared/EditButton'

interface AudioInputsProps {
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardName: (name: string) => void
  updateCardAudio: (files: FileList) => void
}

const AudioCardInputs: React.FC<AudioInputsProps> = ({
  card,
  setIsSaving,
  updateCardName,
  updateCardAudio
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false)

  const handleAudioChange = (files: FileList) => {
    if (!files) return
    setIsSaving(true)
    updateCardAudio(files)
  }

  const Edit = () => (
    <div className="absolute top-16 left-4">
      <FileUpload
        accepts={['audio']}
        handleFiles={handleAudioChange}
        dragActive={dragActive}
        setDrag={setDragActive}
      >
        <EditButton />
      </FileUpload>
    </div>
  )

  return (
    <div className="flex h-full flex-col">
      <div className="mt-5">
        <CardNameInput
          card={card}
          setIsSaving={setIsSaving}
          updateCardName={updateCardName}
          maxChars={63}
        />
      </div>
      {!!card.audioUrl ? (
        <div className="flex h-full w-full items-end justify-end pb-6">
          <div className="mx-3.5 h-[68%] w-full flex-1">
            <AudioPlayer url={card.audioUrl} cardId={card.id} />
          </div>
          <Edit />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <FileUpload
            accepts={['audio']}
            handleFiles={handleAudioChange}
            dragActive={dragActive}
            setDrag={setDragActive}
          >
            <div className="flex h-full w-full flex-1 cursor-pointer items-center justify-center pb-20">
              <MediaPlaceholder size="large" label="Upload audio" />
            </div>
          </FileUpload>
        </div>
      )}
    </div>
  )
}

export default AudioCardInputs
