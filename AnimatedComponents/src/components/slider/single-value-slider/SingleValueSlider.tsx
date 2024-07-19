import React, { useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import { MAX_DEFAULT, MIN_DEFAULT } from '@constants'
import { palette } from '@theme'
import { AnimatedProps, ValueSliderProps } from '@types'

import { styles } from './singleValueSlider-styles'

const SingleValueSlider = (props: ValueSliderProps) => {
  const {
    sliderWidth = 400,
    min = 0,
    max = 100,
    step = 1,
    activeTrackColor = palette.frenchBlue,
    inactiveTrackColor = palette.chineseWhite,
    thumbColor = palette.frenchBlue,
  } = props
  const positionLowerLimit = useSharedValue(0)
  const positionUpperLimit = useSharedValue(sliderWidth)
  const opacityLimit = useSharedValue(0)
  const [minValue, setMinValue] = useState(MIN_DEFAULT)
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT)

  Animated.addWhitelistedNativeProps({ text: true })

  const handleSlideGesture = (gestureState: PanGestureHandlerGestureEvent) => {
    const velocityX = gestureState.nativeEvent.velocityX / 50
    opacityLimit.value = 1
    positionLowerLimit.value = Math.max(
      0,
      Math.min(positionLowerLimit.value + velocityX, sliderWidth),
    )
    if (gestureState.nativeEvent.state === State.END) {
      const newValue =
        min + Math.floor(positionLowerLimit.value / (sliderWidth / ((max - min) / step))) * step
      setMinValue(newValue)
      setMaxValue(Math.min(newValue + step, max))
    }
  }

  const animatedStyleLowerLimit = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLowerLimit.value }],
  }))

  const opacityStyleLowerLimit = useAnimatedStyle(() => ({
    opacity: opacityLimit.value,
  }))

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLowerLimit.value }],
    width: positionUpperLimit.value - positionLowerLimit.value,
  }))

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

  const minLabelText = useAnimatedProps(() => {
    const value = Math.floor(positionLowerLimit.value / (sliderWidth / ((max - min) / step))) * step
    return { text: `${min + value}` } as AnimatedProps<TextInputProps>
  })

  return (
    <View style={[styles.sliderContainer, { width: sliderWidth }]}>
      <View
        style={[styles.sliderBack, { width: sliderWidth, backgroundColor: activeTrackColor }]}
      />
      <Animated.View
        style={[sliderStyle, styles.sliderFront, { backgroundColor: inactiveTrackColor }]}
      />
      <PanGestureHandler onGestureEvent={handleSlideGesture}>
        <Animated.View style={[animatedStyleLowerLimit, styles.thumb, { borderColor: thumbColor }]}>
          <Animated.View style={[opacityStyleLowerLimit, styles.label]}>
            <AnimatedTextInput
              style={styles.labelText}
              animatedProps={minLabelText}
              editable={false}
              defaultValue="0"
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}
export default SingleValueSlider
