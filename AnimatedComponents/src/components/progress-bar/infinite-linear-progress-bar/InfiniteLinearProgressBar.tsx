import React, { useEffect } from 'react'
import { View, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import { styles } from './infiniteLinearProgressBar-styles'

interface IContainerStyle extends Omit<ViewStyle, 'width'> {
  width: number
}

interface IFillStyle extends IContainerStyle {}

interface InfiniteLinearProgressBarProps {
  /** containerStyle is an optional prop which states the styles for progress bar container. */
  containerStyle?: IContainerStyle
  /** containerWidth is an optional prop which states width for progress bar container. */
  containerWidth?: number
  /** duration is an optional prop which states the duration in milliseconds for the animation. */
  duration?: number
  /** fillStyle is an optional prop which states the styles for the filled portion of the progress bar. */
  fillStyle?: IFillStyle
  /** fillWidth is an optional prop which states the width for the filled portion of the progress bar. */
  fillWidth?: number
}

const InfiniteLinearProgressBar = (props: InfiniteLinearProgressBarProps) => {
  const {
    containerStyle = {},
    containerWidth = 400,
    duration = 1000,
    fillStyle = {},
    fillWidth = 100,
  } = props

  const translateX = useSharedValue(-fillWidth)

  const fillAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  useEffect(() => {
    const totalTranslation = containerWidth + fillWidth
    translateX.value = withRepeat(
      withTiming(totalTranslation, { duration, easing: Easing.linear }),
      -1,
    )
  }, [containerWidth, fillWidth, duration])

  return (
    <View style={[styles.container, containerStyle, { width: containerWidth }]}>
      <Animated.View
        style={[styles.subContainer, fillStyle, fillAnimatedStyle, { width: fillWidth }]}
      />
    </View>
  )
}

export default InfiniteLinearProgressBar
