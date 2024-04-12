import React, { useEffect, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'

import style from './springButton-styles'

interface ISpringButton {
  label: string
  onPress: () => void
}

const SpringButton = (props: ISpringButton) => {
  const { label, onPress } = props
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
      <Pressable onPress={handleOnPress}>
        <Animated.View style={[style.button, { transform: [{ scale: animatedScale }] }]}>
          <Text style={style.buttonText}>{label}</Text>
        </Animated.View>
      </Pressable>
    </View>
  )
}

export default SpringButton
