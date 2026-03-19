import { useState, useEffect } from 'react'
import { Cog } from 'src/__generated__/graphql'
import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import QrCodeModal from '@/components/shared/QrCodeModal'

const SavePlay = ({ save, cog }: { save: () => void; cog: Cog }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handlePlayClick = (e: React.MouseEvent) => {
    if (isMobile) {
      window.open(`/cogs/${cog.id}`, '_blank', 'noopener,noreferrer')
    } else {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <div
          className="rounded-[12px] border border-solid border-night-base-primary px-3 py-2"
          onClick={(e) => {
            e.stopPropagation()
            e.nativeEvent.preventDefault()
            save()
          }}
        >
          <Icon
            type="download"
            width={16}
            height={16}
            classNames="text-white"
          />
        </div>
        <ButtonPrimary
          classNames="bottom-4 right-8 radius-xl outline-none"
          label="Play"
          size="small"
          iconPosition="right"
          icon="play"
          onClick={handlePlayClick}
        />
      </div>

      {!isMobile && (
        <QrCodeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          text="QR code for playing this cog"
          showClose={true}
          showButton={false}
          manualCogId={cog.id}
        />
      )}
    </>
  )
}

export default SavePlay
