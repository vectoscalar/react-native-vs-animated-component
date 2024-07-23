import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Sizes, palette } from '@theme'

export interface Styles {
  tooltip: TextStyle
  sliderBack: ViewStyle
  sliderContainer: ViewStyle
  sliderFront: ViewStyle
  thumb: ViewStyle
  thumbContainer: ViewStyle
}

export const styles: Styles = StyleSheet.create({
  sliderContainer: {
    height: Sizes.Size_8,
    justifyContent: 'center',
  },

  sliderBack: {
    backgroundColor: palette.frenchBlue,
    borderRadius: Sizes.Size_20,
    height: '100%',
  },

  sliderFront: {
    backgroundColor: palette.chineseWhite,
    borderRadius: Sizes.Size_20,
    position: 'absolute',
    height: '100%',
  },

  thumbContainer: {
    alignItems: 'center',
    bottom: -Sizes.Size_10,
    left: -Sizes.Size_10,
    position: 'absolute',
  },

  thumb: {
    backgroundColor: palette.frenchBlue,
    width: Sizes.Size_28,
    height: Sizes.Size_28,
    borderRadius: Sizes.Size_100,
  },

  tooltip: {
    backgroundColor: palette.black,
    borderRadius: Sizes.Size_5,
    color: palette.neutral[0],
    fontSize: Sizes.Size_16,
    fontWeight: 'bold',
    marginBottom: Sizes.Size_10,
    padding: Sizes.Size_4,
    textAlign: 'center',
    width: '100%',
  },
})
