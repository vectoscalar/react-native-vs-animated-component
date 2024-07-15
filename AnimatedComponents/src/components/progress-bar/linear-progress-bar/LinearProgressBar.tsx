import React, { useEffect } from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { styles } from './LinearProgressBar-styles'

interface ILinearProgressBarProps {
  /** duration: is an optional prop which states the duration in milliseconds for the progress animation. */
  duration?: number
  /** labelStyle: is an optional prop which states the styles for the progress label. */
  labelStyle?: StyleProp<TextStyle>
  /** progress: is a required prop which states the progress value. */
  progress: number
  /** progressBarContainerStyle: is an optional prop which states the styles for progress bar container. */
  progressBarContainerStyle?: StyleProp<ViewStyle>
  /** progressBarFillStyle: is an optional prop which states the styles for the filled portion of the progress bar. */
  progressBarFillStyle?: StyleProp<ViewStyle>
}

const LinearProgressBar = (props: ILinearProgressBarProps) => {
  const {
    duration = 500,
    labelStyle = {},
    progress,
    progressBarContainerStyle = {},
    progressBarFillStyle = {},
  } = props

  const progressValue = useSharedValue(0)

  useEffect(() => {
    progressValue.value = withTiming(progress, { duration })
  }, [progress])

  const progressBarAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value * 100}%`,
  }))

  const progressText = useDerivedValue(() => `${Math.round(progressValue.value * 100)}%`).value

  return (
    <View style={[styles.container, progressBarContainerStyle]}>
      <Animated.View
        style={[styles.subContainer, progressBarFillStyle, progressBarAnimatedStyle]}
      />
      <View style={styles.labelContainer}>
        <Text style={[styles.label, labelStyle]}>{progressText}</Text>
      </View>
    </View>
  )
}

export default LinearProgressBar
