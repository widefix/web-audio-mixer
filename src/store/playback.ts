import { atom, selector } from 'recoil'

export const analyserState = atom({
  key: 'analyserState',
  default: null
})

export const statusState = atom({
  key: 'statusState',
  default: 'NOT_SET'
})

export const currentPositionState = atom({
  key: 'currentPositionState',
  default: 0
})

export const durationState = atom({
  key: 'durationState',
  default: 0
})

export const isLoopedState = atom({
  key: 'isLoopedState',
  default: false
})

export const masterVolumeState = atom({
  key: 'masterVolumeState',
  default: 0
})

export const progressBarSelector = selector({
  key: 'progressBarSelector',
  get: ({get}) => {
    const currentPosition = get(currentPositionState);
    const duration = get(durationState);

    return {currentPosition, duration}
  }
});

