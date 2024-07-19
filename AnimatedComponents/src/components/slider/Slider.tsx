import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { RangeSlider, SingleValueSlider } from '@components'
import { SliderType } from '@constants'
import { palette } from '@theme'
import { ValueSliderProps } from '@types'

interface ISliderProps extends ValueSliderProps {
  /** type is an optional prop specifies the type of slider  */
  type?: SliderType
}

const Slider = (props: ISliderProps) => {
  const {
    activeTrackColor = palette.frenchBlue,
    inactiveTrackColor = palette.chineseWhite,
    max = 100,
    min = 0,
    sliderWidth = 300,
    step = 1,
    thumbColor = palette.frenchBlue,
    type = SliderType.SingleValueSlider,
  } = props

  const renderSlider = () => {
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

  return <GestureHandlerRootView>{renderSlider()}</GestureHandlerRootView>
}

export default Slider
