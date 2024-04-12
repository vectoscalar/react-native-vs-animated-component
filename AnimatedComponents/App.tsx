/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { RangeSlider, Slider } from '@components'

const App = () => {
  const MIN_DEFAULT = 0
  const MAX_DEFAULT = 100
  const [minValue, setMinValue] = useState(MIN_DEFAULT)
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT)

  const returnSliderComponent = (mode: string) => {
    switch (mode) {
      case 'Range': {
        return (
          <RangeSlider
            sliderWidth={300}
            min={0}
            max={100}
            step={5}
            onValueChange={range => {
              setMinValue(range.min)
              setMaxValue(range.max)
            }}
          />
        )
      }
      default: {
        return (
          <Slider
            sliderWidth={300}
            min={0}
            max={100}
            step={5}
            onValueChange={range => {
              setMinValue(range.min)
              setMaxValue(range.max)
            }}
          />
        )
      }
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center' }}>
      {returnSliderComponent('Range')}
    </GestureHandlerRootView>
  )
}

export default App
