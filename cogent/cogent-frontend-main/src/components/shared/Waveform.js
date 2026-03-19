import { useState, useEffect, useRef } from 'react'
import Wavesurfer from 'wavesurfer.js'
import Icon from '@/components/shared/Icon'
import Play from '@/assets/static/elements/play.svg'
import Pause from '@/assets/static/elements/pause.svg'

var formatTime = function (time) {
  return [
    Math.floor((time % 3600) / 60), // minutes
    ('00' + Math.floor(time % 60)).slice(-2) // seconds
  ].join(':')
}

const Waveform = ({ url, id, isDisabled }) => {
  const waveform = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [totalTime, setTotalTime] = useState('0:00')
  const [currentTime, setCurrentTime] = useState('0:00')

  useEffect(() => {
    // Check if wavesurfer object is already created.
    if (!waveform.current) {
      // Create a wavesurfer object
      // More info about options here https://wavesurfer-js.org/docs/options.html
      waveform.current = Wavesurfer.create({
        container: `#waveform-${id}`,
        waveColor: '#65678c',
        progressColor: '#06E9EE',
        barGap: 4,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 2,
        cursorColor: 'transparent',
        height: 75
      })
      // Load audio from a remote url.
      waveform.current.load(url)

      /* To load a local audio file
		    1. Read the audio file as a array buffer.
        2. Create a blob from the array buffer
        3. Load the audio using wavesurfer's loadBlob API
      */

      waveform.current.on('ready', function () {
        var timeline = Object.create(Wavesurfer.Timeline)

        timeline.init({
          wavesurfer: waveform.current,
          container: '#waveform-timeline',
          primaryFontColor: '#ADAFCE',
          primaryColor: '#ADAFCE',
          secondaryColor: '#ADAFCE',
          secondaryFontColor: '#ADAFCE'
        })
        setTotalTime(formatTime(waveform.current.getDuration()))
      })

      waveform.current.on('audioprocess', function () {
        if (waveform.current.isPlaying()) {
          setTotalTime(formatTime(waveform.current.getDuration()))
          setCurrentTime(formatTime(waveform.current.getCurrentTime()))
        }
      })
    }
  }, [])

  const playAudio = () => {
    // Check if the audio is already playing
    if (isDisabled) return
    if (waveform.current.isPlaying()) {
      waveform.current.pause()
      setIsPlaying(false)
    } else {
      waveform.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="w-full pb-3">
        <div className="waveform--wave w-full pb-1" id={`waveform-${id}`} />
        <div className="waveform--time flex items-center justify-between text-support-gray-001">
          <div>{currentTime}</div>
          <div>{totalTime}</div>
        </div>
      </div>

      <div>
        <button onClick={playAudio}>
          {isPlaying ? (
            <div className="waveform--play-pause h-20 w-20">
              <Pause />
            </div>
          ) : (
            <div className="waveform--play-pause h-20 w-20">
              <Play width="full" height="full" />
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default Waveform
