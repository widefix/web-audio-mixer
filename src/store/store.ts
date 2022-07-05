import { atom, selector } from 'recoil'

export const effectsState = atom({
  key: 'effectsState',
  default: []
})

export const tracksState = atom({
  key: 'tracksState',
  default: []
})

export const isSoloSelector = selector({
  key: 'isSoloSelector',
  get: ({ get }) => {
    const tracks = get(tracksState)

    return tracks.some(track => track.isSolo)
  }
})

export const mxState = atom({
  key: 'mxState',
  default: {
    current: {
      isLooped: false,
      isFinished: false,
      currentTime: 0,
      rewind: () => {
      },
      play: () => {
      },
      pause: () => {
      },
      fastForward: (value) => value,
      fastRewind: (value) => value,
      setCurrentPosition: (value) => value,
      loop: (value) => value,
      volume: (value) => value
    }
  }
})

export const loadingState = atom({
  key: 'loadingState',
  default: {}
})
