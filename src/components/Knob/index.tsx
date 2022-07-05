import React, { useMemo } from 'react'
import style from './style.module.css'

interface KnobProps {
  min: number
  max: number
  value: number
  onChange: any
}

const Knob = ({ max, min, value, onChange }: KnobProps) => {
  const minDeg = 45
  const maxDeg = 270
  const radius = 200
  const notMoveArea = 15

  const deg = useMemo(() => (maxDeg / max) * value + minDeg, [value])

  const onDoubleClick = () => {
    onChange(50)
  }


  const startDrag = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const knob = event.target.getBoundingClientRect()

    const startCoordinate = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    }

    const moveHandler = (e) => {
      generateDeg(e.clientX, e.clientY, startCoordinate)
    }

    document.addEventListener('mousemove', moveHandler)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveHandler)
    })
  }

  const generateDeg = (x, y, startXY) => {
    const distanceToStart = ((x - startXY.x) ** 2 + (y - startXY.y) ** 2) ** 0.5
    const currentPositionToStart = {
      x: x - startXY.x,
      y: y - startXY.y
    }

    if (distanceToStart > notMoveArea) {
      const step = max / radius
      if (currentPositionToStart.x > currentPositionToStart.y) {
        const newValue = value + (distanceToStart - notMoveArea) * step
        onChange(newValue <= max ? newValue : max)
      } else {
        const newValue = value - (distanceToStart - notMoveArea) * step
        onChange(newValue >= min ? newValue : min)
      }
    }
  }

  return (
    <div className={style.knob} onDoubleClick={onDoubleClick}>
      <div className={`${style.knob} ${style.outer}`} onMouseDown={startDrag}>
        <div
          className={`${style.knob} ${style.inner}`}
          style={{ transform: 'rotate(' + deg + 'deg)' }}
        >
          <div className={style.grip} />
        </div>
      </div>
    </div>
  )
}

export default Knob
