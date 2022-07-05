import React, { useEffect, useState } from 'react'

import { useMixer, MixerLoadingState } from '../../hooks/useMixer'
import { useProgress } from '../../hooks/useProgress'
import { DeskContainer } from '../Desk'
import { Delay, Reverb, Distortion, FX } from '../../models/fx'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { statusState } from '../../store/playback'
import { MxContextProvider } from "../../hooks"

interface TrackType {
  title: string
  url: string
}

export enum UserInputEvents {
  masterVolumeChange = 'masterVolumeChange',
  trackVolumeChange = 'trackVolumeChange',
  panChange = 'panChange',
  playingStateChange = 'playingStateChange',
  onRepeat = 'onRepeat',
}

export interface UserInputEvent {
  type: UserInputEvents
  value: string | bigint
  trackId?: string
}

export interface MixerChanges {
  masterVolume?: number
  repeat?: boolean
  songKey?: string
  tracks?: {
    [trackId: string]: {
      volume?: number
      pan?: number
      playingState?: string | null
    }
  }
}

export interface MixdeskProps  {
  commonTracks: Array<TrackType>
  tracks: Array<TrackType>
  effects: FX[]
  hasMasterTrack?: boolean
  onLoading?: (loadingState: MixerLoadingState) => void
  stopAudio: boolean,
  setMixerIsPlaying: (boolean) => void
  songKey: string
  songId: string
  mixerChanges: MixerChanges
  handleMixerUnsupportedError: () => void
  onUserInput: (event: UserInputEvent) => void
  addMixerCountPlay?: () => void
  isRouteChanged?: boolean
}

const Mixer: React.FC<MixdeskProps> = ({
  commonTracks,
  tracks = [],
  effects = [Delay, Reverb, Distortion],
  hasMasterTrack = true,
  onLoading = () => {},
  children,
  stopAudio,
  setMixerIsPlaying,
  songKey,
  mixerChanges,
  handleMixerUnsupportedError,
  onUserInput,
  addMixerCountPlay = () => {},
  isRouteChanged,
}) => {
  const [isReady, setIsReady] = useState(false)
  const mx = useMixer(
    commonTracks,
    tracks,
    effects,
    hasMasterTrack,
    onLoading,
    setIsReady,
    handleMixerUnsupportedError
  )
  const [isFirstPlay, setIsFirstPlay] = useState(true)
  const [alreadyPlayedKeys, setAlreadyPlayedKeys] = useState([])

  useProgress(mx)

  const status = useRecoilValue(statusState)

  const onPause = async () => {
    if (mx.current) {
      await mx.current.pause()
    }
  }

  useEffect(() => {
    isRouteChanged && onPause()
  }, [isRouteChanged])

  useEffect(() => {
    setIsFirstPlay(true)
  }, [tracks])

  useEffect(() => {
    if (status === 'PLAYING'){
      if (isFirstPlay && !alreadyPlayedKeys.includes(songKey)) {
        setIsFirstPlay(false)
        setAlreadyPlayedKeys((state) => [...state, songKey])
        addMixerCountPlay()
      }
      setMixerIsPlaying(true)
    } else if (status === 'PAUSED') {
      setMixerIsPlaying(false)
    }
  }, [status])

  return (
    <MxContextProvider mx={ mx } isReady={ isReady } mixerChanges={mixerChanges} onUserInput={onUserInput} >
      <DeskContainer stopAudio={stopAudio}>
        {children && children}
      </DeskContainer>
    </MxContextProvider>
  )
}

export const Mixdesk = (props) => (
  <RecoilRoot>
    <Mixer {...props}/>
  </RecoilRoot>
);
