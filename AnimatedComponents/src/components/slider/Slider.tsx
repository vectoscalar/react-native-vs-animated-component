import { RangeSlider, SingleValueSlider } from '..'

import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { SliderType, ValueSliderProps } from '../../constants'

interface ISliderProps extends ValueSliderProps {
  type?: string
}

const Slider = (props: ISliderProps) => {
  const {
    max,
    min,
    sliderWidth,
    step,
    type = SliderType.SingleValueSlider,
    activeTrackColor = '#3F4CF6',
    inactiveTrackColor = '#DFEAFB',
    thumbColor = '#3F4CF6',
  } = props

  const returnSliderComponent = () => {
    let component: React.JSX.Element
    switch (type) {
      case SliderType.RangeSlider: {
        component = (
          <RangeSlider
            sliderWidth={sliderWidth}
            min={min}
            max={max}
            step={step}
            activeTrackColor={activeTrackColor}
            inactiveTrackColor={inactiveTrackColor}
            thumbColor={thumbColor}
          />
        )
        break
      }
      case SliderType.SingleValueSlider: {
        component = (
          <SingleValueSlider
            sliderWidth={sliderWidth}
            min={min}
            max={max}
            step={step}
            activeTrackColor={activeTrackColor}
            inactiveTrackColor={inactiveTrackColor}
            thumbColor={thumbColor}
          />
        )
        break
      }
      default: {
        component = (
          <SingleValueSlider
            sliderWidth={sliderWidth}
            min={min}
            max={max}
            step={step}
            activeTrackColor={activeTrackColor}
            inactiveTrackColor={inactiveTrackColor}
            thumbColor={thumbColor}
          />
        )
      }
    }
    return component
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center' }}>
      {returnSliderComponent()}
    </GestureHandlerRootView>
  )
}

export default Slider
