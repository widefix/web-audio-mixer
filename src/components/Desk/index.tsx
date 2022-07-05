import React, { useEffect, useRef, useState } from 'react'

import classnames from 'classnames'

import { isNotActive } from './../../helpers/playback'

import style from './style.module.css'
import { useRecoilValue } from 'recoil'
import {
  analyserState, isLoopedState, masterVolumeState,
  statusState
} from '../../store/playback'
import ProgressBar from './components/ProgressBar'
import PlayController from './components/PlayController'
import VolumeController from './components/VolumeController'
import MasterTrack from '../MasterTrack'
import { effectsState } from '../../store/store'
import { EffectContainer } from '../../containers'
import Tracks from '../../containers/Track/Tracks'
import { useMxContext } from '../../hooks'

interface DeskProps {
  onPlay: () => void
  onPause: () => void
  onLoop: (value) => void
  onMasterVolumeChange: (value) => void
}

const MasterTrackContainer = ({ onMasterVolumeChange, analyser }) => {
  const masterVolume = useRecoilValue(masterVolumeState)

  return (
    <MasterTrack
      volume={masterVolume}
      onVolumeChange={onMasterVolumeChange}
      analyser={analyser}
    />
  )
}

const Effects = () => {
  const effects = useRecoilValue(effectsState)

  if (!effects.length) return null

  return (
    <div className={style.effects}>{effects.map((effect) => (
      <EffectContainer {...effect} key={effect.id} />
    ))}</div>
  )
}

const Desk: React.FC<DeskProps> = ({
 onPlay = () => {},
 onPause = () => {},
 onMasterVolumeChange = () => {},
 onLoop = () => {},
 children
}) => {

  const analyser = useRecoilValue(analyserState)
  const status = useRecoilValue(statusState)
  const isLooped = useRecoilValue(isLoopedState)
  const { isReady } = useMxContext()

  const isDisabled = isNotActive(status)

  const loopButtonClassNames = () =>
    classnames(
      style.controlButton, style.loopButton,
      isLooped && style.isActive,
      !isLooped && style.isNotActive
    )

  const controllerRef = useRef<HTMLDivElement>()
  const [ isControlsContainerFixed, setIsControlsContainerFixed ] = useState(
    false
  )

  const deskDiv = useRef<HTMLDivElement>()

  const setFixedClass = () => {
    if (
      !isControlsContainerFixed &&
      controllerRef.current.getBoundingClientRect().top <= 0
    ) {
      setIsControlsContainerFixed(true)
    } else if (!isControlsContainerFixed) {
      setIsControlsContainerFixed(false)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', setFixedClass)

    return () => document.removeEventListener('scroll', setFixedClass)
  }, [])

  return (
    <div className={style.desk} ref={deskDiv}>
      <div className={style.deskContainer}>
        <div className={style.mixerTitle}>
          <h2>
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
            Audio Mixer
          </h2>
          <p>Create your own mix to practice along with</p>
        </div>
        <Tracks />
        {analyser && (
          <MasterTrackContainer onMasterVolumeChange={onMasterVolumeChange} analyser={analyser} />
        )}
      </div>

      <div className={style.controlsBlock}>
        {!isReady && <div className={style.controlsContainerDisable} />}
        <div ref={controllerRef} className={style.controlsContainer}>
          <div
            className={classnames(style.controlsWrapper, {
              [style.isFixed]: isControlsContainerFixed
            })}
          >
            <ProgressBar />
            <div className={style.controls}>
              <PlayController
                isDisabled={isDisabled}
                status={status}
                onPlay={onPlay}
                onPause={onPause}
              />
              <div className={style.controlsCustom}>{children}</div>
              <div className={style.controlsRight}>
                <VolumeController onMasterVolumeChange={onMasterVolumeChange} />

                <button
                  className={loopButtonClassNames()}
                  onClick={() => {
                    onLoop(!isLooped)
                  }}
                  disabled={isDisabled}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='31px'
                    viewBox='0 0 31 28'
                  >
                    <defs />
                    <path
                      fill='#fff'
                      d='M28.3 4.4L24 0v3.4H10.4A10.5 10.5 0 002 19.8l1.4-1.4A8.4 8.4 0 012 13.9c0-4.7 3.8-8.5 8.4-8.5H24V9zM2.7 23.2l4.4 4.4v-3.4h13.5a10.5 10.5 0 008.6-16.4l-1.5 1.4a8.4 8.4 0 011.3 4.6c0 4.6-3.7 8.4-8.4 8.4H7.1v-3.4z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Effects />
    </div>
  )
}

export default Desk
