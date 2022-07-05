import classnames from 'classnames'
import style from '../style.module.css'
import { isPaused, isPlaying } from '../../../helpers'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentPositionState, progressBarSelector } from '../../../store/playback'
import { useMxContext } from "../../../hooks"

const PlayController = ({isDisabled, status, onPlay, onPause}) => {
  const btnClassNames = (isButtonPressed: boolean) =>
    classnames(
      style.control,
      style.button,
      isButtonPressed && style.isButtonPressed
    )

  const {mx} = useMxContext()
  const setCurrentPosition = useSetRecoilState(currentPositionState)

  const { currentPosition, duration } = useRecoilValue(progressBarSelector);

  const onFastForward = async (value) => {
    if (mx.current) {
      if (currentPosition + value < duration) {
        setCurrentPosition((state) => state + value)
        await mx.current.fastForward(value)
      } else {
        setCurrentPosition(duration)
        await mx.current.fastForward(duration - currentPosition)
      }
    }
  }

  const onFastRewind = async (value) => {
    if (mx.current) {
      if (currentPosition - value > 0) {
        setCurrentPosition((state) => state - value)
        await mx.current.fastRewind(value)
      } else {
        setCurrentPosition(0)
        await mx.current.fastRewind(currentPosition)
      }
    }
  }

  return (
    <div className={style.controlsLeft}>
      <button
        className={style.controlButton}
        disabled={isDisabled}
        onClick={() => onFastRewind(15)}
      >
        <span>15</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 28'
          width='24px'
        >
          <path
            fill='#fff'
            d='M12.4 4V.5a.4.4 0 00-.8-.3L7.5 4.3a1 1 0 000 1.4l4.1 4.2c.3.3.8 0 .8-.3V6a9.8 9.8 0 11-10 9.8H.6A11.7 11.7 0 1012.4 4z'
          />
        </svg>
      </button>
      {!isPlaying(status) ? (
        <button
          className={btnClassNames(isPlaying(status))}
          onClick={onPlay}
          disabled={isDisabled}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32px'
            viewBox='0 0 32 36'
          >
            <defs />
            <path fill='#fff' d='M31.5 18L.5 36V0z' />
          </svg>
        </button>
      ) : (
        <button
          className={btnClassNames(isPaused(status))}
          onClick={onPause}
          disabled={isDisabled}
        >
          <svg
            width='32px'
            height='36px'
            viewBox='0 0 100 100'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              id='svg_1'
              d='m29.05829,98.186882l-18.799027,0c-4.588525,0 -8.308265,-3.719734 -8.308265,-8.308266l0,-79.706622c0,-4.588521 3.71974,-8.308262 8.308265,-8.308262l18.799027,0c4.588522,0 8.308264,3.71974 8.308264,8.308262l0,79.706622c0,4.588531 -3.719742,8.308266 -8.308264,8.308266z'
            />
            <path
              id='svg_2'
              d='m88.74073,98.108856l-18.799034,0c-4.588516,0 -8.308258,-3.719734 -8.308258,-8.308266l0,-79.706615c0,-4.588525 3.719742,-8.308266 8.308258,-8.308266l18.799034,0c4.588531,0 8.308273,3.719741 8.308273,8.308266l0,79.706615c0,4.588531 -3.719742,8.308266 -8.308273,8.308266z'
            />
            <path
              id='svg_3'
              d='m30.498528,2.009229c1.62159,1.516152 2.650631,3.65859 2.650631,6.054068l0,79.706615c0,4.588539 -3.71974,8.308273 -8.30826,8.308273l-18.799028,0c-0.493438,0 -0.970003,-0.063263 -1.440241,-0.1455c1.484523,1.387512 3.464588,2.254196 5.657634,2.254196l18.799027,0c4.588522,0 8.308264,-3.719734 8.308264,-8.308266l0,-79.706622c0,-4.095088 -2.96904,-7.477437 -6.868027,-8.162765z'
            />
            <path
              id='svg_4'
              d='m90.180962,1.93121c1.621582,1.516153 2.65065,3.658586 2.65065,6.054068l0,79.706608c0,4.588539 -3.719742,8.308273 -8.308273,8.308273l-18.799026,0c-0.493439,0 -0.970009,-0.063263 -1.440239,-0.1455c1.484512,1.387535 3.464584,2.254196 5.657623,2.254196l18.799034,0c4.588531,0 8.308273,-3.719734 8.308273,-8.308266l0,-79.706615c0,-4.095092 -2.969055,-7.479549 -6.868042,-8.162765z'
            />
            <path
              id='svg_5'
              fill='none'
              stroke='#000000'
              strokeMiterlimit='10'
              d='m29.05829,98.186882l-18.799027,0c-4.588525,0 -8.308265,-3.719734 -8.308265,-8.308266l0,-79.706622c0,-4.588521 3.71974,-8.308262 8.308265,-8.308262l18.799027,0c4.588522,0 8.308264,3.71974 8.308264,8.308262l0,79.706622c0,4.588531 -3.719742,8.308266 -8.308264,8.308266z'
            />
            <path
              id='svg_6'
              fill='none'
              stroke='#000000'
              strokeMiterlimit='10'
              d='m88.74073,98.108856l-18.799034,0c-4.588516,0 -8.308258,-3.719734 -8.308258,-8.308266l0,-79.706615c0,-4.588525 3.719742,-8.308266 8.308258,-8.308266l18.799034,0c4.588531,0 8.308273,3.719741 8.308273,8.308266l0,79.706615c0,4.588531 -3.719742,8.308266 -8.308273,8.308266z'
            />
          </svg>
        </button>
      )}
      <button
        className={style.controlButton}
        disabled={isDisabled}
        onClick={() => onFastForward(15)}
      >
        <span>15</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24px'
          viewBox='0 0 24 28'
        >
          <path
            fill='#fff'
            d='M11.9 4V.5c0-.4.4-.5.7-.3l4.2 4.2a1 1 0 010 1.4L12.6 10a.4.4 0 01-.7-.3V6a9.8 9.8 0 109.9 9.8h1.9A11.7 11.7 0 1111.9 4z'
          />
        </svg>
      </button>
    </div>
  )
}

export default PlayController
