import React, { useEffect } from 'react'
import {
  Dimensions,
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { ModalPreset } from '@constants'

import styles from './modal-styles'

interface IModalProps extends Omit<RNModalProps, 'animationType'> {
  /** customAnimationType: is a required prop that specifies the type of animation preset for the modal */
  animationType: ModalPreset
  /** children: is a required prop that indicates the content of the modal */
  children: React.ReactNode
  /** isOpen: is a required prop that indicates whether the modal is visible or not */
  isOpen: boolean
  /** onClose: is a required prop that handles the closing of the modal */
  onClose: () => void
  /** style: is an optional prop that defines any additional styles for customizing the modal */
  style?: StyleProp<ViewStyle>
}

const Modal = (props: IModalProps) => {
  const { animationType, children, isOpen, onClose, style = {}, ...rest } = props
  const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(screenHeight)
  const translateX = useSharedValue(-screenWidth)
  const scale = useSharedValue(0)

  const handleAnimation = (isOpening: boolean) => {
    const config = { duration: 500, easing: Easing.inOut(Easing.ease) }
    const onEnd = (finished: boolean | undefined) => {
      'worklet'

      if (!isOpening && finished) {
        runOnJS(onClose)()
      }
    }

    switch (animationType) {
      case ModalPreset.FadeIn: {
        opacity.value = withTiming(isOpening ? 1 : 0, config, onEnd)
        break
      }
      case ModalPreset.SlideInLeft: {
        translateX.value = withTiming(isOpening ? 0 : -screenWidth, config, onEnd)
        break
      }
      case ModalPreset.Scale: {
        scale.value = withTiming(isOpening ? 1 : 0, config, onEnd)
        break
      }
      case ModalPreset.SlideIn: {
        translateY.value = withTiming(isOpening ? 0 : screenHeight, config, onEnd)
        break
      }
      default: {
        console.warn(`Unknown modal type: ${animationType}`)
        break
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      handleAnimation(true)
    } else {
      handleAnimation(false)
    }
  }, [isOpen])

  const animatedStyle = useAnimatedStyle(() => {
    switch (animationType) {
      case ModalPreset.FadeIn: {
        return { opacity: opacity.value }
      }
      case ModalPreset.SlideInLeft: {
        return { transform: [{ translateX: translateX.value }] }
      }
      case ModalPreset.Scale: {
        return { transform: [{ scale: scale.value }] }
      }
      case ModalPreset.SlideIn: {
        return { transform: [{ translateY: translateY.value }] }
      }
      default: {
        return {}
      }
    }
  })

  const handleOnPress = () => {
    handleAnimation(false)
  }

  return (
    <GestureHandlerRootView>
      <RNModal visible={isOpen} onRequestClose={handleOnPress} transparent {...rest}>
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContainer, animatedStyle, style]}>
            {children}
            <TouchableOpacity onPress={handleOnPress} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </RNModal>
    </GestureHandlerRootView>
  )
}

export default Modal
