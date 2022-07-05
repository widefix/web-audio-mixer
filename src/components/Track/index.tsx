import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { keys } from 'ramda'

import Fader from './../Fader'
import Knob from '../Knob'

import style from './style.module.css'
import { getAverage } from '../MasterTrack/helpers'
import { useRecoilValue } from 'recoil'
import { statusState } from '../../store/playback'

const DEFAULT_VOLUME = 70

interface TrackProps {
  analyser: AnalyserNode
  id: string
  title: string
  volume: number
  pan: number
  isMuted: boolean
  isSolo: boolean
  isEffectsDisabled: boolean
  // TODO: Types
  fx: any
  onMute: (trackId) => {}
  onSolo: (trackId) => {}
  onBypass: (trackId) => {}
  onVolumeChange: (trackId, volume) => any
  onSendLevelChange?: (trackId, id, value) => void
  onPanChange: (trackId, value) => {}
  hasSolo: boolean
}

const Track: React.FC<TrackProps> = (props) => {
  const [soloMutePriority, setSoloMutePriority] = useState('')

  const setSoloMutePriorityHelper = (value: 's' | 'm') => {
    if (soloMutePriority.includes(value)) {
      setSoloMutePriority(soloMutePriority.replace(value, ''))
    } else if (soloMutePriority.length < 2) {
      setSoloMutePriority(soloMutePriority + value)
    } else {
      setSoloMutePriority(value)
    }
  }

  const status = useRecoilValue(statusState)

  const analyserDiv = useRef<HTMLDivElement>()

  const height = 176
  const array = new Uint8Array(props.analyser.frequencyBinCount)
  props.analyser.getByteFrequencyData(array)

  const average = useRef(0)

  let frame
  const drawMeter = () => {
    props.analyser.getByteFrequencyData(array)
    average.current = getAverage(array)
    if (analyserDiv.current && analyserDiv.current.style) {
      const maxValueToCurrentVolume = height * (props.volume / 100)
      const progress = (height / 100) * average.current
      analyserDiv.current.style.height = `${Math.min(progress, maxValueToCurrentVolume)}px`
    }

    frame = requestAnimationFrame(drawMeter)
  }

  const toZero = () => {
    if (analyserDiv.current && analyserDiv.current.style) {
      if (average.current > 0) {
        average.current -= 2
        analyserDiv.current.style.height = `${(height / 100) * average.current}px`
        frame = requestAnimationFrame(toZero)
      } else {
        analyserDiv.current.style.height = `${(height / 100) * 0}px`
        cancelAnimationFrame(frame)
      }
    }
  }

  useEffect(() => {
    if  (status === 'PLAYING') {
      frame = requestAnimationFrame(drawMeter)
    } else {
      toZero()
    }
    return () => cancelAnimationFrame(frame)
  }, [status, props.volume])

  return (
    <div className={style.track}>

      {(!props.hasSolo || props.isSolo) && <div className={style.meterValue} ref={analyserDiv} />}

      {keys(props.fx).length > 0 && (
        <button
          className={classnames(
            style.button,
            props.isEffectsDisabled && style.isPressed
          )}
          onClick={() => props.onBypass(props.id)}
        >
          Bypass FX
        </button>
      )}
      <div className={style.trackControls}>
        <button
          className={classnames(
            style.button,
            style.soloButton,
            props.isSolo && style.isPressed
          )}
          onClick={() => {
            setSoloMutePriorityHelper('s')
            if (soloMutePriority === 'm') {
              props.onMute(props.id)
              props.onSolo(props.id)
            } else if (soloMutePriority === 'ms') {
              props.onSolo(props.id)
              props.onMute(props.id)
            } else if (soloMutePriority === 'sm') {
              props.onSolo(props.id)
            } else {
              props.onSolo(props.id)
            }
          }}
        >
          S
        </button>
        <div
          className={classnames(
            style.buttonSeparator,
            props.isMuted || props.isSolo ? style.isHidden : ''
          )}
        />
        {!props.hasSolo && (
          <button
            className={classnames(style.button, props.isMuted && style.isPressed)}
            onClick={() => {
              setSoloMutePriorityHelper('m')
              props.onMute(props.id)
            }}
          >
            M
          </button>
        )}
      </div>

      <Knob
        min={0}
        max={100}
        value={props.pan}
        onChange={(value) => props.onPanChange(props.id, value)}
      />

      {keys(props.fx).length > 0 && (
        <div className={style.sends}>
          {keys(props.fx).map((sendId) => (
            <div className={style.send} key={sendId}>
              <span className={style.sendTitle}>{sendId}</span>
              <Fader
                onChange={(value) => props.onSendLevelChange(props.id, sendId, value)}
                value={props.fx[sendId]}
              />
            </div>
          ))}
        </div>
      )}

      <Fader
        onChange={(value) => props.onVolumeChange(props.id, value)}
        value={props.volume}
        onDoubleClick={() => props.onVolumeChange(props.id, DEFAULT_VOLUME)}
        isVertical
      />

      <div className={style.title}>
        <span className={style.titleText}>{props.title}</span>
      </div>
    </div>
  )
}

Track.defaultProps = {
  // TODO: Default track props do not work
  title: 'Untitled',
  volume: DEFAULT_VOLUME,
  isMuted: false,
  isSolo: false,
  isEffectsDisabled: false,
  // TODO: why is it always truthy even though no send is passed
  fx: null,
  onMute: () => null,
  onSolo: () => null,
  onBypass: () => null,
  onVolumeChange: () => null,
  onSendLevelChange: () => null,
  hasSolo: false
} as Partial<TrackProps>

export default Track
