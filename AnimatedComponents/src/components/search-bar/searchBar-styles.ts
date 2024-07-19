import { StyleSheet } from 'react-native'

import { Sizes } from '@theme'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: Sizes.Size_1,
    justifyContent: 'center',
  },
  searchBarContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: Sizes.Size_50,
    flexDirection: 'row',
    height: Sizes.Size_50,
    justifyContent: 'center',
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
