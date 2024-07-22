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

import { TimerPreset } from '@constants'

import styles from './timer-styles'

const AnimatedSvgCircle = Animated.createAnimatedComponent(SvgCircle)
const ReanimatedText = Animated.createAnimatedComponent(TextInput)
interface ITimerProps {
  /** buttonStyles: is an optional prop to style the buttons of the timer */
  buttonStyles?: { container?: ViewStyle; text?: TextStyle }
  /** circularTimerRadius: is an optional prop that indicates the radius of circular timer */
  circularTimerRadius?: number
  /** controls: is an optional prop that indicates whether control buttons are visible or not */
  controls?: boolean
  /** duration: is a required prop that indicates the total number of seconds of timer */
  duration: number
  /** linearTimerWidth: is an optional prop that indicates the width of the linear timer */
  linearTimerWidth?: number
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
    circularTimerRadius = 45,
    controls = false,
    duration,
    linearTimerWidth = 10,
    showTimeLeft = true,
    strokeColor = 'black',
    timeLeftTextStyle = {},
    type,
  } = props

  const progress = useSharedValue(0)
  const isRunning = useSharedValue(false)
  const isPaused = useSharedValue(false)

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
    (action: 'start' | 'pause' | 'resume') => {
      switch (action) {
        case 'start': {
          isRunning.value = true
          isPaused.value = false
          startAnimation(duration * 1000)
          break
        }
        case 'pause': {
          isRunning.value = false
          isPaused.value = true
          cancelAnimation(progress)
          break
        }
        case 'resume': {
          isRunning.value = true
          isPaused.value = false
          startAnimation((1 - progress.value) * duration * 1000)
          break
        }
        default: {
          console.warn(`Unexpected action: ${action}`)
          break
        }
      }
    },
    [duration],
  )

  const handleReset = useCallback(() => {
    progress.value = 0
    isRunning.value = false
    isPaused.value = false
  }, [])

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value * 2 * Math.PI * circularTimerRadius,
  }))

  const animatedLinearStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -progress.value * 300 }],
    backgroundColor: strokeColor,
    borderRadius: 10,
    height: linearTimerWidth,
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

  const handleStart = () => {
    handleControl('start')
  }

  const handleResume = () => {
    handleControl('resume')
  }

  const handlePause = () => {
    handleControl('pause')
  }

  const renderControlButtons = useMemo(
    () => (
      <>
        {!isRunning && !isPaused ? (
          <TouchableOpacity onPress={handleStart} style={[styles.button, buttonStyles?.container]}>
            <Text style={[styles.buttonText, buttonStyles?.text]}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handlePause} style={[styles.button, buttonStyles?.container]}>
            <Text style={[styles.buttonText, buttonStyles?.text]}>Pause</Text>
          </TouchableOpacity>
        )}
        {isPaused && (
          <TouchableOpacity onPress={handleResume} style={[styles.button, buttonStyles?.container]}>
            <Text style={[styles.buttonText, buttonStyles?.text]}>Resume</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleReset} style={[styles.button, buttonStyles?.container]}>
          <Text style={[styles.buttonText, buttonStyles?.text]}>Reset</Text>
        </TouchableOpacity>
      </>
    ),
    [isRunning, isPaused, buttonStyles, handleControl, handleReset],
  )

  const renderTimer = () => {
    return type === TimerPreset.Linear ? (
      <View
        style={[
          styles.linearContainer,
          { width: 300, height: linearTimerWidth, borderRadius: 10 },
        ]}>
        <Animated.View style={[styles.linearProgress, animatedLinearStyle]} />
      </View>
    ) : (
      <View style={styles.circularContainer}>
        <Svg
          width={circularTimerRadius * 2 + 10}
          height={circularTimerRadius * 2 + 10}
          viewBox={`0 0 ${circularTimerRadius * 2 + 10} ${circularTimerRadius * 2 + 10}`}>
          <SvgCircle
            cx={circularTimerRadius + 5}
            cy={circularTimerRadius + 5}
            r={circularTimerRadius}
            stroke="#e0e0e0"
            strokeWidth={10}
            fill="none"
          />
          <AnimatedSvgCircle
            cx={circularTimerRadius + 5}
            cy={circularTimerRadius + 5}
            r={circularTimerRadius}
            stroke={strokeColor}
            strokeWidth={10}
            fill="none"
            strokeDasharray={`${2 * Math.PI * circularTimerRadius}`}
            animatedProps={animatedCircleProps}
          />
        </Svg>
        {showTimeLeft && (
          <ReanimatedText
            style={[styles.timeLeftTextLinear, timeLeftTextStyle]}
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
