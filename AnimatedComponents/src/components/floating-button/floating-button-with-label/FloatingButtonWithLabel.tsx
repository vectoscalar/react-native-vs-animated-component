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

import styles from './floatingButtonWithLabel-styles'

const FloatingButtonWithLabel = (props: FloatingButtonProps) => {
  const {
    animationTransitionDuration = 500,
    buttonContainerStyle = styles.buttonContainer,
    contentContainerStyle = styles.contentContainer,
    icons,
    iconContainerStyle = styles.iconContainer,
    iconStyle = styles.icon,
    textStyle = styles.text,
    isLeft = false,
  } = props

  const isOpen = useSharedValue(false)
  const opacity = useSharedValue(0)
  const progress = useDerivedValue(() => (isOpen.value ? withTiming(1) : withTiming(0)))
  const length = icons?.length
  const sharedValues: SharedValue<number>[] = []
  const sharedWidthValues: SharedValue<number>[] = []

  for (let i = 0; i < length; i += 1) {
    sharedValues.push(useSharedValue(30))
  }

  for (let i = 0; i < length; i += 1) {
    sharedWidthValues.push(useSharedValue(60))
  }

  const handlePress = () => {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: animationTransitionDuration,
    }

    if (isOpen.value) {
      sharedWidthValues.map((item, index) => {
        item.value = withTiming(60, { duration: 100 }, finish => {
          if (finish) {
            sharedValues[index].value = withDelay(50 * index, withTiming(30, config))
          }
        })
      })
      opacity.value = withTiming(0, { duration: 100 })
    } else {
      sharedValues.map((item, index) => {
        item.value =
          index === sharedValues.length - 1
            ? withSpring(130 + index * 70)
            : withDelay(100 + index * 100, withSpring(130 + index * 70))
        sharedWidthValues[index].value = withDelay(1000 + index * 100, withSpring(200))
      })
      opacity.value = withDelay(1200, withSpring(1))
    }
    isOpen.value = !isOpen.value
  }

  const opacityText = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  const animatedStyles = sharedValues.map((item, index) =>
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
        width: sharedWidthValues[index].value,
      }
    }),
  )

  const plusIcon = useAnimatedStyle(() => {
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
            isLeft ? styles.contentContainerLeft : contentContainerStyle,
            animatedStyles[index],
          ]}>
          <Pressable onPress={item.onPress} style={iconContainerStyle}>
            <View>
              <Image source={item.icon} style={iconStyle} />
            </View>
            <Animated.Text style={[textStyle, opacityText]}>{item.iconName}</Animated.Text>
          </Pressable>
        </Animated.View>
      ))}
      <Pressable
        style={[isLeft ? styles.contentContainerLeft : contentContainerStyle]}
        onPress={() => {
          handlePress()
        }}>
        <Animated.View style={[buttonContainerStyle, plusIcon]}>
          <Image source={PlusIcon} style={iconStyle} />
        </Animated.View>
      </Pressable>
    </View>
  )
}

export default FloatingButtonWithLabel
