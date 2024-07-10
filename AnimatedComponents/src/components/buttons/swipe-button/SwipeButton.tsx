import React, { useCallback, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  Extrapolation,
  SlideInLeft,
  SlideOutLeft,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import RemixIcon from 'react-native-remix-icon'

import { isEqual } from 'lodash'

import { RemixIcons } from '@constants'
import { palette } from '@theme'

import { TaskStatus } from './components/TaskStatus'
import {
  BUTTON_PADDING,
  BUTTON_WIDTH,
  ENTERING_ANIMATION_DURATION,
  EXITING_ANIMATION_DURATION,
  H_SWIPE_RANGE,
  H_WAVE_RANGE,
  SWIPEABLE_DIMENSIONS,
} from './constants'
import styles from './swipeButton-styles'
import { ITaskStatusData } from './types'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

type CTX = {
  completed: boolean
  isDisabled: boolean
}

interface ISBSwipeButton {
  buttonInitialText: string
  gradientWaveColor: Array<string>
  isDisabled?: boolean
  onSwipeComplete: () => Promise<boolean>
  onTaskComplete: (isSuccess: boolean) => void
  taskStatusData: ITaskStatusData
  thumbColors: Array<string>
  style?: ViewStyle
}

const SwipeButton: React.FC<ISBSwipeButton> = (props: ISBSwipeButton) => {
  const {
    buttonInitialText,
    gradientWaveColor,
    isDisabled = false,
    onSwipeComplete,
    onTaskComplete,
    taskStatusData,
    thumbColors,
    style,
  } = props
  const { fail, success } = taskStatusData
  const { waveColor: gradientWaveSuccessColor } = success
  const { waveColor: gradientWaveFailColor } = fail
  const [toggled, setToggled] = useState(false)
  const [asyncTaskStatus, setAsyncTaskStatus] = useState(-2)

  const x = useSharedValue(0)

  const handleComplete = async (isToggled: boolean) => {
    if (isToggled !== toggled) {
      setToggled(isToggled)
      setAsyncTaskStatus(-1)
      if (onSwipeComplete) {
        try {
          const status = await onSwipeComplete()
          setAsyncTaskStatus(+status)
        } catch (error) {
          console.error('error::', error)
        }
      }
    }
  }

  const resetButton = (shouldReset: boolean) => {
    if (!shouldReset) return
    setTimeout(() => {
      x.value = withTiming(0, { duration: EXITING_ANIMATION_DURATION })
      setAsyncTaskStatus(-2)
      setToggled(false)
    }, 300)
  }

  const handleAnimationEnd = useCallback(
    (finished: boolean) => {
      'worklet'

      if (finished) {
        runOnJS(onTaskComplete)(!!asyncTaskStatus)
        runOnJS(resetButton)(true)
      }
    },
    [onTaskComplete, asyncTaskStatus],
  )

  const animatedStyle = {
    swipeThumb: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: x.value }],
        backgroundColor: interpolateColor(
          x.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          thumbColors,
        ),
      }
    }),
    text: useAnimatedStyle(() => {
      return {
        opacity: interpolate(x.value, [0, H_SWIPE_RANGE * 0.75], [1, 0], Extrapolation.CLAMP),
      }
    }),
    wave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + x.value,
        opacity: interpolate(x.value, [0, H_SWIPE_RANGE], [0, 1]),
      }
    }),
    swipeThumbHide: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          x.value,
          [H_SWIPE_RANGE * 0.99, H_SWIPE_RANGE],
          [1, 0],
          Extrapolation.CLAMP,
        ),
      }
    }),
  }

  const animatedGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, CTX>({
    onStart: (_, ctx) => {
      ctx.completed = toggled
      ctx.isDisabled = isDisabled
    },
    onActive: (e, ctx) => {
      const newValue: number = ctx.completed ? H_SWIPE_RANGE + e.translationX : e.translationX
      if (newValue >= 0 && newValue <= H_SWIPE_RANGE && !isDisabled) {
        x.value = newValue
      }
    },
    onCancel: () => {
      x.value = withTiming(0)
    },
    onEnd: () => {
      if (x.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        x.value = withTiming(0, { duration: 300 })
        runOnJS(handleComplete)(false)
      } else {
        x.value = withTiming(H_SWIPE_RANGE, { duration: 300 })
        runOnJS(handleComplete)(true)
      }
    },
  })

  return (
    <GestureHandlerRootView>
      <View style={[styles.swipeContainer, isDisabled && styles.disabledContainer, style]}>
        <AnimatedLinearGradient
          style={[styles.wave, animatedStyle.wave]}
          colors={gradientWaveColor}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
        {asyncTaskStatus >= 0 && (
          <AnimatedLinearGradient
            entering={SlideInLeft.duration(ENTERING_ANIMATION_DURATION)}
            exiting={SlideOutLeft.duration(EXITING_ANIMATION_DURATION)}
            style={styles.resultWave}
            colors={asyncTaskStatus ? gradientWaveSuccessColor : gradientWaveFailColor}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
        )}
        <PanGestureHandler onGestureEvent={animatedGestureHandler}>
          <Animated.View
            style={[styles.swipeThumb, animatedStyle.swipeThumb, animatedStyle.swipeThumbHide]}>
            <RemixIcon name={RemixIcons.ARROW_RIGHT} size={24} color={palette.mintCream} />
          </Animated.View>
        </PanGestureHandler>
        {asyncTaskStatus === -2 ? (
          <Animated.Text style={[styles.text, animatedStyle.text]}>
            {buttonInitialText}
          </Animated.Text>
        ) : (
          <TaskStatus
            handleAnimationCallback={handleAnimationEnd}
            taskStatus={asyncTaskStatus}
            taskStatusData={taskStatusData}
          />
        )}
      </View>
    </GestureHandlerRootView>
  )
}

const arePropsEqual = (prevProps: ISBSwipeButton, nextProps: ISBSwipeButton) => {
  return (
    prevProps.buttonInitialText === nextProps.buttonInitialText &&
    prevProps.isDisabled === nextProps.isDisabled &&
    isEqual(prevProps.gradientWaveColor, nextProps.gradientWaveColor) &&
    isEqual(prevProps.onSwipeComplete, nextProps.onSwipeComplete) &&
    isEqual(prevProps.onTaskComplete, nextProps.onTaskComplete) &&
    isEqual(prevProps.taskStatusData, nextProps.taskStatusData) &&
    isEqual(prevProps.thumbColors, nextProps.thumbColors)
  )
}

export default React.memo(SwipeButton, arePropsEqual)
