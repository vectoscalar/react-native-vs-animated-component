import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { palette } from '@theme'

interface Styles {
  textContainer: ViewStyle
  text: TextStyle
}

const styles = StyleSheet.create<Styles>({
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: palette.neutral[0],
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 8,
    zIndex: 2,
  },
})

export default styles
