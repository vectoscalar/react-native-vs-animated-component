import { StyleSheet, ViewStyle } from 'react-native'

interface Styles {
  container: ViewStyle
  ball: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    backgroundColor: '#016FC3',
    padding: 10,
    borderRadius: 15,
    position: 'relative',
    alignSelf: 'center',
  },
  ball: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
})

export default styles
