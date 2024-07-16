import { StyleSheet } from 'react-native'

import { Sizes, palette } from '@theme'

export const styles = StyleSheet.create({
  sliderContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: Sizes.Size_10,
  },
  sliderBack: {
    backgroundColor: palette.frenchBlue,
    borderRadius: Sizes.Size_20,
    height: Sizes.Size_8,
  },
  sliderFront: {
    backgroundColor: palette.chineseWhite,
    borderRadius: Sizes.Size_20,
    height: Sizes.Size_8,
    position: 'absolute',
  },
  thumb: {
    backgroundColor: palette.neutral[0],
    borderColor: palette.frenchBlue,
    borderRadius: Sizes.Size_10,
    borderWidth: Sizes.Size_5,
    height: Sizes.Size_20,
    left: -Sizes.Size_10,
    position: 'absolute',
    width: Sizes.Size_20,
  },
  label: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.black,
    borderRadius: Sizes.Size_5,
    bottom: Sizes.Size_20,
    justifyContent: 'center',
    position: 'absolute',
    top: -Sizes.Size_40,
  },
  labelText: {
    color: 'white',
    fontSize: Sizes.Size_16,
    fontWeight: 'bold',
    padding: Sizes.Size_5,
    width: '100%',
    textAlign: 'center',
  },
})
