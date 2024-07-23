import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  linearContainer: {
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },

  linearProgress: {
    height: '100%',
    width: '100%',
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

  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 0,
  },

  icons: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default styles
