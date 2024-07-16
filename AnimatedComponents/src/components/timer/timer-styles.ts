import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  linearContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    height: 10,
    marginBottom: 20,
    overflow: 'hidden',
    width: '80%',
  },

  linearProgress: {
    height: '100%',
  },

  timeLeftText: {
    fontSize: 24,
    marginVertical: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },

  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default styles
