import React, { useRef, useState } from 'react'
import { LayoutChangeEvent, Pressable, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import styles from './iconTransitionButton-styles'

interface IIconsTransitionButton {
  /** buttonStyle : is an optional prop which defines the styles of button. */
  buttonStyle?: ViewStyle
  /** failedIcon : is a required prop which dictates the icon displayed if the onPress function returns a falsy value. */
  failedIcon: React.ReactNode
  /** failedLabel : is a required prop which dictates the label to be displayed when transition fails */
  failedLabel: string
  /** isDisabled : is an optional prop which dictates that disables the button if true. */
  isDisabled?: boolean
  /** isLoading : is an optional prop which dictates that disables the button if true, likely to indicate a loading state. */
  isLoading?: boolean
  /** onPress : is a required prop which dictates the function is called when the button is pressed. */
  onPress: () => void | boolean | Promise<void>
  /** startLabel : is a required prop which dictates the label to be displayed initially. */
  startLabel: string
  /** startIcon : is a required prop which dictates the initial icon displayed on the button. */
  startIcon: React.ReactNode
  /** successIcon : is a required prop which dictates the icon displayed if the onPress function returns a truth value. */
  successIcon: React.ReactNode
  /** successLabel : is a required prop which dictates the label to be displayed when transition succeeds */
  successLabel: string
}

const IconTransitionButton = (props: IIconsTransitionButton) => {
  const {
    buttonStyle,
    failedIcon,
    failedLabel,
    isDisabled,
    isLoading,
    onPress,
    startIcon,
    startLabel,
    successIcon,
    successLabel,
  } = props
  const translateX = useSharedValue(0)
  const rotationValue = useSharedValue(0)
  const labelOpacity = useSharedValue(1)
  const [iconName, setIconName] = useState(startLabel)
  const [label, setLabel] = useState<string>(startLabel)
  const [transition, setTransition] = useState(false)
  const translationDuration = 1500

  const getbuttonStyles = () => {
    let buttonContainerStyle

    if (isDisabled) {
      buttonContainerStyle = styles.buttonDisabled
    } else {
      switch (label) {
        case failedLabel: {
          buttonContainerStyle = styles.buttonFailed
          break
        }
        case successLabel: {
          buttonContainerStyle = styles.buttonSuccess
          break
        }
        default: {
          buttonContainerStyle = styles.container
          break
        }
      }
    }
    return buttonContainerStyle
  }

  const buttonWidth = useRef<any>(0)

  const onLayout = (event: LayoutChangeEvent) => {
    buttonWidth.current = event.nativeEvent.layout.width
  }

  const getIcon = (currentIconName: string) => {
    let icon
    switch (currentIconName) {
      case successLabel: {
        icon = successIcon
        break
      }
      case failedLabel: {
        icon = failedIcon
        break
      }
      default: {
        icon = startIcon
        break
      }
    }
    return icon
  }

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateX.value, {
          duration: translationDuration,
        }),
      },
      { rotate: `${rotationValue.value}deg` },
    ],
  }))

  const labelAnimatedStyles = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
  }))

  const handlePress = async () => {
    const maxTranslationX = buttonWidth.current - 50
    translateX.value = Math.min(maxTranslationX)
    const rotateDuration = 1500
    const halfwayDuration = 750
    const iconAnimationDuration = 500

    rotationValue.value = withTiming(360, { duration: rotateDuration })
    labelOpacity.value = withTiming(0, { duration: halfwayDuration })

    const onPressResult = await onPress()
    if (!onPressResult) {
      setTimeout(() => {
        setIconName(failedLabel)
        setLabel(failedLabel)
        labelOpacity.value = withTiming(1, { duration: iconAnimationDuration })
      }, halfwayDuration + 200)
      return
    }
    setTimeout(() => {
      setIconName(successLabel)
      setLabel(successLabel)
      labelOpacity.value = withTiming(1, { duration: iconAnimationDuration })
    }, halfwayDuration + 200)

    setTimeout(() => {
      setTransition(true)
    }, halfwayDuration + 200)
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={isLoading || isDisabled}
      style={[getbuttonStyles(), buttonStyle]}
      ref={buttonWidth}
      onLayout={onLayout}>
      <Animated.View style={[styles.ball, animatedStyles]}>{getIcon(iconName)}</Animated.View>
      <Animated.Text style={[styles.label, !transition && labelAnimatedStyles]}>
        {label}
      </Animated.Text>
    </Pressable>
  )
}

export default IconTransitionButton
