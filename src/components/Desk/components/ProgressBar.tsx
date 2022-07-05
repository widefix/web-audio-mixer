import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentPositionState, progressBarSelector } from '../../../store/playback'
import style from '../style.module.css'
import Fader from '../../Fader'
import { useMxContext } from "../../../hooks"

const ProgressBar = () => {
  const {mx} = useMxContext()
  const setCurrentPosition = useSetRecoilState(currentPositionState)

  const onSetCurrentPosition = async (value) => {
    if (mx.current) {
      await mx.current.setCurrentPosition(value)
    }

    setCurrentPosition(value)
  }

  const { currentPosition, duration } = useRecoilValue(progressBarSelector);
  const [progressPosition, setProgressPosition] = useState(0)

  useEffect(() => {
    setProgressPosition(
      persentPassed(currentPosition, duration)
    )
  }, [currentPosition])

  return (
    <div className={style.progressContainer}>
      <Fader
        className={style.progressBar}
        onChangeEnd={(percent) => {
          onSetCurrentPosition(secondsParsed(percent, duration))
        }}
        onChange={(percent) => {
          setProgressPosition(percent)
        }}
        isKnobThumb
        value={progressPosition}
      />

      <div className={style.progressTimeNow}>
        {convertTime(currentPosition)}
      </div>
      <div className={style.progressTime}>
        {convertTime(duration)}
      </div>
    </div>
  )
}

export default React.memo(ProgressBar)

const convertTime = (seconds = 0) => {
  const secondsResult = Math.floor(seconds % 60)
  const result = {
    minutes: Math.floor(((seconds - secondsResult) / 60) % 60),
    seconds: secondsResult >= 10 ? secondsResult : `0${secondsResult}`
  }
  return `${result.minutes}:${result.seconds}`
}

const persentPassed = (seconds, duration) => {
  const persent = (100 * seconds) / duration
  return persent >= 100 ? 100 : persent
}

const secondsParsed = (percent, duration) => (percent * duration) / 100
