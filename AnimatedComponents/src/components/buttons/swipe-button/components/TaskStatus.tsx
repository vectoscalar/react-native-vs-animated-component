import React from 'react'
import { ActivityIndicator, Text } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import RemixIcon from 'react-native-remix-icon'

import { RemixIcons } from '@constants'

// import { colors } from '@theme'
import { ENTERING_ANIMATION_DURATION, EXITING_ANIMATION_DURATION } from '../constants'
import { ITaskStatusData } from '../types'

import styles from './taskStatus-styles'

interface ITaskStatus {
  handleAnimationCallback: (finished: boolean) => void
  taskStatus: number
  taskStatusData: ITaskStatusData
}
export const TaskStatus: React.FC<ITaskStatus> = (props: ITaskStatus) => {
  const { handleAnimationCallback, taskStatus, taskStatusData } = props
  const { fail, success } = taskStatusData || {}
  const {
    icon = RemixIcons.CHECKBOX_CIRCLE_FILLED,
    iconColor = 'white',
    text = 'Provide Text',
  } = taskStatus === 1 ? success || {} : fail || {}

  return taskStatus < 0 ? (
    <ActivityIndicator color={iconColor} size={24} />
  ) : (
    <Animated.View
      style={styles.textContainer}
      entering={FadeIn.delay(100)
        .duration(ENTERING_ANIMATION_DURATION)
        .withCallback(handleAnimationCallback)}
      exiting={FadeOut.duration(EXITING_ANIMATION_DURATION / 1.75)}>
      <RemixIcon color={iconColor} name={icon} size={22} />
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  )
}
