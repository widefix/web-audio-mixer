import React, { useEffect } from 'react'

import Desk from './../../components/Desk'

import { useSetRecoilState } from 'recoil'
import {
  isLoopedState,
  masterVolumeState,
  statusState
} from '../../store/playback'
import { useMxContext } from "../../hooks"
import { UserInputEvents } from "../Mixdesk"

// TODO: add types
export const DeskContainer: React.FC<{stopAudio: boolean}> = ({ stopAudio, children }) => {
  const {mx, isReady, mixerChanges, onUserInput} = useMxContext()

  const setStatus = useSetRecoilState(statusState)
  const setIsLooped = useSetRecoilState(isLoopedState)
  const setMasterVolume = useSetRecoilState(masterVolumeState)

  const onPlay = async () => {
    if (mx.current) {
      await mx.current.play()
    }

    setStatus('PLAYING')
  }

  const onPause = async () => {
    if (mx.current) {
      await mx.current.pause()
    }

    setStatus('PAUSED')
  }

  const onLoop = async (value) => {
    if (mx.current) {
      await mx.current.loop(value)
    }

    setIsLooped(value)
    onUserInput({type: UserInputEvents.onRepeat, value: value})
  }

  const onSetMasterVolume = async (value) => {
    if (mx.current) {
      mx.current.volume = value
    }

    setMasterVolume(value)
    onUserInput({type: UserInputEvents.masterVolumeChange, value: value})
  }

  useEffect(() => {
    if (mixerChanges.masterVolume && isReady) {
      onSetMasterVolume(mixerChanges.masterVolume)
    }
  }, [isReady])

  useEffect(() => {
    if (mixerChanges.repeat && isReady) {
      onLoop(mixerChanges.repeat)
    }
  }, [isReady])

  useEffect(() => {
    if (stopAudio) {
      onPause()
    }
  }, [stopAudio])

  return (
    <Desk
      onPlay={onPlay}
      onPause={onPause}
      onLoop={onLoop}
      onMasterVolumeChange={onSetMasterVolume}
    >
      {children}
    </Desk>
  )
}
