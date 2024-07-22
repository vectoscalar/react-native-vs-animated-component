import React from 'react'
import { Image, Pressable, View } from 'react-native'
import Animated, {
  Easing,
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import { PlusIcon } from '@assets'
import { FloatingButtonProps } from '@types'

import styles from './floatingButtonWithIcon-styles'

const FloatingButtonWithIcon = (props: FloatingButtonProps) => {
  const {
    animationTransitionDuration = 500,
    contentContainerStyle = styles.contentContainer,
    icons,
    iconContainerStyle = styles.iconContainer,
    iconStyle = styles.icon,
    isLeftAligned = false,
  } = props

  const isOpen = useSharedValue(false)
  const progress = useDerivedValue(() => (isOpen.value ? withTiming(1) : withTiming(0)))
  const iconLength = icons.length
  const sharedValues: SharedValue<number>[] = []

  for (let i = 0; i < iconLength; i += 1) {
    sharedValues.push(useSharedValue(30))
  }

  const handlePress = () => {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: animationTransitionDuration,
    }
    if (isOpen.value) {
      sharedValues.map((item, index) => {
        item.value = withDelay((index + 1) * 30, withTiming(30, config))
      })
    } else {
      sharedValues.map((item, index) => {
        item.value =
          index === sharedValues.length - 1
            ? withSpring(130 + index * 70)
            : withDelay(100 + index * 100, withSpring(130 + index * 70))
      })
    }
    isOpen.value = !isOpen.value
  }

  const animatedStylesAnimation = sharedValues.map((item, index) =>
    useAnimatedStyle(() => {
      const scale = interpolate(
        item.value,
        [30, 30 + (index + 1) * 80],
        [0, 1],
        Extrapolation.CLAMP,
      )

      return {
        bottom: item.value,
        transform: [{ scale }],
      }
    }),
  )

  const plusIconAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 45}deg` }],
    }
  })

  return (
    <View style={styles.container}>
      {icons.map((item, index) => (
        <Animated.View
          key={item.iconName}
          style={[
            isLeftAligned ? styles.contentContainerLeft : contentContainerStyle,
            animatedStylesAnimation[index],
          ]}>
          <Pressable onPress={item.onPress} style={iconContainerStyle}>
            <Image source={item.icon} style={iconStyle} />
          </Pressable>
        </Animated.View>
      ))}
      <Pressable
        style={isLeftAligned ? styles.contentContainerLeft : contentContainerStyle}
        onPress={() => {
          handlePress()
        }}>
        <Animated.View style={[iconContainerStyle, plusIconAnimation]}>
          <Image source={PlusIcon} style={iconStyle} />
        </Animated.View>
      </Pressable>
    </View>
  )
}

export default FloatingButtonWithIcon
