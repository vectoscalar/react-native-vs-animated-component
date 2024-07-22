import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearContainer: {
    height: 10,
    width: 300, // Adjust this width to your needs
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  linearProgress: {
    height: '100%',
    width: '100%', // Keep this full width for translation
  },
  circularContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeLeftTextCircular: {
    position: 'absolute',
    fontSize: 18,
    color: 'black',
  },
  timeLeftTextLinear: {
    marginTop: 10,
    fontSize: 18,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
})

export default styles
