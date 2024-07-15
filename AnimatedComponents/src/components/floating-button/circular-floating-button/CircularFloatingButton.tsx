import React from 'react'
import { Dimensions, Image, Pressable, View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { PlusIcon } from '@assets'
import { FloatingButtonProps } from '@types'

import styles from './circularFloatingButton-styles'

const CircularFloatingButton = (props: FloatingButtonProps) => {
  const {
    animationTransitionDuration = 500,
    circleStyle = styles.expandingCircle,
    contentContainerStyle = styles.contentContainer,
    iconContainerStyle = styles.iconContainer,
    iconStyle = styles.icon,
    icons,
    isLeft = false,
  } = props

  const isOpen = useSharedValue(false)
  const progress = useDerivedValue(() =>
    isOpen.value
      ? withTiming(1, { duration: animationTransitionDuration })
      : withTiming(0, { duration: animationTransitionDuration }),
  )
  const { width } = Dimensions.get('window')
  const FAB_SIZE = 54
  const circleScale = Number((width / FAB_SIZE).toFixed(1))
  const circleSize = circleScale * FAB_SIZE
  const dist = circleSize / 2 - FAB_SIZE * 1.5
  const radius = dist * 1.5

  const handlePress = () => {
    isOpen.value = !isOpen.value
  }

  const getIconStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const angleStep = Math.PI / 6
      const angle = angleStep * index
      const x = isLeft ? radius * Math.cos(angle) : -radius * Math.cos(angle)
      const y = -radius * Math.sin(angle)
      const scale = interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP)
      return {
        transform: [
          { translateX: isLeft ? x * progress.value - 20 : x * progress.value + 20 },
          { translateY: y * progress.value + 20 },
          { scale },
        ],
      }
    })
  }

  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 45}deg` }],
    }
  })

  const scalingStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, circleScale])
    return isLeft
      ? {
          transform: [{ scale }],
          left: 30,
          bottom: 30,
        }
      : {
          transform: [{ scale }],
          right: 30,
          bottom: 30,
        }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[circleStyle, scalingStyles]} />
      {icons.map((item, index) => (
        <Animated.View
          key={item.iconName}
          style={[
            isLeft ? styles.contentContainerLeft : contentContainerStyle,
            getIconStyle(index),
          ]}>
          <Pressable onPress={item.onPress} style={iconContainerStyle}>
            <Image source={item.icon} style={iconStyle} />
          </Pressable>
        </Animated.View>
      ))}
      <Pressable
        style={isLeft ? styles.contentContainerLeft : contentContainerStyle}
        onPress={handlePress}>
        <Animated.View style={[iconContainerStyle, plusIcon]}>
          <Image source={PlusIcon} style={iconStyle} />
        </Animated.View>
      </Pressable>
    </View>
  )
}

export default CircularFloatingButton
