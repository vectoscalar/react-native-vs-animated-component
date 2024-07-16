import React, { useEffect } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import { styles } from './infiniteLinearProgressBar-styles'

interface InfiniteLinearProgressBarProps {
  /** duration: is an optional prop which states the duration in milliseconds for the progress animation. */
  duration?: number
  /** progressBarContainerStyle: is an optional prop which states the styles for progress bar container. */
  progressBarContainerStyle?: ViewStyle
  /** progressBarFillStyle: is an optional prop which states the styles for the filled portion of the progress bar. */
  progressBarFillStyle?: ViewStyle
}

const InfiniteLinearProgressBar = (props: InfiniteLinearProgressBarProps) => {
  const {
    duration = 1400,
    progressBarContainerStyle = { width: 500, height: 20 },
    progressBarFillStyle = { width: 100 },
  } = props

  const containerWidth = progressBarContainerStyle.width

  const fillWidth = progressBarFillStyle.width

  const translation = useSharedValue(-fillWidth!)

  useEffect(() => {
    translation.value = withRepeat(
      withTiming(containerWidth as number, { duration, easing: Easing.linear }),
      -1,
    )
  }, [containerWidth, duration])

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translation.value }] }
  })

  return (
    <View style={[styles.container, progressBarContainerStyle]}>
      <Animated.View style={[styles.subContainer, progressAnimatedStyle, progressBarFillStyle]} />
    </View>
  )
}

export default InfiniteLinearProgressBar
