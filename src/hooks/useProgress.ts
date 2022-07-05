import { useEffect } from 'react'
import { PLAYBACK_STATUS } from '../constants'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { currentPositionState, statusState } from '../store/playback'

export const useProgress = (mx: any) => {

  const [status, setStatus] = useRecoilState(statusState)
  const setCurrentPosition = useSetRecoilState(currentPositionState)

  useEffect(() => {
    let interval

    switch (status) {
      case PLAYBACK_STATUS.PLAYING:
        interval = setInterval(() => {
          setCurrentPosition(mx.current.currentTime)
          if (mx.current.isLooped && mx.current.isFinished) {
            setCurrentPosition(0)
          } else if (mx.current.isFinished) {
            setStatus('PAUSED')
            setCurrentPosition(0)
          } else {
            setCurrentPosition(mx.current.currentTime)
          }
        }, 1000)
        return () => clearInterval(interval)
      default:
        return () => clearInterval(interval)
    }
  }, [status])
}
