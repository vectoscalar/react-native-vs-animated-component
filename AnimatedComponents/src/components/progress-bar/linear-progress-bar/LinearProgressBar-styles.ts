import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Sizes, palette } from '@theme'

export interface Styles {
  container: ViewStyle
  subContainer: ViewStyle
  labelContainer: ViewStyle
  label: TextStyle
}

export const styles: Styles = StyleSheet.create({
  container: {
    backgroundColor: palette.chineseWhite,
    height: Sizes.Size_20,
    position: 'relative',
    borderRadius: Sizes.Size_100,
    overflow: 'hidden',
  },

  subContainer: {
    backgroundColor: palette.frenchBlue,
    height: '100%',
    borderRadius: Sizes.Size_100,
  },

  labelContainer: {
    alignItems: 'center',
    bottom: Sizes.Size_0,
    justifyContent: 'center',
    left: Sizes.Size_0,
    position: 'absolute',
    right: Sizes.Size_0,
    top: Sizes.Size_0,
  },

  label: {
    color: palette.neutral[0],
    fontSize: Sizes.Size_16,
  },
})
