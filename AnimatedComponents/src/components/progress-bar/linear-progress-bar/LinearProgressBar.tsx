import React, { useEffect } from 'react'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { styles } from './LinearProgressBar-styles'

interface IContainerStyle extends Omit<ViewStyle, 'width'> {
  width: number
}

interface IFillStyle extends IContainerStyle {}

interface ILinearProgressBarProps {
  /** containerStyle is an optional prop which states the styles for progress bar container. */
  containerStyle?: IContainerStyle
  /** containerWidth is an optional prop which states width for progress bar container. */
  containerWidth?: number
  /** duration is an optional prop which states the duration in milliseconds for the progress animation. */
  duration?: number
  /** fillStyle is an optional prop which states the styles for the filled portion of the progress bar. */
  fillStyle?: IFillStyle
  /** labelStyle is an optional prop which states the styles for the progress label. */
  labelStyle?: TextStyle
  /** maxValue is an optional prop which states the maximum value of progress bar. */
  maxValue?: number
  /** showLabel is an optional prop which states whether the percentage label will be be visible or not. */
  showLabel?: boolean
  /** value is a required prop which states the progress value. */
  value: number
}

const LinearProgressBar = (props: ILinearProgressBarProps) => {
  const {
    containerStyle = {},
    containerWidth = 400,
    duration = 1000,
    fillStyle = {},
    labelStyle = {},
    maxValue = 100,
    showLabel = true,
    value,
  } = props

  const translateX = useSharedValue(0)
  const progressText = `${Math.round(value)}%`

  const fillAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  useEffect(() => {
    const totalTranslation = (containerWidth / maxValue) * value - containerWidth
    translateX.value = withTiming(totalTranslation, { duration })
  }, [value, duration, containerWidth, maxValue])

  return (
    <View style={[styles.container, containerStyle, { width: containerWidth }]}>
      <Animated.View style={[styles.subContainer, fillStyle, fillAnimatedStyle]} />
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>{progressText}</Text>
        </View>
      )}
    </View>
  )
}

export default LinearProgressBar
