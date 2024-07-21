import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Sizes, palette } from '@theme'

export interface Styles {
  labelContainer: ViewStyle
  labelText: TextStyle
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
    backgroundColor: palette.chineseWhite,
    borderRadius: Sizes.Size_20,
    height: '100%',
  },

  sliderFront: {
    backgroundColor: palette.frenchBlue,
    borderRadius: Sizes.Size_20,
    height: '100%',
    position: 'absolute',
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
    borderRadius: Sizes.Size_50,
  },

  labelContainer: {
    backgroundColor: palette.black,
    borderRadius: Sizes.Size_5,
    marginBottom: Sizes.Size_10,
    padding: Sizes.Size_4,
  },

  labelText: {
    color: palette.neutral[0],
    fontSize: Sizes.Size_16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
})
