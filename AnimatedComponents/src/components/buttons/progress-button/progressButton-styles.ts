import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#016FC3',
    borderRadius: 5,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
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
    backgroundColor: '#034472',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
  },
})

export default style
