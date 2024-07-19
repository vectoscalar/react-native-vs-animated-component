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
  return (
    <SafeAreaView style={styles.container}>
      {buttonType === FloatingButtonPreset.FloatingButtonWithIcon && (
        <FloatingButtonWithIcon {...props} />
      )}
      {buttonType === FloatingButtonPreset.FloatingButtonWithLabel && (
        <FloatingButtonWithLabel {...props} />
      )}
      {buttonType === FloatingButtonPreset.CircularFloatingButton && (
        <CircularFloatingButton {...props} />
      )}
    </SafeAreaView>
  )
}

export default FloatingButton
