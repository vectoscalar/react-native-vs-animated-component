import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Sizes, palette } from '@theme'

interface IStyles {
  chip: ViewStyle
  chipIcon: TextStyle
  chipText: TextStyle
  chipsContainer: ViewStyle
  container: ViewStyle
  emptyView: ViewStyle
  mainContainer: ViewStyle
  modalContent: ViewStyle
  modalOverlay: ViewStyle
  option: ViewStyle
  optionIcon: TextStyle
  optionText: TextStyle
  optionsContainer: ViewStyle
  selectText: TextStyle
  selectedOption: TextStyle
  selectedChipsContainer: ViewStyle
}

const styles: IStyles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: Sizes.Size_10,
    position: 'relative',
    width: '100%',
  },

  container: {
    alignItems: 'center',
    backgroundColor: palette.neutral[0],
    borderColor: palette.chineseSilver,
    borderRadius: Sizes.Size_5,
    borderWidth: Sizes.Size_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Sizes.Size_10,
  },

  optionsContainer: {
    backgroundColor: 'white',
    borderColor: palette.chineseSilver,
    borderRadius: Sizes.Size_5,
    borderWidth: Sizes.Size_1,
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
  },

  option: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Sizes.Size_10,
  },

  optionText: {
    fontSize: Sizes.Size_16,
  },

  selectedOption: {
    color: palette.azure,
  },

  optionIcon: {
    color: palette.azure,
    fontSize: Sizes.Size_16,
    marginRight: Sizes.Size_8,
  },

  emptyView: {
    padding: Sizes.Size_8,
    marginRight: Sizes.Size_8,
  },

  selectText: {
    fontSize: Sizes.Size_16,
  },

  selectedChipsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip: {
    alignItems: 'center',
    backgroundColor: palette.chineseWhite,
    borderRadius: Sizes.Size_15,
    flexDirection: 'row',
    margin: Sizes.Size_5,
    paddingHorizontal: Sizes.Size_10,
    paddingVertical: Sizes.Size_1,
  },

  chipText: {
    marginRight: Sizes.Size_5,
  },

  chipIcon: {
    color: palette.black,
    fontSize: Sizes.Size_16,
  },

  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: Sizes.Size_1,
    justifyContent: 'flex-start',
    marginHorizontal: Sizes.Size_10,
  },

  modalContent: {
    backgroundColor: palette.neutral[0],
    borderRadius: Sizes.Size_10,
    borderColor: palette.chineseSilver,
    elevation: Sizes.Size_2,
    shadowColor: palette.blueBayoux,
    shadowOffset: { width: Sizes.Size_0, height: Sizes.Size_2 },
    shadowOpacity: Sizes.Size_0_25,
    shadowRadius: Sizes.Size_3_84,
    padding: Sizes.Size_20,
    position: 'absolute',
    width: '100%',
  },
})

export default styles
