import VideoPlayer from '@/components/shared/VideoPlayer'

const CardMedia = ({
  small = false,
  photoUrl,
  videoUrl
}: {
  small?: boolean
  photoUrl?: string
  videoUrl?: string
}) => {
  const smallPhotoStyle =
    'fade-md w-full h-full max-h-[80px] sm:max-h-[136.5px]'
  const fullPhotoStyle = 'h-full w-full rounded-xl sm:rounded-b-3xl'

  const smallVideoStyle = 'fade-md h-[80px] sm:h-[136.5px] w-full'
  const fullVideoStyle =
    'flex w-full justify-center overflow-hidden rounded-xl sm:rounded-3xl bg-[#565879]'

  return (
    <>
      {!!photoUrl && (
        <div className="rounded-el-mask min-h-[80px] w-full sm:min-h-[135px]">
          <img
            src={photoUrl}
            alt="Card Image"
            className={`${
              small ? smallPhotoStyle : fullPhotoStyle
            } rounded-xl bg-[#565879] object-contain sm:rounded-t-3xl`}
          />
        </div>
      )}
      {!!videoUrl && (
        <div
          className={`${
            small ? smallVideoStyle : fullVideoStyle
          } w-full rounded-xl sm:rounded-t-3xl`}
        >
          <VideoPlayer url={videoUrl} />
        </div>
      )}
    </>
  )
}

export default CardMedia
