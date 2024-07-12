import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  selectText: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    backgroundColor: 'white',
    marginTop: 4,
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
  },
  option: {
    margin: 10,
    padding: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedOption: {
    backgroundColor: '#016FC3',
    borderRadius: 5,
    color: 'white',
  },
})

export default styles
