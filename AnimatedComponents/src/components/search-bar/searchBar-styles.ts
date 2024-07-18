import { StyleSheet } from 'react-native'

import { Sizes } from '@theme'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: Sizes.Size_1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  searchBarContainer: {
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: Sizes.Size_50,
    flexDirection: 'row',
    width: '100%',
    height: Sizes.Size_50,
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.Size_10,
  },

  searchBarTextContainer: { flex: Sizes.Size_1 },

  searchIconContainer: {
    alignItems: 'center',
    borderRadius: Sizes.Size_50,
    height: Sizes.Size_40,
    justifyContent: 'center',
    width: Sizes.Size_40,
  },
})
