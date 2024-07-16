import { StyleSheet } from 'react-native'

import { Sizes } from '@theme'

export const styles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: Sizes.Size_0,
    position: 'absolute',
    top: Sizes.Size_0,
  },
  label: {
    color: 'black',
    fontSize: Sizes.Size_16,
  },
})
