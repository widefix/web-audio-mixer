import React from 'react'

import Effect from '../../components/Effect'
import { useSetRecoilState } from 'recoil'
import { effectsState } from '../../store/store'
import { useMxContext } from "../../hooks"

export const EffectContainer = (props) => {
  const {mx} = useMxContext()
  const setEffects = useSetRecoilState(effectsState)

  const setSendParamValue = async (parameterId, value) => {
    if (mx.current) {
      await mx.current.setSendParamValue(props.id, parameterId, value)
    }

    setEffects((effects) => effects.map(effect => {
      if (props.id === effect.id) {
        return {
          ...effect,
          parameters: effect.parameters.map(parameter => {
            if (parameter.id === parameterId) {
              return {
                ...parameter,
                value,
              };
            }

            return parameter;
          }),
        };
      }

      return effect;
    }))

  }

  return (
    <Effect {...props} onParamChange={setSendParamValue} />
  )
}
