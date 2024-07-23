import React, { useCallback, useEffect, useMemo } from 'react'
import { Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Circle as SvgCircle } from 'react-native-svg'

import { PauseIcon, PlayIcon, ResetIcon } from '@assets'
import { TimerPreset } from '@constants'

import styles from './timer-styles'

const AnimatedSvgCircle = Animated.createAnimatedComponent(SvgCircle)
const ReanimatedText = Animated.createAnimatedComponent(TextInput)
interface ITimerProps {
  /** buttonStyles: is an optional prop to style the buttons of the timer */
  buttonStyles?: ViewStyle
  /** circularDimensions: is an optional prop that indicates the radius and stroke width of the circular timer */
  circularDimensions?: { radius?: number; strokeWidth?: number }
  /** controls: is an optional prop that indicates whether control buttons are visible or not */
  controls?: boolean
  /** duration: is a required prop that indicates the total number of seconds of timer */
  duration: number
  /** linearDimensions: is an optional prop that indicates the width and height of the linear timer */
  linearDimensions?: { width?: number; height?: number }
  /** showTimeLeft: is an optional prop that indicates whether to display time left on screen or not. */
  showTimeLeft?: boolean
  /** strokeColor: is an optional prop that indicates the color of timer */
  strokeColor?: string
  /** timeLeftTextStyle: is an optional prop to style the time left text of the timer */
  timeLeftTextStyle?: TextStyle
  /** type: is a required prop that indicates the type of timer, circular or linear */
  type: TimerPreset
}

const Timer = (props: ITimerProps) => {
  const {
    buttonStyles = {},
    circularDimensions = { radius: 45, strokeWidth: 10 },
    controls = false,
    duration,
    linearDimensions = { width: 300, height: 10 },
    showTimeLeft = true,
    strokeColor = 'black',
    timeLeftTextStyle = {},
    type,
  } = props

  const progress = useSharedValue(0)
  const isRunning = useSharedValue(false)

  const startAnimation = (duration: number) => {
    progress.value = withTiming(
      1,
      {
        duration,
        easing: Easing.linear,
      },
      () => {
        isRunning.value = false
      },
    )
  }

  const handleControl = useCallback(
    (action: 'start' | 'pause' | 'resume' | 'reset') => {
      switch (action) {
        case 'start':
          isRunning.value = true
          startAnimation(duration * 1000)
          break
        case 'pause':
          isRunning.value = false
          cancelAnimation(progress)
          break
        case 'resume':
          isRunning.value = true
          startAnimation((1 - progress.value) * duration * 1000)
          break
        case 'reset':
          progress.value = 0
          isRunning.value = false
          break
        default:
          console.warn(`Unexpected action`)
          break
      }
    },
    [duration],
  )

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value * 2 * Math.PI * (circularDimensions.radius ?? 45),
  }))

  const animatedLinearStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -progress.value * (linearDimensions.width ?? 300) }],
    backgroundColor: strokeColor,
    borderRadius: 10,
    height: linearDimensions.height,
  }))

  const reanimatedProps = useAnimatedProps(() => {
    const remainingTime = Math.floor(duration * (1 - progress.value))
    const minutes = Math.floor(remainingTime / 60)
    const seconds = Math.floor(remainingTime % 60)
    const text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    return {
      text: `${text}`,
    } as any
  })

  useEffect(() => {
    handleControl('start')
  }, [])

  const handleReset = () => {
    handleControl('reset')
  }

  const handleResume = () => {
    handleControl('resume')
  }

  const handlePause = () => {
    handleControl('pause')
  }

  const playIconStyle = useAnimatedStyle(() => {
    return {
      opacity: isRunning.value ? withTiming(0) : withTiming(1),
    }
  })

  const pauseIconStyle = useAnimatedStyle(() => {
    return {
      opacity: isRunning.value ? withTiming(1) : withTiming(0),
    }
  })

  const renderControlButtons = useMemo(
    () => (
      <View style={[styles.iconContainer, buttonStyles]}>
        <View style={styles.icons}>
          <Animated.View style={playIconStyle}>
            <PlayIcon onPress={handleResume} />
          </Animated.View>
          <Animated.View style={pauseIconStyle}>
            <PauseIcon onPress={handlePause} />
          </Animated.View>
        </View>
        <ResetIcon onPress={handleReset} />
      </View>
    ),
    [isRunning.value, buttonStyles, handleControl],
  )

  const renderTimer = () => {
    return type === TimerPreset.Linear ? (
      <View
        style={[
          styles.linearContainer,
          { width: linearDimensions.width, height: linearDimensions.height, borderRadius: 10 },
        ]}>
        <Animated.View style={[styles.linearProgress, animatedLinearStyle]} />
      </View>
    ) : (
      <View style={styles.circularContainer}>
        <Svg
          width={(circularDimensions.radius ?? 45) * 2 + 10}
          height={(circularDimensions.radius ?? 45) * 2 + 10}
          viewBox={`0 0 ${(circularDimensions.radius ?? 45) * 2 + 10} ${
            (circularDimensions.radius ?? 45) * 2 + 10
          }`}>
          <SvgCircle
            cx={(circularDimensions.radius ?? 45) + 5}
            cy={(circularDimensions.radius ?? 45) + 5}
            r={circularDimensions.radius ?? 45}
            stroke="#e0e0e0"
            strokeWidth={circularDimensions.strokeWidth}
            fill="none"
          />
          <AnimatedSvgCircle
            cx={(circularDimensions.radius ?? 45) + 5}
            cy={(circularDimensions.radius ?? 45) + 5}
            r={circularDimensions.radius ?? 45}
            stroke={strokeColor}
            strokeWidth={circularDimensions.strokeWidth}
            fill="none"
            strokeDasharray={`${2 * Math.PI * (circularDimensions.radius ?? 45)}`}
            animatedProps={animatedCircleProps}
          />
        </Svg>
        {showTimeLeft && (
          <ReanimatedText
            style={[styles.timeLeftTextCircular, timeLeftTextStyle]}
            animatedProps={reanimatedProps}
          />
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderTimer()}
      {type === TimerPreset.Linear && showTimeLeft && (
        <ReanimatedText
          style={[styles.timeLeftTextLinear, timeLeftTextStyle]}
          animatedProps={reanimatedProps}
        />
      )}
      <View style={styles.buttonContainer}>{controls && renderControlButtons}</View>
    </View>
  )
}

export default Timer
