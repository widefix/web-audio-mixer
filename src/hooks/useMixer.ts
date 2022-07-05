import { useRef, useEffect } from 'react'
import { createState } from '../store/helpers'
import { Mixer } from '../models/mixer'
import { FX } from '../models/fx/fx-base'
import { Playback } from '../helpers/entities'
import { useSetRecoilState } from 'recoil'
import { effectsState, tracksState } from '../store/store'
import {
  analyserState,
  currentPositionState,
  durationState,
  isLoopedState,
  masterVolumeState,
  statusState
} from '../store/playback'

export interface MixerTrack {
  url: string
  title: string
}

export interface MixerState {
  tracks: MixerTrack[]
  effects: FX[]
  playback: Playback
  loadingState?: () => MixerLoadingState
}

export interface MixerLoadingState {
  length: number
  current: number
  progress: number
  isLoading: boolean
}

export interface UseMixerHook {
  mx: {
    current?: Mixer
  }
  state: MixerState
  dispatch: React.Dispatch<any>
}

export const useMixer = (
    commonTracks,
    tracks,
    effects, 
    hasMasterTrack, 
    onLoading, 
    setIsReady, 
    handleMixerUnsupportedError
  ) => {
  const mx = useRef<any>()

  const setTracks = useSetRecoilState(tracksState)
  const setEffects = useSetRecoilState(effectsState)

  const setAnalyser = useSetRecoilState(analyserState)
  const setStatus = useSetRecoilState(statusState)
  const setCurrentPosition = useSetRecoilState(currentPositionState)
  const setDuration = useSetRecoilState(durationState)
  const setIsLooped = useSetRecoilState(isLoopedState)
  const setMasterVolume = useSetRecoilState(masterVolumeState)

  useEffect(() => {
    setIsReady(false)
    const onLoad = async () => {
      const { tracks, effects, playback } = createState(
        mx.current,
        hasMasterTrack
      )

      mx.current.setCurrentPosition(0)

      await setTracks(tracks)
      await setEffects(effects)
      await setStatus('READY')
      await setAnalyser(playback.analyser)
      await setCurrentPosition(0)
      await setDuration(playback.duration)
      await setIsLooped(playback.isLooped)
      await setMasterVolume(playback.masterVolume)

      setIsReady(true)
      onLoading({
        length: tracks.length,
        current: tracks.length,
        isLoading: false
      })
    }

    if (!mx.current) {
      mx.current = new Mixer(commonTracks, effects, handleMixerUnsupportedError)
    }

    mx.current
      .stop()
      .then(() => mx.current.load(tracks, onLoading, handleMixerUnsupportedError))
      .then(onLoad)

  }, [ tracks ])

  return mx
}
