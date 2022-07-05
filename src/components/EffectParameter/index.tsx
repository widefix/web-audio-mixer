import React from 'react'

import Fader from './../Fader'
import Radio from './../Radio'

import style from './style.module.css'

const EffectParameterMap = {
  fader: Fader,
  radio: Radio
}

const getControlByType = (type) => EffectParameterMap[type]

export type EffectParameterType = 'fader' | 'radio'

export interface EffectParameterProps {
  id: string
  name: string
  type: EffectParameterType
  onChange: (id) => void
}

const EffectParameter: React.FC<EffectParameterProps> = ({
  onChange,
  ...props
}) => {
  const { id, name, type = 'fader' } = props

  const Control = getControlByType(type)

  return Control ? (
    <div className={style.parameter} key={id}>
      <span className={style.title}>{name}:</span>
      <div className={style.controlContainer}>
        <Control {...props} onChange={onChange(id)} />
      </div>
    </div>
  ) : null
}

export default EffectParameter
