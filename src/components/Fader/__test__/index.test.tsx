import React from 'react'
import { shallow, mount } from 'enzyme'

import Fader from '..'

describe('<Fader />', () => {
  it('should render without any errors', () => {
    const wrapper = shallow(<Fader />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('value', () => {
    it('should be passed to thumb', () => {
      const value = 42.0
      const wrapper = shallow(<Fader value={value} />)

      const result = wrapper.find('FaderThumb').prop('position')

      expect(result).toBe(value)
    })
  })

  describe('isVertical', () => {
    it('should have isHorisontal class on false', () => {
      const wrapper = shallow(<Fader isVertical={false} />)

      const result = wrapper.hasClass('isHorisontal')

      expect(result).toBe(true)
    })

    it('should omit isHorisontal class on true', () => {
      const wrapper = shallow(<Fader isVertical />)

      const result = wrapper.hasClass('isHorisontal')

      expect(result).toBe(false)
    })
  })

  describe('onChange', () => {
    it('should be called on value change', () => {
      const onChangeMock = jest.fn()
      const wrapper = mount(<Fader onChange={onChangeMock} />)

      wrapper.find('FaderThumb').simulate('mouseDown')

      window.document.documentElement.dispatchEvent(new Event('mousemove'))
      window.document.documentElement.dispatchEvent(new Event('mouseup'))

      expect(onChangeMock).toBeCalled()
    })
  })
})
