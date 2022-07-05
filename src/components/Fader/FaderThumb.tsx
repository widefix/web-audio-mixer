import React from 'react'

import style from './style.module.css'

const FaderThumb = ({
  position = 0,
  isVertical = false,
  events = {},
  isKnobThumb = false,
  className
}) => {
  const styleProperty = isVertical ? 'bottom' : 'left'
  const stylePropertyValue = position + '%'

  return (
    <div data-thumb>
      <div
        className={`${style.thumb} ${className}`}
        style={{
          [styleProperty]: stylePropertyValue
        }}
        {...events}
      >
      </div>
      {isKnobThumb && <div className={style.knobControl} style={{
          width: stylePropertyValue
        }}></div>}
    </div>
  )
}

export default FaderThumb
