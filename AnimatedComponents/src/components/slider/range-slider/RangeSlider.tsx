import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { TextInput, View } from 'react-native'
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
  /** maxValue is an optional prop which states the current  maximum value of the slider */
  maxValue?: number
  /** minValue is an optional prop which states the current  minimum value of the slider */
  minValue?: number
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
    tooltipStyle = {},
    max = 100,
    maxValue = max,
    min = 0,
    minValue = min,
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
  const lowerTooltipOpacity = useSharedValue(0)
  const upperTooltipOpacity = useSharedValue(0)
  const lowerThumbZIndex = useSharedValue(0)
  const upperThumbZIndex = useSharedValue(0)
  const lowerToolTipRef = useRef<TextInput>(null)
  const upperToolTipRef = useRef<TextInput>(null)
  const AnimatedInput = Animated.createAnimatedComponent(TextInput)

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

  const setLowerToolTipText = (value: string) => {
    lowerToolTipRef.current?.setNativeProps({ text: value })
  }

  const setUpperToolTipText = (value: string) => {
    upperToolTipRef.current?.setNativeProps({ text: value })
  }

  const handleLowerThumbGesture = Gesture.Pan()
    .onTouchesDown(() => {
      lowerTooltipOpacity.value = 1
    })
    .onTouchesUp(() => {
      lowerTooltipOpacity.value = withTiming(0, { duration })
    })
    .onUpdate(event => {
      const velocityX = event.velocityX / 50
      lowerTooltipOpacity.value = 1
      positionLowerLimit.value = Math.max(
        0,
        Math.min(positionLowerLimit.value + velocityX, positionUpperLimit.value),
      )

      lowerThumbZIndex.value = 1
      upperThumbZIndex.value = 0
      const sliderMinValue = getSliderMinValue()
      runOnJS(setLowerToolTipText)(String(sliderMinValue))
    })
    .onEnd(() => {
      lowerTooltipOpacity.value = withTiming(0, { duration })
      const sliderMinValue = getSliderMinValue()
      runOnJS(setMinValue)(sliderMinValue)
    })

  const handleUpperThumbGesture = Gesture.Pan()
    .onTouchesDown(() => {
      upperTooltipOpacity.value = 1
    })
    .onTouchesUp(() => {
      upperTooltipOpacity.value = withTiming(0, { duration })
    })
    .onUpdate(event => {
      const velocityX = event.velocityX / 50
      upperTooltipOpacity.value = 1
      positionUpperLimit.value = Math.max(
        positionLowerLimit.value,
        Math.min(sliderWidth, positionUpperLimit.value + velocityX),
      )

      upperThumbZIndex.value = 1
      lowerThumbZIndex.value = 0
      const sliderMaxValue = getSliderMaxValue()
      runOnJS(setUpperToolTipText)(String(sliderMaxValue))
    })
    .onEnd(() => {
      upperTooltipOpacity.value = withTiming(0, { duration })
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

  const lowerTooltipAnimatedStyles = useAnimatedStyle(() => ({
    opacity: lowerTooltipOpacity.value,
  }))

  const upperTooltipAnimatedStyles = useAnimatedStyle(() => ({
    opacity: upperTooltipOpacity.value,
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
    () => [styles.thumb, { width: thumbSize, height: thumbSize }, thumbStyle],
    [thumbSize, thumbStyle],
  )

  useEffect(() => {
    const stepCount = (max - min) / step
    const sliderStepWidth = sliderWidth / stepCount
    const clampedMinValue = Math.min(Math.max(minValue, min), max)
    const clampedMaxValue = Math.min(Math.max(maxValue, min), max)
    const lowerPosition = ((clampedMinValue - min) * sliderStepWidth) / step
    const upperPosition = ((clampedMaxValue - min) * sliderStepWidth) / step
    positionLowerLimit.value = Math.min(lowerPosition, upperPosition)
    positionUpperLimit.value = Math.max(lowerPosition, upperPosition)
    setLowerToolTipText(String(clampedMinValue))
    setUpperToolTipText(String(clampedMaxValue))
  }, [minValue, maxValue, min, max, step, sliderWidth])

  return (
    <GestureHandlerRootView>
      <View style={sliderContainerStyles}>
        <View style={[styles.sliderBack, inactiveTrackStyle]} />
        <Animated.View style={[styles.sliderFront, activeTrackStyle, sliderAnimatedStyles]} />
        <GestureDetector gesture={handleLowerThumbGesture}>
          <Animated.View style={lowerThumbContainerStyles}>
            <AnimatedInput
              editable={false}
              ref={lowerToolTipRef}
              style={[styles.tooltip, tooltipStyle, lowerTooltipAnimatedStyles]}
              defaultValue={String(min)}
            />
            {thumbIcon || <View style={sliderThumbStyles} />}
          </Animated.View>
        </GestureDetector>
        <GestureDetector gesture={handleUpperThumbGesture}>
          <Animated.View style={upperThumbContainerStyles}>
            <AnimatedInput
              editable={false}
              ref={upperToolTipRef}
              style={[styles.tooltip, tooltipStyle, upperTooltipAnimatedStyles]}
              defaultValue={String(max)}
            />
            {thumbIcon || <View style={sliderThumbStyles} />}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}

export default React.memo(RangeSlider)
