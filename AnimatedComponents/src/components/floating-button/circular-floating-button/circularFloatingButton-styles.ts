import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { Sizes } from '@theme'

interface IStyleProps {
  container: ViewStyle
  contentContainer: ViewStyle
  contentContainerLeft: ViewStyle
  icon: ImageStyle
  iconContainer: ViewStyle
  expandingCircle: ViewStyle
}

const styles: IStyleProps = StyleSheet.create({
  container: {
    flex: Sizes.Size_1,
  },
  contentContainer: {
    backgroundColor: '#1E2952',
    borderRadius: Sizes.Size_50,
    bottom: Sizes.Size_30,
    position: 'absolute',
    right: Sizes.Size_30,
  },
  contentContainerLeft: {
    backgroundColor: '#1E2952',
    borderRadius: Sizes.Size_50,
    bottom: Sizes.Size_30,
    position: 'absolute',
    left: Sizes.Size_30,
  },
  iconContainer: {
    alignItems: 'center',
    height: Sizes.Size_60,
    justifyContent: 'center',
    width: Sizes.Size_60,
  },
  icon: {
    height: Sizes.Size_26,
    width: Sizes.Size_26,
  },
  expandingCircle: {
    alignItems: 'center',
    backgroundColor: '#008080',
    borderRadius: Sizes.Size_27,
    height: Sizes.Size_54,
    justifyContent: 'center',
    position: 'absolute',
    width: Sizes.Size_54,
    zIndex: -Sizes.Size_1,
  },
})

export default styles
