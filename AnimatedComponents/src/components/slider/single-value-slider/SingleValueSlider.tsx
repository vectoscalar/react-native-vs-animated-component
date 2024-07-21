import React, { useCallback, useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { ISliderProps } from '@types'

import { styles } from './singleValueSlider-styles'

interface ISingleValueSliderProps extends ISliderProps {
  /** setValue is a required prop which updates the  value state for slider. */
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const SingleValueSlider = (props: ISingleValueSliderProps) => {
  const {
    activeTrackStyle = {},
    duration = 1000,
    inactiveTrackStyle = {},
    labelContainerStyle = {},
    labelTextStyle = {},
    max = 100,
    min = 0,
    setValue,
    sliderHeight = 8,
    sliderWidth = 300,
    step = 1,
    thumbIcon,
    thumbSize = 28,
    thumbStyle = {},
  } = props

  const [labelValue, setLabelValue] = useState(min)
  const positionLowerLimit = useSharedValue(0)
  const labelOpacity = useSharedValue(0)

  const getSliderValue = useCallback(() => {
    'worklet'
    const stepCount = (max - min) / step
    const sliderStepWidth = sliderWidth / stepCount
    const newValue = min + Math.floor(positionLowerLimit.value / sliderStepWidth) * step
    return newValue
  }, [max, min, step, sliderWidth, positionLowerLimit.value])

  const handleThumbGesture = Gesture.Pan()
    .onTouchesDown(() => {
      labelOpacity.value = 1
    })
    .onTouchesUp(() => {
      labelOpacity.value = withTiming(0, { duration })
    })
    .onUpdate(event => {
      const velocityX = event.velocityX / 50
      labelOpacity.value = 1
      positionLowerLimit.value = Math.max(
        min,
        Math.min(positionLowerLimit.value + velocityX, sliderWidth),
      )
      const sliderValue = getSliderValue()
      runOnJS(setLabelValue)(sliderValue)
    })
    .onEnd(() => {
      labelOpacity.value = withTiming(0, { duration })
      const sliderValue = getSliderValue()
      runOnJS(setValue)(sliderValue)
    })

  const thumbContainerAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLowerLimit.value }],
  }))

  const labelAnimatedStyles = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
  }))

  const sliderAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLowerLimit.value }],
    width: sliderWidth - positionLowerLimit.value,
  }))

  const sliderContainerStyles = useMemo(
    () => [styles.sliderContainer, { width: sliderWidth, height: sliderHeight }],
    [sliderHeight, sliderWidth],
  )

  const thumbContainerStyles = useMemo(
    () => [
      styles.thumbContainer,
      thumbContainerAnimatedStyles,
      { bottom: (sliderHeight - thumbSize) / 2 },
    ],
    [sliderHeight, thumbSize, positionLowerLimit.value],
  )

  const sliderThumbStyles = useMemo(
    () => [
      styles.thumb,
      { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 },
      thumbStyle,
    ],
    [thumbSize, thumbStyle],
  )

  return (
    <GestureHandlerRootView>
      <View style={sliderContainerStyles}>
        <View style={[styles.sliderBack, activeTrackStyle]} />
        <Animated.View style={[styles.sliderFront, inactiveTrackStyle, sliderAnimatedStyles]} />
        <GestureDetector gesture={handleThumbGesture}>
          <Animated.View style={thumbContainerStyles}>
            <Animated.View
              style={[styles.labelContainer, labelContainerStyle, labelAnimatedStyles]}>
              <Text style={[styles.labelText, labelTextStyle]}>{labelValue}</Text>
            </Animated.View>
            {thumbIcon || <View style={sliderThumbStyles} />}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}

export default React.memo(SingleValueSlider)
