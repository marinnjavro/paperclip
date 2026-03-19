import React, { useEffect, useRef } from 'react'
import useVideoPlayer from '@/utils/hooks/useVideoPlayer'
import Play from '@/assets/static/elements/play.svg'
import Pause from '@/assets/static/elements/pause.svg'
import SoundOn from '@/assets/icons/sound-on.svg'
import SoundOff from '@/assets/icons/sound-off.svg'
import useLocalStorage from '@/utils/hooks/useLocalStorage'

interface VideoPlayerProps {
  url: string
  autoPlay?: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, autoPlay = false }) => {
  const videoElement = useRef(null)
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleMute
  } = useVideoPlayer(videoElement, autoPlay)
  const [videoPreferences, setVideoPreferences] = useLocalStorage(
    `cogent_video_preferences`,
    {
      isMuted: true
    }
  )

  useEffect(() => {
    if (videoPreferences.isMuted !== playerState.isMuted) {
      handleToggleMute()
    }
  }, [])

  const handleToggleMute = () => {
    toggleMute()
    setVideoPreferences({ isMuted: !playerState.isMuted })
  }

  return (
    <div className="video-player flex h-full w-full items-center justify-center">
      <div className="relative flex h-full w-full justify-center overflow-hidden bg-support-gray-006">
        <video
          src={url}
          ref={videoElement}
          preload="metadata"
          className="z-0 h-full w-full object-contain"
          onTimeUpdate={handleOnTimeUpdate}
          playsInline
        />
        {!playerState.isPlaying && (
          <button
            className="video-player--playBtn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            onClick={togglePlay}
          >
            <Play width="100%" height="100%" />
          </button>
        )}
        <div className="video-player--controls justify-stretch absolute bottom-0.5 z-20 flex w-full items-center px-2.5 py-3">
          <div className="mr-2">
            <button className="video-player--playPause" onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <Play width="100%" height="100%" />
              ) : (
                <Pause width="100%" height="100%" />
              )}
            </button>
          </div>
          <input
            type="range"
            className=""
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <button
            className="ml-2 flex h-6 w-6 items-center justify-center text-[#cccccc]"
            onClick={handleToggleMute}
          >
            {!playerState.isMuted ? (
              <div className="h-6 w-6">
                <SoundOn />
              </div>
            ) : (
              <div className="h-6 w-6">
                <SoundOff />
              </div>
            )}
          </button>

          {/* <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <i className="bx bxs-volume-full"></i>
            ) : (
              <i className="bx bxs-volume-mute"></i>
            )}
          </button> */}
        </div>
      </div>
    </div>
  )
}
export default VideoPlayer
