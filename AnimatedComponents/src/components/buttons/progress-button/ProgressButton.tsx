import React, { useRef } from 'react'
import { Animated, Pressable, Text } from 'react-native'

import style from './progressButton-styles'

interface IProgressButton {
  isLoading: boolean
  onPress: () => void
  label: string
}

const ProgressButton = (props: IProgressButton) => {
  const { isLoading, onPress, label } = props

  const progressAnim = useRef(new Animated.Value(0)).current

  const handlePress = () => {
    onPress()
    progressAnim.setValue(0)
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start()
  }

  return (
    <Pressable style={style.button} onPress={handlePress} disabled={isLoading}>
      {isLoading && (
        <Animated.View
          style={[
            style.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      )}

      <Text style={style.label}>{isLoading ? 'isLoading...' : label}</Text>
    </Pressable>
  )
}

export default ProgressButton
