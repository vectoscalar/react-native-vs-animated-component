import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, View, ViewStyle } from 'react-native'
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
  const { duration = 1400, progressBarContainerStyle = {}, progressBarFillStyle = {} } = props

  const translation = useSharedValue(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [fillWidth, setFillWidth] = useState(0)

  const startAnimation = () => {
    translation.value = -fillWidth
    translation.value = withRepeat(
      withTiming(containerWidth, { duration, easing: Easing.linear }),
      -1,
    )
  }

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }

  const handleFillLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setFillWidth(width)
  }

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translation.value }],
  }))

  useEffect(() => {
    if (containerWidth && fillWidth) {
      startAnimation()
    }
  }, [containerWidth, fillWidth, duration])

  return (
    <View style={[styles.container, progressBarContainerStyle]} onLayout={handleContainerLayout}>
      <Animated.View
        style={[styles.subContainer, progressAnimatedStyle, progressBarFillStyle]}
        onLayout={handleFillLayout}
      />
    </View>
  )
}

export default InfiniteLinearProgressBar
