import React, { useRef, useEffect } from 'react'

import { getAverage, createMeterGradient } from './helpers'

import style from './style.module.css'
import trackStyle from './../Track/style.module.css'
import Fader from '../Fader'
import { useRecoilValue } from 'recoil'
import { statusState } from '../../store/playback'

interface MasterTrackProps {
  analyser: AnalyserNode
  width?: number
  height?: number
  volume?: number
  onVolumeChange: (value) => void
}
// TODO: remove the master track component and add the isMaster prop to a Track component
const MasterTrack: React.FC<MasterTrackProps> = ({
  analyser = null,
  width = 6,
  height = 176,
  volume = 70,
  onVolumeChange
}) => {
  if (!analyser) {
    return null
  }

  const average = useRef(0)
  const status = useRecoilValue(statusState)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let frame
    const context = canvasRef.current && canvasRef.current.getContext('2d')
    const array = new Uint8Array(analyser.frequencyBinCount)

    const drawMeter = () => {
      analyser.getByteFrequencyData(array)

      average.current = getAverage(array)

      if (context) {
        context.clearRect(0, 0, width, height)
        context.fillStyle = createMeterGradient(context as any, {
          width,
          height
        })
        const maxValueToCurrentVolume = height * (volume / 100)
        const progress = (height / 100) * average.current
        context.fillRect(0, 0, width, Math.min(progress, maxValueToCurrentVolume))
      }
      frame = requestAnimationFrame(drawMeter)
    }

    const toZero = () => {
      if (average.current > 0) {
        average.current -= 2
        context.clearRect(0, 0, width, height)
        context.fillStyle = createMeterGradient(context as any, {
          width,
          height
        })
        context.fillRect(0, 0, width, (height / 100) * average.current)
        frame = requestAnimationFrame(toZero)
      } else {
        cancelAnimationFrame(frame)
      }
    }

    if  (status === 'PLAYING') {
      frame = requestAnimationFrame(drawMeter)
    } else {
      toZero()
    }
    
    return () => cancelAnimationFrame(frame)
  }, [status, volume])

  return (
    <div className={`${style.meter} ${trackStyle.track}`}>
      <div className={style.masterTrackIcon}>
        <svg xmlns='http://www.w3.org/2000/svg' width='30' height='25' viewBox='0 0 30 25'>
          <g>
            <g>
              <g>
                <path fill='#fff' d='M.018 25V7.644h5.729V25z' />
              </g>
              <g>
                <path fill='#fff' d='M8.096 25v-9.704h5.729V25z' />
              </g>
              <g>
                <path fill='#fff' d='M16.176 25V.913h5.729V25z' />
              </g>
              <g>
                <path fill='#fff' d='M24.254 25V11.368h5.729V25z' />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <canvas
        className={style.meterValue}
        width={width}
        height={height}
        ref={canvasRef}
      />

      <Fader onChange={onVolumeChange} isVertical value={volume} />

      <div className={trackStyle.title}>Master</div>
    </div>
  )
}

export default MasterTrack
