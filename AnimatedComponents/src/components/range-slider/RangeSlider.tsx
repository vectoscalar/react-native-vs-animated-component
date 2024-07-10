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

import { AnimatedPropsProp, MAX_DEFAULT, MIN_DEFAULT, ValueSliderProps } from '@constants'

import { styles } from './rangeSlider-styles'

Animated.addWhitelistedNativeProps({ text: true })

const RangeSlider = (props: ValueSliderProps) => {
  const { sliderWidth, min, max, step, activeTrackColor, inactiveTrackColor, thumbColor } = props
  const positionLowerLimit = useSharedValue(0)
  const positionUpperLimit = useSharedValue(sliderWidth)
  const opacityLowerLimit = useSharedValue(0)
  const opacityUpperLimit = useSharedValue(0)
  const zIndexLowerLimit = useSharedValue(0)
  const zIndexUpperLimit = useSharedValue(0)

  const [minValue, setMinValue] = useState(MIN_DEFAULT)
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT)

  const handleLowerLimitGesture = (gestureState: PanGestureHandlerGestureEvent) => {
    const velocityX = gestureState.nativeEvent.velocityX / 50
    opacityLowerLimit.value = 1

    positionLowerLimit.value = Math.max(
      0,
      Math.min(positionLowerLimit.value + velocityX, positionUpperLimit.value - step),
    )

    zIndexLowerLimit.value = positionLowerLimit.value > positionUpperLimit.value ? 1 : 0

    if (gestureState.nativeEvent.state === State.END) {
      setMinValue(
        min + Math.floor(positionLowerLimit.value / (sliderWidth / ((max - min) / step))) * step,
      )
      setMaxValue(
        min + Math.floor(positionUpperLimit.value / (sliderWidth / ((max - min) / step))) * step,
      )
    }
  }

  const handleUpperLimitGesture = (gestureState: PanGestureHandlerGestureEvent) => {
    const velocityX = gestureState.nativeEvent.velocityX / 50
    opacityUpperLimit.value = 1

    positionUpperLimit.value = Math.max(
      positionLowerLimit.value + step,
      Math.min(sliderWidth, positionUpperLimit.value + velocityX),
    )

    zIndexUpperLimit.value = positionLowerLimit.value > positionUpperLimit.value ? 0 : 1

    if (gestureState.nativeEvent.state === State.END) {
      setMinValue(
        min + Math.floor(positionLowerLimit.value / (sliderWidth / ((max - min) / step))) * step,
      )
      setMaxValue(
        min + Math.floor(positionUpperLimit.value / (sliderWidth / ((max - min) / step))) * step,
      )
    }
  }

  const animatedStyleLowerLimit = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLowerLimit.value }],
    zIndex: zIndexLowerLimit.value,
  }))

  const animatedStyleUpperLimit = useAnimatedStyle(() => ({
    transform: [{ translateX: positionUpperLimit.value }],
    zIndex: zIndexUpperLimit.value,
  }))

  const opacityStyleLowerLimit = useAnimatedStyle(() => ({
    opacity: opacityLowerLimit.value,
  }))

  const opacityStyleUpperLimit = useAnimatedStyle(() => ({
    opacity: opacityUpperLimit.value,
  }))

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLowerLimit.value }],
    width: positionUpperLimit.value - positionLowerLimit.value,
  }))

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
  const minLabelText = useAnimatedProps(() => {
    const value = Math.floor(positionLowerLimit.value / (sliderWidth / ((max - min) / step))) * step
    return { text: `${min + value}` } as AnimatedPropsProp<TextInputProps>
  })

  const maxLabelText = useAnimatedProps(() => {
    const value = Math.floor(positionUpperLimit.value / (sliderWidth / ((max - min) / step))) * step
    return { text: `${min + value}` } as AnimatedPropsProp<TextInputProps>
  })

  return (
    <View style={[styles.sliderContainer, { width: sliderWidth }]}>
      <View
        style={[styles.sliderBack, { width: sliderWidth, backgroundColor: inactiveTrackColor }]}
      />
      <Animated.View
        style={[sliderStyle, styles.sliderFront, { backgroundColor: activeTrackColor }]}
      />
      <PanGestureHandler onGestureEvent={handleLowerLimitGesture}>
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
      <PanGestureHandler onGestureEvent={handleUpperLimitGesture}>
        <Animated.View style={[animatedStyleUpperLimit, styles.thumb, { borderColor: thumbColor }]}>
          <Animated.View style={[opacityStyleUpperLimit, styles.label]}>
            <AnimatedTextInput
              style={styles.labelText}
              animatedProps={maxLabelText}
              editable={false}
              defaultValue="0"
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

export default RangeSlider
