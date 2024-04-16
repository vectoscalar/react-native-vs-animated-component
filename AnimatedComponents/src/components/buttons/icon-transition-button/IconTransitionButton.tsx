import React, { Ref, RefObject, useRef, useState } from 'react'
import { LayoutChangeEvent, Pressable, View, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { SvgProps } from 'react-native-svg'

import styles from './iconTransition-button-styles'

interface IIconsTransitionButton {
  onPress: () => boolean | Promise<boolean>
  buttonStyle?: ViewStyle
  startIcon: React.ReactNode
  failedIcon: React.ReactNode
  successIcon: React.ReactNode
}

const IconTransitionButton = (props: IIconsTransitionButton) => {
  const { onPress, buttonStyle, startIcon, failedIcon, successIcon } = props
  const translateX = useSharedValue(0)
  const rotationValue = useSharedValue(0)
  const [Icon, setIconName] = useState<React.ReactNode>(startIcon)

  const buttonWidth = useRef<any>(0)

  const onLayout = (event: LayoutChangeEvent) => {
    buttonWidth.current = event.nativeEvent.layout.width
  }

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateX.value, {
          duration: 1500,
        }),
      },
      { rotate: `${rotationValue.value}deg` },
    ],
  }))

  const handlePress = async () => {
    const maxTranslationX = buttonWidth.current - 50
    translateX.value = Math.min(maxTranslationX)
    rotationValue.value = withTiming(360, { duration: 1500 })
    const halfway = 700

    const onPressResult = await onPress()
    if (!onPressResult) {
      setTimeout(() => {
        setIconName(failedIcon)
      }, halfway)
      return
    }
    setTimeout(() => {
      setIconName(successIcon)
    }, halfway)
  }

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, buttonStyle]}
      ref={buttonWidth}
      onLayout={onLayout}>
      <Animated.View style={[styles.ball, animatedStyles]}>{Icon}</Animated.View>
    </Pressable>
  )
}

export default IconTransitionButton
