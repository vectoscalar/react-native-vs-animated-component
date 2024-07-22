import { StyleSheet } from 'react-native'

import { Sizes } from '@theme'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: Sizes.Size_50,
    flex: Sizes.Size_1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: 0,
  },

  searchBarContainer: {
    justifyContent: 'center',
    backgroundColor: '#016FC3',
    borderRadius: Sizes.Size_50,
    width: '100%',
    paddingHorizontal: 10,
  },

  searchBarTextContainer: { flex: Sizes.Size_1 },

  searchIconContainer: {
    position: 'absolute',
    right: Sizes.Size_0,
    alignItems: 'center',
    borderRadius: Sizes.Size_50,
    justifyContent: 'center',
  },

  iconStyle: {
    position: 'absolute',
  },
})
