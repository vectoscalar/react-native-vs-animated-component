import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  optionsContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  option: {
    padding: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedOption: {
    backgroundColor: 'blue',
    color: 'white',
  },
})

export default styles
