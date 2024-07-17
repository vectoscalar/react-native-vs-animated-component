import React, { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import { palette } from '@theme'

import { styles } from './infiniteCircularProgressBar-styles'

export interface InfiniteCircularProgressBarProps {
  /** duration is an optional prop which states the duration of the animation in milliseconds. */
  duration?: number
  /** outerRingColor is an optional prop which states the color of the outer ring of the circular progress bar. */
  outerRingColor?: string
  /** progressRingColor is an optional prop which states the color of the progress ring. */
  progressRingColor?: string
  /** size is an optional prop which states the overall width , height  of circular progress bar. */
  size?: number
  /** strokeWidth is an optional prop which states the stroke width of the progress ring. */
  strokeWidth?: number
}

const InfiniteCircularProgressBar = (props: InfiniteCircularProgressBarProps) => {
  const {
    duration = 1000,
    outerRingColor = palette.chineseWhite,
    progressRingColor = palette.frenchBlue,
    size = 100,
    strokeWidth = 10,
  } = props

  const rotateValue = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return { transform: [{ rotate: `${rotateValue.value}deg` }] }
  })

  useEffect(() => {
    rotateValue.value = withRepeat(withTiming(360, { duration, easing: Easing.linear }), -1)
  }, [duration])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderBottomColor: outerRingColor,
          borderLeftColor: outerRingColor,
          borderRadius: size / 2,
          borderRightColor: outerRingColor,
          borderTopColor: progressRingColor,
          borderWidth: strokeWidth,
          height: size,
          width: size,
        },
        animatedStyles,
      ]}
    />
  )
}
export default InfiniteCircularProgressBar
