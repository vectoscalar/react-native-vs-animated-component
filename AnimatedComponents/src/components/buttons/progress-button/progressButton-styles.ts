import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#5cb85c',
    borderRadius: 5,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progressBar: {
    backgroundColor: '#8DCD8D',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
  },
})

export default style
