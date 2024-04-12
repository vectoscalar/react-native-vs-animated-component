import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Sizes, palette } from '@theme'

import { BUTTON_HEIGHT, BUTTON_PADDING, BUTTON_WIDTH, SWIPEABLE_DIMENSIONS } from './constants'

interface Styles {
  swipeContainer: ViewStyle
  disabledContainer: ViewStyle
  swipeThumb: ViewStyle
  text: TextStyle
  wave: ViewStyle
  resultWave: ViewStyle
}
const styles = StyleSheet.create<Styles>({
  swipeContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.blueBayoux,
    borderRadius: Sizes.Size_20,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    overflow: 'hidden',
    padding: BUTTON_PADDING,
    width: BUTTON_WIDTH,
  },
  disabledContainer: {
    backgroundColor: palette.black10,
  },
  swipeThumb: {
    alignItems: 'center',
    borderRadius: BUTTON_HEIGHT,
    backgroundColor: palette.neutral[0],
    height: SWIPEABLE_DIMENSIONS,
    justifyContent: 'center',
    left: BUTTON_PADDING,
    position: 'absolute',
    width: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
  },
  text: {
    color: palette.neutral[0],
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_18,
    marginLeft: Sizes.Size_8,
    zIndex: 2,
  },
  wave: {
    borderRadius: BUTTON_HEIGHT,
    height: BUTTON_HEIGHT,
    left: 0,
    position: 'absolute',
  },
  resultWave: {
    borderRadius: BUTTON_HEIGHT,
    height: BUTTON_HEIGHT,
    left: 0,
    position: 'absolute',
    width: BUTTON_WIDTH,
  },
})

export default styles
