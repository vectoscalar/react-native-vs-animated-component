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

export interface CircularProgressBarProps {
  /** duration is an optional prop which states the duration of the animation in milliseconds. */
  duration?: number
  /** outerRingColor is an optional prop that sets the color of the outer ring of the progress bar. */
  outerRingColor?: string
  /** progressRingColor is an optional prop that states the color of the progress ring. */
  progressRingColor?: string
  /** size is an optional prop that states the determines overall width , height , diameter of progress bar. */
  size?: number
  /** strokeWidth is an optional prop that sets the stroke width of the progress ring. */
  strokeWidth?: number
}

const CircularProgressBar = (props: CircularProgressBarProps) => {
  const {
    duration = 800,
    outerRingColor = palette.chineseWhite,
    progressRingColor = palette.frenchBlue,
    size = 100,
    strokeWidth = 10,
  } = props

  const rotateValue = useSharedValue(0)
  useEffect(() => {
    rotateValue.value = withRepeat(
      withTiming(360, { duration: duration, easing: Easing.linear }),
      -1,
    )
  }, [duration])

  const animatedStyles = useAnimatedStyle(() => {
    return { transform: [{ rotate: `${rotateValue.value}deg` }] }
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderBottomColor: outerRingColor,
          borderLeftColor: outerRingColor,
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
export default CircularProgressBar
