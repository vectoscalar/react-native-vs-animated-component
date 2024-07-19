import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
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

interface ITimerProps {
  /** buttonStyles: is an optional prop to style the buttons of the timer */
  buttonStyles?: { container?: ViewStyle; text?: TextStyle }
  /** circularTimerStrokeColor: is an optional prop that indicates the stroke color of circular timer */
  circularTimerStrokeColor?: string
  /** linearTimerColor: is an optional prop that indicates the color of linear timer */
  linearTimerColor?: string
  /** timerType: is a required prop that indicates the type of timer, circular or linear */
  timerType: TimerPreset
  /** totalDurationInSeconds: is a required prop that indicates the total number of seconds of timer */
  totalDurationInSeconds: number
}

const Timer = (props: ITimerProps) => {
  const {
    buttonStyles,
    circularTimerStrokeColor = 'black',
    linearTimerColor = 'black',
    timerType,
    totalDurationInSeconds,
  } = props

  const [timeLeft, setTimeLeft] = useState(totalDurationInSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const progress = useSharedValue(1) // Initialize progress as a shared value

  const handleControl = useCallback(
    (action: 'start' | 'pause' | 'resume') => {
      switch (action) {
        case 'start': {
          setIsRunning(true)
          setIsPaused(false)
          startAnimation(timeLeft * 1000)
          break
        }
        case 'pause': {
          setIsRunning(false)
          setIsPaused(true)
          cancelAnimation(progress)
          break
        }
        case 'resume': {
          setIsRunning(true)
          setIsPaused(false)
          startAnimation(timeLeft * 1000)
          break
        }
      }
    },
    [timeLeft, progress],
  )

  const startAnimation = (duration: number) => {
    progress.value = withTiming(0, { duration, easing: Easing.linear })
  }

  const handleReset = useCallback(() => {
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(totalDurationInSeconds)
    progress.value = 1
  }, [totalDurationInSeconds, progress])

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: (1 - progress.value) * 2 * Math.PI * 45,
  }))

  const animatedLinearStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: linearTimerColor,
  }))

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRunning])

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false)
    }
  }, [timeLeft])

  const renderControlButtons = useMemo(
    () => (
      <>
        {!isRunning && !isPaused ? (
          <TouchableOpacity
            onPress={() => handleControl('start')}
            style={[styles.button, buttonStyles?.container]}>
            <Text style={[styles.buttonText, buttonStyles?.text]}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleControl('pause')}
            style={[styles.button, buttonStyles?.container]}>
            <Text style={[styles.buttonText, buttonStyles?.text]}>Pause</Text>
          </TouchableOpacity>
        )}
        {isPaused && (
          <TouchableOpacity
            onPress={() => handleControl('resume')}
            style={[styles.button, buttonStyles?.container]}>
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
    return timerType === TimerPreset.Linear ? (
      <View style={styles.linearContainer}>
        <Animated.View style={[styles.linearProgress, animatedLinearStyle]} />
      </View>
    ) : (
      <Svg width={100} height={100} viewBox="0 0 100 100">
        <SvgCircle cx="50" cy="50" r="45" stroke="grey" strokeWidth="10" fill="none" />
        <AnimatedSvgCircle
          cx="50"
          cy="50"
          r="45"
          stroke={circularTimerStrokeColor}
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 45}`}
          animatedProps={animatedCircleProps}
        />
      </Svg>
    )
  }

  return (
    <View style={styles.container}>
      {renderTimer()}
      <Text style={styles.timeLeftText}>{timeLeft}s left</Text>
      <View style={styles.buttonContainer}>{renderControlButtons}</View>
    </View>
  )
}

export default Timer
