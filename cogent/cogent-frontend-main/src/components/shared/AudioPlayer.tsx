import dynamic from 'next/dynamic'
import 'react-h5-audio-player/lib/styles.css'

const WaveformNoSSRWrapper = dynamic(import('@/components/shared/Waveform'), {
  ssr: false
})

const AudioPlayer = ({
  url,
  cardId,
  isDisabled = false
}: {
  url: string
  cardId: string
  isDisabled?: boolean
}) => {
  return (
    <div className="h-full w-full">
      <WaveformNoSSRWrapper url={url} id={cardId} isDisabled={isDisabled} />
    </div>
  )
}

export default AudioPlayer
