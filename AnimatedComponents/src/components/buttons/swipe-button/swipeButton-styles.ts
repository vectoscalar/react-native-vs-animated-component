import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Sizes, palette } from '@theme'

import { BUTTON_HEIGHT, BUTTON_PADDING, BUTTON_WIDTH } from './constants'

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
    backgroundColor: '#1779FD',
    borderRadius: Sizes.Size_12,
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
    justifyContent: 'center',
    position: 'absolute',
    height: BUTTON_HEIGHT,
    width: 40,
    left: 0,
    borderRadius: Sizes.Size_12,
    padding: 30,
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
    borderRadius: Sizes.Size_12,
    height: BUTTON_HEIGHT,
    left: 0,
    position: 'absolute',
  },
  resultWave: {
    borderRadius: Sizes.Size_12,
    height: BUTTON_HEIGHT,
    left: 0,
    position: 'absolute',
    width: BUTTON_WIDTH,
  },
})

export default styles
