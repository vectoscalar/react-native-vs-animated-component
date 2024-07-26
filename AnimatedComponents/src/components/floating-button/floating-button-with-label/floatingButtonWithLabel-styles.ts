import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Sizes, palette } from '@theme'

interface IStyleProps {
  buttonContainer: ViewStyle
  container: ViewStyle
  contentContainer: ViewStyle
  contentContainerLeft: ViewStyle
  icon: ImageStyle
  iconContainer: ViewStyle
  text: TextStyle
}

const styles: IStyleProps = StyleSheet.create({
  container: {
    flex: Sizes.Size_1,
  },

  contentContainer: {
    alignItems: 'center',
    backgroundColor: palette.festival,
    borderRadius: Sizes.Size_50,
    bottom: Sizes.Size_30,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'absolute',
    right: Sizes.Size_30,
  },

  contentContainerLeft: {
    alignItems: 'center',
    backgroundColor: palette.festival,
    borderRadius: Sizes.Size_50,
    bottom: Sizes.Size_30,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'absolute',
    left: Sizes.Size_30,
  },

  iconContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: Sizes.Size_10,
    height: Sizes.Size_60,
    justifyContent: 'flex-start',
    padding: Sizes.Size_20,
    width: '100%',
  },

  buttonContainer: {
    alignItems: 'center',
    height: Sizes.Size_60,
    justifyContent: 'center',
    width: Sizes.Size_60,
  },

  icon: {
    height: Sizes.Size_26,
    width: Sizes.Size_26,
  },

  text: {
    color: palette.neutral[0],
    fontSize: Sizes.Size_18,
  },
})

export default styles
