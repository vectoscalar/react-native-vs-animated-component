import React, { useRef } from 'react'
import { Animated, Pressable, StyleProp, Text, TextStyle, ViewStyle } from 'react-native'

import style from './progressButton-styles'

interface IProgressButton {
  buttonContainerStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  isDisabled?: boolean
  isLoading: boolean
  label: string
  labelStyle?: StyleProp<TextStyle>
  loadingText?: string
  onPress: () => void
}

const ProgressButton = (props: IProgressButton) => {
  const {
    buttonStyle = {},
    buttonContainerStyle = {},
    labelStyle = {},
    isDisabled,
    isLoading,
    label,
    loadingText = 'isLoading...',
    onPress,
  } = props

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
    <Pressable
      style={[style.button, buttonContainerStyle]}
      onPress={handlePress}
      disabled={isLoading || isDisabled}>
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
            buttonStyle,
          ]}
        />
      )}

      <Text style={[style.label, labelStyle]}>{isLoading ? loadingText : label}</Text>
    </Pressable>
  )
}

export default ProgressButton
