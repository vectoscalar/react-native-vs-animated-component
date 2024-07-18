import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Sizes, palette } from '@theme'

interface Styles {
  ball: ViewStyle
  buttonDisabled: ViewStyle
  buttonFailed: ViewStyle
  buttonSuccess: ViewStyle
  container: ViewStyle
  label: TextStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.frenchBlue,
    borderRadius: Sizes.Size_15,
    flexDirection: 'row',
    padding: Sizes.Size_10,
    position: 'relative',
    width: Sizes.Size_300,
  },
  buttonDisabled: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.neutral[300],
    borderRadius: Sizes.Size_15,
    flexDirection: 'row',
    padding: Sizes.Size_10,
    position: 'relative',
    width: Sizes.Size_300,
  },
  ball: {
    alignItems: 'center',
    backgroundColor: palette.neutral[0],
    borderRadius: Sizes.Size_50,
    height: Sizes.Size_30,
    justifyContent: 'center',
    width: Sizes.Size_30,
  },
  label: {
    alignItems: 'center',
    color: palette.neutral[0],
    display: 'flex',
    flex: Sizes.Size_1,
    textAlign: 'center',
  },
  buttonFailed: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.burntSienna,
    borderRadius: Sizes.Size_15,
    flexDirection: 'row',
    padding: Sizes.Size_10,
    position: 'relative',
    width: Sizes.Size_300,
  },
  buttonSuccess: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.silverTree,
    borderRadius: Sizes.Size_15,
    flexDirection: 'row',
    padding: Sizes.Size_10,
    position: 'relative',
    width: Sizes.Size_300,
  },
})

export default styles
