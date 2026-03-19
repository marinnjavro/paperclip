import VideoPlayer from '@/components/shared/VideoPlayer'

const Media = ({
  photoUrl,
  videoUrl,
  isFullHeight = false
}: {
  photoUrl?: string
  videoUrl?: string
  isFullHeight?: boolean
}) => {
  const height = isFullHeight ? 'h-full' : 'h-[136.5px]'
  return (
    <>
      {!!photoUrl && (
        <div className="rounded-el-mask w-full">
          <img
            src={photoUrl}
            alt="Card Image"
            className={`${height} w-full rounded-t-2xl  bg-[#565879] object-contain`}
          />
        </div>
      )}
      {!!videoUrl && (
        <div className={`${height} fade-md w-full rounded-t-2xl`}>
          <VideoPlayer url={videoUrl} />
        </div>
      )}
    </>
  )
}

export default Media
