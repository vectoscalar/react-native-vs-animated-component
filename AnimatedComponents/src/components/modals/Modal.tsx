import React, { useEffect } from 'react'
import { Modal as RNModal, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { ModalPreset } from '@constants'

import styles from './modal-styles'

interface IModalProps {
  /** isVisible: is a required prop that indicates whether the modal is visible or not */
  isVisible: boolean
  /** onClose: is a required prop that handles the closing of the modal */
  onClose: () => void
  /** type: is a required prop that specifies the type of animation preset for the modal */
  type: ModalPreset
  /** children: is a required prop that indicates the content of the modal */
  children: React.ReactNode
  /** style: is an optional prop that defines any additional styles for customizing the modal */
  style?: StyleProp<ViewStyle>
}

const Modal = (props: IModalProps) => {
  const { isVisible, onClose, type, children, style } = props

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(500)
  const translateX = useSharedValue(-500)
  const scale = useSharedValue(0)
  const rotate = useSharedValue(0)
  const flip = useSharedValue(1)

  const handleAnimation = (isOpening: boolean) => {
    const config = { duration: 500, easing: Easing.inOut(Easing.ease) }
    const onEnd = (finished: boolean | undefined) => {
      'worklet'

      if (!isOpening && finished) {
        runOnJS(onClose)()
      }
    }
    switch (type) {
      case ModalPreset.FadeIn: {
        opacity.value = withTiming(isOpening ? 1 : 0, config, onEnd)
        break
      }
      case ModalPreset.SlideInLeft: {
        translateX.value = withTiming(isOpening ? 0 : -500, config, onEnd)
        break
      }
      case ModalPreset.Scale: {
        scale.value = withTiming(isOpening ? 1 : 0, config, onEnd)
        break
      }
      case ModalPreset.RotateIn: {
        rotate.value = withTiming(isOpening ? 360 : 0, config, onEnd)
        break
      }
      case ModalPreset.FlipIn: {
        flip.value = withTiming(isOpening ? 1 : -1, config, onEnd)
        break
      }
      case ModalPreset.SlideIn: {
        translateY.value = withTiming(isOpening ? 0 : 500, config, onEnd)
        break
      }
      default: {
        console.warn(`Unknown modal type: ${type}`)
        break
      }
    }
  }

  useEffect(() => {
    handleAnimation(isVisible)
  }, [isVisible])

  const animatedStyle = useAnimatedStyle(() => {
    switch (type) {
      case ModalPreset.FadeIn: {
        return { opacity: opacity.value }
      }
      case ModalPreset.SlideInLeft: {
        return { transform: [{ translateX: translateX.value }] }
      }
      case ModalPreset.Scale: {
        return { transform: [{ scale: scale.value }] }
      }
      case ModalPreset.RotateIn: {
        return { transform: [{ rotate: `${rotate.value}deg` }] }
      }
      case ModalPreset.FlipIn: {
        return { transform: [{ scaleY: flip.value }] }
      }
      case ModalPreset.SlideIn: {
        return { transform: [{ translateY: translateY.value }] }
      }
      default: {
        return {}
      }
    }
  })

  return (
    <RNModal transparent visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContainer, animatedStyle, style]}>
          {children}
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </RNModal>
  )
}

export default Modal
