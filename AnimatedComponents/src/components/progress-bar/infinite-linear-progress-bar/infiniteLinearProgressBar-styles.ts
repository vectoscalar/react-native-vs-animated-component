import { StyleSheet, ViewStyle } from 'react-native'

import { Sizes, palette } from '@theme'

export interface Styles {
  container: ViewStyle
  subContainer: ViewStyle
}

export const styles: Styles = StyleSheet.create({
  container: {
    backgroundColor: palette.chineseWhite,
    borderRadius: Sizes.Size_100,
    height: Sizes.Size_20,
    overflow: 'hidden',
  },

  subContainer: {
    backgroundColor: palette.frenchBlue,
    borderRadius: Sizes.Size_100,
    height: '100%',
    width: Sizes.Size_100,
  },
})
