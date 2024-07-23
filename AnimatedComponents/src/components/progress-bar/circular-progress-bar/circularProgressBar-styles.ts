import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Sizes } from '@theme'

export interface Styles {
  labelContainer: ViewStyle
  label: TextStyle
}

export const styles: Styles = StyleSheet.create({
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
