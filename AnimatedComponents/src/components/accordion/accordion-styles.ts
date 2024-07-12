import { StyleSheet } from 'react-native'

import { Sizes } from '@theme'

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  accordionHeading: {
    fontWeight: '600',
    fontFamily: 'Roboto-Bold',
    fontSize: Sizes.Size_15,
    letterSpacing: Sizes.Size_1,
    maxWidth: '90%',
  },
  accordionContainer: {
    alignItems: 'center',
    backgroundColor: '#F7F9F2',
    borderColor: 'gray',
    borderWidth: Sizes.Size_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Sizes.Size_20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    width: '100%',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    width: '100%',
  },
  animatedView: {
    overflow: 'hidden',
    width: '100%',
  },
})
