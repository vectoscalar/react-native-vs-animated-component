import React, { useEffect } from 'react'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import type { StyleProp } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import { Circle, Svg } from 'react-native-svg'

import { palette } from '@theme'

import { styles } from './circularProgressBar-styles'

export interface CircularProgressBarProps {
  /** duration is an optional prop which states the duration of the animation in milliseconds. */
  duration?: number
  /** labelStyle is an optional prop which states the styles for the label displayed within the circular progress bar. */
  labelStyle?: TextStyle
  /** maxValue is an optional prop which states the maximum value for the progress bar. */
  maxValue?: number
  /** outerRingColor is an optional prop which states the color of the outer ring of the circular progress bar. */
  outerRingColor?: string
  /** value is a required prop which states the current progress value. */
  value: number
  /** progressRingColor is an optional prop which states the color of the progress ring. */
  progressRingColor?: string
  /** showLabel is an optional prop which states whether the percentage label will be be visible or not. */
  showLabel?: boolean
  /** size is an optional prop which states the overall width , height  of circular progress bar. */
  size?: number
  /** strokeWidth is an optional prop which states the stroke width of the progress ring. */
  strokeWidth?: number
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const CircularProgressBar = (props: CircularProgressBarProps) => {
  const {
    duration = 1000,
    labelStyle = {},
    maxValue = 100,
    outerRingColor = palette.chineseWhite,
    progressRingColor = palette.frenchBlue,
    showLabel = true,
    size = 100,
    strokeWidth = 10,
    value = 0,
  } = props

  const progressValue = useSharedValue(0)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progressText = `${Math.round(value)}%`

  const circleAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (circumference * progressValue.value) / maxValue,
  }))

  const labelContainerStyle: StyleProp<ViewStyle> = [
    styles.labelContainer,
    { width: size, height: size },
  ]

  useEffect(() => {
    progressValue.value = withTiming(value, { duration })
  }, [value])

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        fill="none"
        r={radius}
        stroke={outerRingColor}
        strokeWidth={strokeWidth}
      />
      <AnimatedCircle
        animatedProps={circleAnimatedProps}
        cx={size / 2}
        cy={size / 2}
        fill="none"
        r={radius}
        stroke={progressRingColor}
        strokeDasharray={circumference}
        strokeWidth={strokeWidth}
        transform={`rotate(-90, ${size / 2}, ${size / 2})`}
      />
      {showLabel && (
        <View style={labelContainerStyle}>
          <Text style={[styles.label, labelStyle]}>{progressText}</Text>
        </View>
      )}
    </Svg>
  )
}
export default CircularProgressBar
