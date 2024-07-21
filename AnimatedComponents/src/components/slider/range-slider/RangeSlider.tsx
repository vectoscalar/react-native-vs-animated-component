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

import { styles } from './rangeSlider-styles'

interface IRangeSliderProps extends ISliderProps {
  /** setMaxValue is a required function prop which sets the maximum value for slider. */
  setMaxValue: React.Dispatch<React.SetStateAction<number>>
  /** setMinValue is a required function prop which updates the min value state for slider. */
  setMinValue: React.Dispatch<React.SetStateAction<number>>
}

const RangeSlider = (props: IRangeSliderProps) => {
  const {
    activeTrackStyle = {},
    duration = 1000,
    inactiveTrackStyle = {},
    labelContainerStyle = {},
    labelTextStyle,
    max = 100,
    min = 0,
    setMaxValue,
    setMinValue,
    sliderHeight = 8,
    sliderWidth = 300,
    step = 1,
    thumbIcon,
    thumbSize = 28,
    thumbStyle = {},
  } = props

  const positionLowerLimit = useSharedValue(0)
  const positionUpperLimit = useSharedValue(sliderWidth)
  const lowerLabelOpacity = useSharedValue(0)
  const upperLabelOpacity = useSharedValue(0)
  const lowerThumbZIndex = useSharedValue(0)
  const upperThumbZIndex = useSharedValue(0)
  const [lowerLabelValue, setLowerLabelValue] = useState(min)
  const [upperLabelValue, setUpperLabelValue] = useState(max)

  const getSliderMinValue = useCallback(() => {
    'worklet'
    const stepCount = (max - min) / step
    const sliderStepWidth = sliderWidth / stepCount
    const newMinValue = min + Math.floor(positionLowerLimit.value / sliderStepWidth) * step
    return newMinValue
  }, [max, min, step, sliderWidth, positionLowerLimit.value])

  const getSliderMaxValue = useCallback(() => {
    'worklet'
    const stepCount = (max - min) / step
    const sliderStepWidth = sliderWidth / stepCount
    const newMaxValue = min + Math.floor(positionUpperLimit.value / sliderStepWidth) * step
    return newMaxValue
  }, [max, min, step, sliderWidth, positionUpperLimit.value])

  const handleLowerThumbGesture = Gesture.Pan()
    .onTouchesDown(() => {
      lowerLabelOpacity.value = 1
    })
    .onTouchesUp(() => {
      lowerLabelOpacity.value = withTiming(0, { duration })
    })
    .onUpdate(event => {
      const velocityX = event.velocityX / 50
      lowerLabelOpacity.value = 1
      positionLowerLimit.value = Math.max(
        0,
        Math.min(positionLowerLimit.value + velocityX, positionUpperLimit.value),
      )

      lowerThumbZIndex.value = 1
      upperThumbZIndex.value = 0
      const sliderMinValue = getSliderMinValue()
      runOnJS(setLowerLabelValue)(sliderMinValue)
    })
    .onEnd(() => {
      lowerLabelOpacity.value = withTiming(0, { duration })
      const sliderMinValue = getSliderMinValue()
      runOnJS(setMinValue)(sliderMinValue)
    })

  const handleUpperThumbGesture = Gesture.Pan()
    .onTouchesDown(() => {
      upperLabelOpacity.value = 1
    })
    .onTouchesUp(() => {
      upperLabelOpacity.value = withTiming(0, { duration })
    })
    .onUpdate(event => {
      const velocityX = event.velocityX / 50
      upperLabelOpacity.value = 1
      positionUpperLimit.value = Math.max(
        positionLowerLimit.value,
        Math.min(sliderWidth, positionUpperLimit.value + velocityX),
      )

      upperThumbZIndex.value = 1
      lowerThumbZIndex.value = 0
      const sliderMaxValue = getSliderMaxValue()
      runOnJS(setUpperLabelValue)(sliderMaxValue)
    })
    .onEnd(() => {
      upperLabelOpacity.value = withTiming(0, { duration })
      const sliderMaxValue = getSliderMaxValue()
      runOnJS(setMaxValue)(sliderMaxValue)
    })

  const lowerThumbContainerAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLowerLimit.value }],
    zIndex: lowerThumbZIndex.value,
  }))

  const upperThumbContainerAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: positionUpperLimit.value }],
    zIndex: upperThumbZIndex.value,
  }))

  const lowerLabelAnimatedStyles = useAnimatedStyle(() => ({
    opacity: lowerLabelOpacity.value,
  }))

  const upperLabelAnimatedStyles = useAnimatedStyle(() => ({
    opacity: upperLabelOpacity.value,
  }))

  const sliderAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLowerLimit.value }],
    width: positionUpperLimit.value - positionLowerLimit.value,
  }))

  const sliderContainerStyles = useMemo(
    () => [styles.sliderContainer, { width: sliderWidth }],
    [sliderWidth],
  )

  const lowerThumbContainerStyles = useMemo(
    () => [
      styles.thumbContainer,
      lowerThumbContainerAnimatedStyles,
      { bottom: (sliderHeight - thumbSize) / 2 },
    ],
    [positionLowerLimit.value, sliderHeight, thumbSize, upperThumbZIndex.value],
  )

  const upperThumbContainerStyles = useMemo(
    () => [
      styles.thumbContainer,
      upperThumbContainerAnimatedStyles,
      { bottom: (sliderHeight - thumbSize) / 2 },
    ],
    [positionUpperLimit.value, sliderHeight, thumbSize, upperThumbZIndex.value],
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
        <View style={[styles.sliderBack, inactiveTrackStyle]} />
        <Animated.View style={[styles.sliderFront, activeTrackStyle, sliderAnimatedStyles]} />
        <GestureDetector gesture={handleLowerThumbGesture}>
          <Animated.View style={lowerThumbContainerStyles}>
            <Animated.View
              style={[styles.labelContainer, labelContainerStyle, lowerLabelAnimatedStyles]}>
              <Text style={[styles.labelText, labelTextStyle]}>{lowerLabelValue}</Text>
            </Animated.View>
            {thumbIcon || <View style={sliderThumbStyles} />}
          </Animated.View>
        </GestureDetector>
        <GestureDetector gesture={handleUpperThumbGesture}>
          <Animated.View style={upperThumbContainerStyles}>
            <Animated.View
              style={[styles.labelContainer, labelContainerStyle, upperLabelAnimatedStyles]}>
              <Text style={[styles.labelText, labelTextStyle]}>{upperLabelValue}</Text>
            </Animated.View>
            {thumbIcon || <View style={sliderThumbStyles} />}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}

export default React.memo(RangeSlider)
