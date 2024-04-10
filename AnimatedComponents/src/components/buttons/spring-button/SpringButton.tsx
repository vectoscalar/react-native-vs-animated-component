import React, { useEffect, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'

import style from './springButton-styles'

const SpringButton = () => {
  const animatedScale = useRef(new Animated.Value(0)).current

  useEffect(() => {
    animatedScale.setValue(1)
  }, [])

  const handleOnPress = () => {
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
          <Text style={style.buttonText}>Press Me</Text>
        </Animated.View>
      </Pressable>
    </View>
  )
}

export default SpringButton
