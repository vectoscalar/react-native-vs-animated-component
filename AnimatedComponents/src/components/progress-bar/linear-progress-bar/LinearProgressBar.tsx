import React, { useEffect } from 'react'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { styles } from './LinearProgressBar-styles'

interface ILinearProgressBarProps {
  /** containerStyle: is an optional prop which states the styles for progress bar container. */
  containerStyle?: ViewStyle
  /** duration: is an optional prop which states the duration in milliseconds for the progress animation. */
  duration?: number
  /** fillStyle: is an optional prop which states the styles for the filled portion of the progress bar. */
  fillStyle?: ViewStyle
  /** labelStyle: is an optional prop which states the styles for the progress label. */
  labelStyle?: TextStyle
  /** progress: is a required prop which states the progress value. */
  progress: number
}

const LinearProgressBar = (props: ILinearProgressBarProps) => {
  const { containerStyle = {}, duration = 500, fillStyle = {}, labelStyle = {}, progress } = props

  const progressValue = useSharedValue(0)
  const progressText = `${Math.round(progress)}%`

  const fillAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }))

  useEffect(() => {
    progressValue.value = withTiming(progress, { duration })
  }, [progress])

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.subContainer, fillStyle, fillAnimatedStyle]} />
      <View style={styles.labelContainer}>
        <Text style={[styles.label, labelStyle]}>{progressText}</Text>
      </View>
    </View>
  )
}

export default LinearProgressBar
