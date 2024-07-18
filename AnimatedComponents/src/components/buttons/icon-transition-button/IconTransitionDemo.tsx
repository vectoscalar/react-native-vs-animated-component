import React from 'react'

import { CrossIcon, RightArrowIcon, TickIcon } from '@assets'

import IconTransitionButton from './IconTransitionButton'

const IconTransitionDemo = () => {
  const handlePayment = () => {
    try {
      return true
    } catch {
      return false
    }
  }

  return (
    <IconTransitionButton
      failedIcon={<CrossIcon />}
      failedLabel="Payment Failed"
      onPress={handlePayment}
      startIcon={<RightArrowIcon />}
      startLabel="Pay Now"
      successIcon={<TickIcon />}
      successLabel="Payment Successful"
    />
  )
}

export default IconTransitionDemo
