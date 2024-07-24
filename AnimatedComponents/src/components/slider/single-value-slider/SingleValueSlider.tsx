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

import { styles } from './singleValueSlider-styles'

interface ISingleValueSliderProps extends ISliderProps {
  /** setValue is a required prop which updates the  value state for slider. */
  setValue: React.Dispatch<React.SetStateAction<number>>
  /** value is an optional prop which states the current value of the slider */
  value?: number
}

const SingleValueSlider = (props: ISingleValueSliderProps) => {
  const {
    activeTrackStyle = {},
    duration = 1000,
    inactiveTrackStyle = {},
    max = 100,
    min = 0,
    setValue,
    sliderHeight = 8,
    sliderWidth = 300,
    step = 1,
    thumbIcon,
    thumbSize = 28,
    thumbStyle = {},
    tooltipStyle = {},
    value = min,
  } = props

  const positionLowerLimit = useSharedValue(0)
  const tooltipOpacity = useSharedValue(0)
  const tooltipRef = useRef<TextInput>(null)
  const AnimatedInput = Animated.createAnimatedComponent(TextInput)

  const setToolTipText = (value: string) => {
    tooltipRef.current?.setNativeProps({ text: value })
  }

  const getSliderValue = useCallback(() => {
    'worklet'
    const stepCount = (max - min) / step
    const sliderStepWidth = sliderWidth / stepCount
    const newValue = min + Math.floor(positionLowerLimit.value / sliderStepWidth) * step
    return newValue
  }, [max, min, step, sliderWidth, positionLowerLimit.value])

  const handleThumbGesture = Gesture.Pan()
    .onTouchesDown(() => {
      tooltipOpacity.value = 1
    })
    .onTouchesUp(() => {
      tooltipOpacity.value = withTiming(0, { duration })
    })
    .onUpdate(event => {
      const velocityX = event.velocityX / 50
      tooltipOpacity.value = 1
      positionLowerLimit.value = Math.max(
        min,
        Math.min(positionLowerLimit.value + velocityX, sliderWidth),
      )
      const sliderValue = getSliderValue()

      runOnJS(setToolTipText)(String(sliderValue))
    })
    .onEnd(() => {
      tooltipOpacity.value = withTiming(0, { duration })
      const sliderValue = getSliderValue()
      runOnJS(setValue)(sliderValue)
    })

  const thumbContainerAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLowerLimit.value }],
  }))

  const tooltipAnimatedStyles = useAnimatedStyle(() => ({
    opacity: tooltipOpacity.value,
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
    () => [styles.thumb, { width: thumbSize, height: thumbSize }, thumbStyle],
    [thumbSize, thumbStyle],
  )

  useEffect(() => {
    const stepCount = (max - min) / step
    const sliderStepWidth = sliderWidth / stepCount
    const clampedValue = Math.min(Math.max(value, min), max)
    positionLowerLimit.value = ((clampedValue - min) * sliderStepWidth) / step
    setToolTipText(String(clampedValue))
  }, [value, min, max, step, sliderWidth])

  return (
    <GestureHandlerRootView>
      <View style={sliderContainerStyles}>
        <View style={[styles.sliderBack, activeTrackStyle]} />
        <Animated.View style={[styles.sliderFront, inactiveTrackStyle, sliderAnimatedStyles]} />
        <GestureDetector gesture={handleThumbGesture}>
          <Animated.View style={thumbContainerStyles}>
            <AnimatedInput
              editable={false}
              ref={tooltipRef}
              style={[styles.tooltip, tooltipStyle, tooltipAnimatedStyles]}
              defaultValue={String(value)}
            />
            {thumbIcon || <View style={sliderThumbStyles} />}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}

export default React.memo(SingleValueSlider)
