import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  linearContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    height: 20,
    marginBottom: 10,
    overflow: 'hidden',
    width: '100%',
  },

  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  linearProgress: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },

  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  timeLeftTextLinear: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },

  timeLeftTextCircular: {
    color: 'black',
    fontSize: 16,
    position: 'absolute',
  },
})
