Implementation of several animated modals using the react-native-reanimated library

## Features:
1. Multiple modal animations:
   - Fade-In
   - Slide-In
   - Scale
   - Rotate-In
   - Flip-In
   - Slide-In-Left
2. Easy to integrate and use in any React Native project.
3. Customizable modal content and styles.


## Props:
The component accepts the following props:
|Prop |Type |Description |Required |
|--- |--- |--- | ---|
| isVisible | boolean | Indicates whether the modal is visible or not | Yes |
| onClose | () => {} | Handles the closing of the modal | Yes |
| type | ModalPreset | Specifies the type of animation preset for the modal | Yes |
| children | React.ReactNode | The content to be displayed inside the modal | Yes |
| style | StyleProp<ViewStyle> | Additional styles for customizing the modal | No |

## Usage:
This is a simple example of how to use animated modals:
```Typescript

const App: React.FC = () => {
  const [fadeInVisible, setFadeInVisible] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setFadeInVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Show Fade-In Modal</Text>
        </TouchableOpacity>

        <Modal
          isVisible={fadeInVisible}
          onClose={() => setFadeInVisible(false)}
          type={ModalPreset.FadeIn}>
          <Text>This is a fade-in modal</Text>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default App;

```
