# react-native-vs-animated-component

<br/>
<br/>

# React Native Icon Transition Button

## Features
- **Responsive Design:** Adjusts to screen dimensions to maintain consistent behavior across devices.
- **Customizable Styles:** Styles can be customized via props.
- **Different Icons:** Allows for changing the icons.

## Example

```jsx
<IconTransitionButton
  onPress={async () => {
    // Perform some async operation
    const success = await someAsyncFunction()
    return success
  }}
  startIcon={<StartIconComponent />}
  failedIcon={<FailedIconComponent />}
  successIcon={<SuccessIconComponent />}
  isDisabled={false}
  isLoading={false}
/>
```

## Props

| Prop                 | Type                                 | Values                      | Description                                                                                                 |
| -------------------- | ------------------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| buttonStyle          | ViewStyle                            | name of style class created | It is is an optional prop which defines the styles of button.                                               |
| failedIcon           | React.ReactNode                      | icon as component           | It is a required prop which dictates the icon displayed if the onPress function returns a falsy value.      |
| isDisabled           | boolean                              | true/false                  | It is an optional prop which dictates that disables the button if true.                                     |
| isLoading            | boolean                              | true/false                  | It is an optional prop which dictates that disables the button if true, likely to indicate a loading state. |
| onPress              | () => void / boolean / Promise<void> | name of function to perform | It is a required prop which dictates the function is called when the button is pressed.                     |
| startIcon            | React.ReactNode                      | icon as component           | It is a required prop which dictates the initial icon displayed on the button.                              |
| successIcon          | React.ReactNode                      | icon as component           | It is a required prop which dictates the icon displayed if the onPress function returns a truth value.      |

**Note:** All the props are passed to the Icon Transition Button component.

<br/>
<br/>

# React Native Swipe Button

## Features
- **Responsive Design:** Adjusts to screen dimensions to maintain consistent behavior across devices.
- **Customizable Styles:** Styles can be customized via props.

## Example

```jsx
const gradientWaveColor = useMemo(() => ['#1A63C5', '#1A63C5'], [])
const thumbColors = useMemo(() => ['#1A63C5', '#1A63C5'], [])

const taskStatusData = useMemo(
  () => ({
    fail: {
      text: 'Failed',
      icon: RemixIcons.FILLED_CLOSE_CIRCLE,
      iconColor: 'white',
      waveColor: ['#D54D49', '#D54D49'],
    },
    success: {
      text: 'Successfully',
      icon: RemixIcons.CHECKBOX_CIRCLE_FILLED,
      iconColor: 'white',
      waveColor: ['#59B359', '#59B359'],
    },
  }),
  [],
)

const handleSubmitBtnPress = () => {
    try {
      return true
    } catch {
      return false
    }
  }

<SwipeButton
  buttonInitialText="Swipe to complete"
  gradientWaveColor={['#4c669f', '#3b5998', '#192f6a']}
  isDisabled={false}
  onSwipeComplete={async () => {
    // Simulate async operation
    const success = await someAsyncOperation()
    return success
  }}
  onTaskComplete={(isSuccess) => {
    // Handle task completion
    console.log('Task completed:', isSuccess)
  }}
  taskStatusData={{
    success: { waveColor: ['#00ff00'] },
    fail: { waveColor: ['#ff0000'] },
  }}
  thumbColors={['#ffffff', '#000000']}
/>

```

## Props

| Prop                 | Type                                                | Values                      | Description                                                                                           |
| -------------------- | --------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| buttonInitialText    | string                                              | text                        | It is a required prop which defines the initial text displayed on the button.                         |
| gradientWaveColor    | Array<string>                                       | array of colors             | It is a required prop which defines the colors for the initial gradient wave effect.                  |
| isDisabled           | boolean                                             | true/false                  | It is an optional prop which disables the button if true.                                             |
| onSwipeComplete      | () => Promise<boolean>                              | name of function to perform | It is a required prop which dictates the function called when the swipe is completed.                 |
| onTaskComplete       | (isSuccess: boolean) => void                        | name of function to perform | It is a required prop which dictates the function called when the task is complete.                   |
| style                | ViewStyle                                           | name of style class created | It is an optional prop which defines the styles of the button.                                        |
| taskStatusData       | ITaskStatusData                                     | object                      | It is a required prop which provides data related to task statuses, including success and fail states.|
| thumbColors          | Array<string>                                       | array of colors             | It is a required prop which defines the colors for the thumb (swipe indicator).                       |

**Note:** All the props are passed to the Swipe Button component.

<br/>
<br/>

# React Native Progress Button

## Features
- **Responsive Design:** Adjusts to screen dimensions to maintain consistent behavior across devices.
- **Customizable Styles:** Styles can be customized via props.

## Example

```jsx
const [isLoading, setIsLoading] = useState(false)

const onPress = () => {
  setIsLoading(true)
  setTimeout(() => setIsLoading(false), 3000)
}

<ProgressButton
  isLoading={isLoading}
  onPress={onPress}
  label="Submit"
  buttonContainerStyle={{
    marginVertical: 20,
  }}
/>
```

## Props

| Prop                 | Type                 | Values                      | Description                                                                                 |
| -------------------- | -------------------- | --------------------------- | ------------------------------------------------------------------------------------------- |
| buttonContainerStyle | StyleProp<ViewStyle> | name of style class created | It is an optional prop which defines the styles of the button container.                    |
| buttonStyle          | StyleProp<ViewStyle> | name of style class created | It is an optional prop which defines the styles of the button.                              |
| isDisabled           | boolean              | true/false                  | It is an optional prop which disables the button if true.                                   |
| isLoading            | boolean              | true/false                  | It is a required prop which indicates the loading state of the button.                      |
| label                | string               | text                        | It is a required prop which defines the label text displayed on the button.                 |
| labelStyle           | StyleProp<TextStyle> | name of style class created | It is an optional prop which defines the styles of the label text.                          |
| loadingText          | string               | text                        | It is an optional prop which defines the text displayed when the button is in loading state.|
| onPress              | () => void           | name of function to perform | It is a required prop which dictates the function called when the button is pressed.        |

**Note:** All the props are passed to the Progress Button component.

<br/>
<br/>

# React Native Spring Button

## Features
- **Responsive Design:** Adjusts to screen dimensions to maintain consistent behavior across devices.
- **Customizable Styles:** Styles can be customized via props.

## Example

```jsx
const onSpringPress = () => {
  console.log('Button Pressed');
}

<SpringButton label="Press me" onPress={onSpringPress} />
```

## Props

| Prop              | Type                 | Values                      | Description                                                                                       |
| ----------------- | -------------------- | --------------------------- | ------------------------------------------------------------------------------------------------- |
| customButtonStyle | StyleProp<ViewStyle> | name of style class created | It is an optional prop which defines the custom styles of the button.                             |
| isLoading         | boolean              | true/false                  | It is an optional prop which indicates the loading state of the button.                           |
| isDisabled        | boolean              | true/false                  | It is an optional prop which disables the button if true.                                         |
| label             | string               | text                        | It is a required prop which defines the label text displayed on the button.                       |
| loaderColor       | string               | color code                  | It is an optional prop which defines the color of the loader when the button is in loading state. |
| onPress           | () => void           | name of function to perform | It is a required prop which dictates the function called when the button is pressed.              |

**Note:** All the props are passed to the Spring Button component.

<br/>
<br/>

# React Native Tri-Dot Loader

## Features
- **Responsive Design:** Adjusts to screen dimensions to maintain consistent behavior across devices.
- **Customizable Styles:** Styles can be customized via props.

## Example

```jsx
<TriDotLoader loaderPreset={TriDotLoaderPreset.Large} />
```

## Props

| Prop                 | Type                 | Values                      | Description                                                                     |
| -------------------- | -------------------- | --------------------------- | ------------------------------------------------------------------------------- |
| customLoaderStyle    | StyleProp<ViewStyle> | name of style class created | It is an optional prop which defines the custom styles of the loader.           |
| loaderDotColor       | string               | color code                  | It is an optional prop which defines the color of the dots in the loader.       |
| loaderPreset         | TriDotLoaderPreset   | Small / Medium / Large      | It is an optional prop which defines the size preset of the dots in the loader. |

**Note:** All the props are passed to the Tri-Dot Loader component.

