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
    isLeftAligned = false,
  } = props

  const isOpen = useSharedValue(false)
  const progress = useDerivedValue(() =>
    isOpen.value
      ? withTiming(1, { duration: animationTransitionDuration })
      : withTiming(0, { duration: animationTransitionDuration }),
  )
  const { width } = Dimensions.get('window')
  const iconSize = 54
  const circleScale = Number((width / iconSize).toFixed(1))
  const circleSize = circleScale * iconSize
  // The angularDistance determines how far each icon is placed from the center of the circular layout.
  const angularDistance = circleSize / 2 - iconSize * 1.5
  const radius = angularDistance * 1.5

  const handlePress = () => {
    isOpen.value = !isOpen.value
  }

  const getIconStyleAnimation = (index: number) => {
    return useAnimatedStyle(() => {
      const angleStep = Math.PI / 6
      const angle = angleStep * index
      const x = isLeftAligned ? radius * Math.cos(angle) : -radius * Math.cos(angle)
      const y = -radius * Math.sin(angle)
      const scale = interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP)

      return {
        transform: [
          { translateX: isLeftAligned ? x * progress.value - 20 : x * progress.value + 20 },
          { translateY: y * progress.value + 20 },
          { scale },
        ],
      }
    })
  }

  const plusIconAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 45}deg` }],
    }
  })

  const scalingAnimation = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, circleScale])

    return isLeftAligned
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
      <Animated.View style={[circleStyle, scalingAnimation]} />
      {icons.map((item, index) => (
        <Animated.View
          key={item.iconName}
          style={[
            isLeftAligned ? styles.contentContainerLeft : contentContainerStyle,
            getIconStyleAnimation(index),
          ]}>
          <Pressable onPress={item.onPress} style={iconContainerStyle}>
            <Image source={item.icon} style={iconStyle} />
          </Pressable>
        </Animated.View>
      ))}
      <Pressable
        style={isLeftAligned ? styles.contentContainerLeft : contentContainerStyle}
        onPress={handlePress}>
        <Animated.View style={[iconContainerStyle, plusIconAnimation]}>
          <Image source={PlusIcon} style={iconStyle} />
        </Animated.View>
      </Pressable>
    </View>
  )
}

export default CircularFloatingButton
