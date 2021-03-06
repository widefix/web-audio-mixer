import React from 'react'
import { shallow } from 'enzyme'

import EffectParameter, { EffectParameterType } from '../'

const propsMock = {
  id: 'delay',
  name: 'Delay',
  type: 'radio' as EffectParameterType,
  onChange: jest.fn()
}

describe('<EffectParameter />', () => {
  it('should renders without any errors', () => {
    const wrapper = shallow(<EffectParameter {...propsMock} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('type', () => {
    it('"radio" renders <Radio />', () => {
      const props = {
        ...propsMock
      }

      const wrapper = shallow(<EffectParameter {...props} />)
      const result =
        wrapper.find('.controlContainer').find('Radio').length === 1

      expect(result).toBe(true)
    })

    it('"fader" renders <Fader />', () => {
      const props = {
        ...propsMock,
        type: 'fader' as EffectParameterType
      }

      const wrapper = shallow(<EffectParameter {...props} />)
      const result =
        wrapper.find('.controlContainer').find('Fader').length === 1

      expect(result).toBe(true)
    })

    it('returns nothing for unsupported type', () => {
      const props = {
        ...propsMock,
        type: 'weed' as EffectParameterType
      }

      const wrapper = shallow(<EffectParameter {...props} />)
      const result = wrapper.isEmptyRender()

      expect(result).toBe(true)
    })
  })

  describe('onChange', () => {
    it('should be called on control change', () => {
      const wrapper = shallow(<EffectParameter {...propsMock} />)

      wrapper.find('Radio').at(0).simulate('click')

      expect(propsMock.onChange).toBeCalled()
    })
  })
})
