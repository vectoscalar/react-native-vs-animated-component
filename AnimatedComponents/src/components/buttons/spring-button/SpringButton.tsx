import React, { useEffect, useRef } from 'react'
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native'

import style from './springButton-styles'

interface ISpringButton {
  label: string
  onPress: () => void
  isLoading?: boolean
  isDisabled?: boolean
  loaderColor?: string
  customButtonStyle?: StyleProp<ViewStyle>
}

const SpringButton = (props: ISpringButton) => {
  const {
    label,
    onPress,
    isLoading,
    isDisabled,
    loaderColor = '#fff',
    customButtonStyle = {},
  } = props
  const animatedScale = useRef(new Animated.Value(0)).current

  useEffect(() => {
    animatedScale.setValue(1)
  }, [])

  const handleOnPress = () => {
    onPress()
    animatedScale.setValue(0.8)
    Animated.spring(animatedScale, {
      bounciness: 20,
      speed: 10,
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View style={style.container}>
      <Pressable disabled={isLoading || isDisabled} onPress={handleOnPress}>
        <Animated.View
          style={[
            isDisabled ? style.buttonDisabled : style.button,
            { transform: [{ scale: animatedScale }] },
            customButtonStyle,
          ]}>
          {isLoading ? (
            <ActivityIndicator color={loaderColor} />
          ) : (
            <Text style={style.buttonText}>{label}</Text>
          )}
        </Animated.View>
      </Pressable>
    </View>
  )
}

export default SpringButton
