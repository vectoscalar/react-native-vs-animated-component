import React from 'react'
import { SafeAreaView } from 'react-native'

import { FloatingButtonPreset } from '@constants'
import { FloatingButtonProps } from '@types'

import CircularFloatingButton from './circular-floating-button/CircularFloatingButton'
import FloatingButtonWithIcon from './floating-button-with-icon/FloatingButtonWithIcon'
import FloatingButtonWithLabel from './floating-button-with-label/FloatingButtonWithLabel'
import styles from './floatingButton-styles'

const FloatingButton = (props: FloatingButtonProps) => {
  const { buttonType } = props
  const renderButton = () => {
    let buttonComponent
    switch (buttonType) {
      case FloatingButtonPreset.FloatingButtonWithIcon: {
        buttonComponent = <FloatingButtonWithIcon {...props} />
        break
      }
      case FloatingButtonPreset.FloatingButtonWithLabel: {
        buttonComponent = <FloatingButtonWithLabel {...props} />
        break
      }
      case FloatingButtonPreset.CircularFloatingButton: {
        buttonComponent = <CircularFloatingButton {...props} />
        break
      }
      default: {
        buttonComponent = undefined
        break
      }
    }

    return buttonComponent
  }

  return <SafeAreaView style={styles.container}>{renderButton()}</SafeAreaView>
}

export default FloatingButton
