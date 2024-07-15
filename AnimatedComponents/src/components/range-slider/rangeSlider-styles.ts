import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  sliderContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  sliderBack: {
    backgroundColor: '#DFEAFB',
    borderRadius: 20,
    height: 8,
  },
  sliderFront: {
    backgroundColor: '#3F4CF6',
    borderRadius: 20,
    height: 8,
    position: 'absolute',
  },
  thumb: {
    backgroundColor: 'white',
    borderColor: '#3F4CF6',
    borderRadius: 10,
    borderWidth: 5,
    height: 20,
    left: -10,
    position: 'absolute',
    width: 20,
  },
  label: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    bottom: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: -40,
  },
  labelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    width: '100%',
  },
})
