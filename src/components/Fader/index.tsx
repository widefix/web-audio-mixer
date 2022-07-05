import React, { useRef, useState } from 'react'
import classnames from 'classnames'

import FaderThumb from './FaderThumb'

import {
  getX,
  getY,
  getPointerVerticalPosition,
  getPointerHorizontalPosition,
  getCloserToDefaultValue
} from './helpers'

import style from './style.module.css'

const EVENTS_MAP = {
  mousemove: 'touchmove',
  mouseup: 'touchend',
  mousedown: 'touchstart'
}

const isServer = typeof window === 'undefined'

const hasTouchEventsSupport = () => !isServer && 'ontouchstart' in window

const getEventNameByFeature = (eventName) =>
  hasTouchEventsSupport() ? EVENTS_MAP[eventName] : eventName

interface FaderProps {
  value?: number
  isVertical?: boolean
  isKnobThumb?: boolean
  // TODO: 🤯 Refactor onChange due to type inconsistency
  onChange?: any
  // On change end is used for the Progress Bar, no need for progressional change
  onChangeEnd?: (value) => void
  onDoubleClick?: (id) => void
  className?: string
}

const Fader: React.FC<FaderProps> = ({
  value = 0,
  isVertical = false,
  isKnobThumb = false,
  onChange = () => {},
  onChangeEnd = () => {},
  onDoubleClick,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)

  const onMoveStart = (event) => {
    event.preventDefault()

    document.documentElement.addEventListener(
      getEventNameByFeature('mousemove'),
      onMove
    )
    document.documentElement.addEventListener(
      getEventNameByFeature('mouseup'),
      onMoveEnd
    )

    return false
  }

  const onMove = (event) => {
    event.preventDefault()
    triggerChangeEvent(event, onChange)
    return false
  }

  const onMoveEnd = (event) => {
    event.preventDefault()
    document.documentElement.removeEventListener(
      getEventNameByFeature('mousemove'),
      onMove
    )
    document.documentElement.removeEventListener(
      getEventNameByFeature('mouseup'),
      onMoveEnd
    )
    triggerChangeEvent(event, onChangeEnd)
    setIsDragging(false)
    return false
  }

  let timeout

  const triggerChangeEvent = (event, changeCallback) => {
    if (timeout) {
      cancelAnimationFrame(timeout)
    }

    timeout = requestAnimationFrame(() => {
      setIsDragging(true)
      const containerElement = containerRef.current
      const offset =
        containerElement && containerElement.getBoundingClientRect()
      const x = getX(event) - document.documentElement.scrollLeft
      const y = getY(event) - document.documentElement.scrollTop

      const newValue = isVertical
        ? getPointerVerticalPosition(y, offset)
        : getPointerHorizontalPosition(x, offset)

      changeCallback(getCloserToDefaultValue(newValue))
    })
    return false
  }

  const thumbEventName = hasTouchEventsSupport()
    ? 'onTouchStart'
    : 'onMouseDown'

  const onClick = (event) =>
    onChangeEnd(
      ((event.clientX - containerRef.current.offsetLeft) /
        containerRef.current.offsetWidth) *
        100
    )

  return (
    <div
      className={classnames(
        style.fader,
        !isVertical && style.isHorisontal,
        isKnobThumb && style.isKnobThumb,
        isDragging && style.isDragging
      )}
      ref={containerRef}
      onClick={onClick}
    >
      <div className={style.control}>
        <FaderThumb
          position={value}
          events={{
            [thumbEventName]: onMoveStart,
            onDoubleClick: onDoubleClick
          }}
          isVertical={isVertical}
          isKnobThumb={isKnobThumb}
          className={className}
        />
      </div>
    </div>
  )
}

export default Fader
