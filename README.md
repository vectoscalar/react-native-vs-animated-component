# react-native-vs-animated-component

# React Native Floating Button

## Preview

### Floating Button All Variants

<img src="./AnimatedComponents/src/assets/gifs/FloatingButton.gif" width="250" height="500"/>

<br/>

### Floating Button With Icon

<img src="./AnimatedComponents/src/assets/gifs/FloatingButtonWithIcon.gif" width="250" height="500"/>

<br/>

### Floating Button With Label

<img src="./AnimatedComponents/src/assets/gifs/FloatingButtonWithLabel.gif" width="250" height="500"/>

<br/>

### Circular Floating Button

<img src="./AnimatedComponents/src/assets/gifs/CircularFloatingButton.gif" width="250" height="500"/>

## Features

- **Different Types:** Allows users to choose the type of floating button.
- **Animation Transition Duration**: Control the duration of the opening/closing animation.
- **Responsive Design**: Adjusts to screen dimensions to maintain consistent behavior across devices.
- **Customizable Styles**: Styles can be customized via props.
- **Circular Floating Button**: Offers a circular expansion with animated icons along the circumference.
- **Floating Button With Icon**: Provides a vertical stack of icons with staggered animations.
- **Floating Button With Label**: Similar to FloatingButtonWithIcon but includes expanding width and text labels for each icon.

## Usage

```jsx
import FloatingButton from "react-native-animated-components";

const icons = [
    {
      icon: FileIcon,
      onPress: () => Alert.alert('File Icon Pressed'),
      iconName: 'File',
    },
    {
      icon: FolderIcon,
      onPress: () => Alert.alert('Folder Icon Pressed'),
      iconName: 'Folder',
    },
    {
      icon: PenIcon,
      onPress: () => Alert.alert('Pen Icon Pressed'),
      iconName: 'Pen',
    },
    {
      icon: PenIcon,
      onPress: () => Alert.alert('Pen Icon Pressed'),
      iconName: 'Pencil',
    },
  ]

  <FloatingButton buttonType={FloatingButtonPreset.FloatingButtonWithIcon} icons={icons} />
```

## Props

| Prop                        | Type                 | Values                                                                    | Description                                                                                                                          |
| --------------------------- | -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| animationTransitionDuration | number               | 0,1,2,3.....                                                              | It is used to change the duration of the transition of animation.                                                                    |
| buttonContainerStyle        | ViewStyle            | name of style class created                                               | It is used to change the styles of the container of the floating button.                                                             |
| buttonType                  | FloatingButtonPreset | FloatingButtonWithIcon / FloatingButtonWithLabel / CircularFloatingButton | It is used to change the type of the floating button.                                                                                |
| circleStyle                 | ViewStyle            | name of style class created                                               | It is used to change the styles of the container of the expanding circle when the type of floating button is CircularFloatingButton. |
| contentContainerStyle       | ViewStyle            | name of style class created                                               | It is used to change the styles of the container of the content in the floating button.                                              |
| iconContainerStyle          | ViewStyle            | name of style class created                                               | It is used to change the styles of the container of the icon in the floating button.                                                 |
| iconStyle                   | ImageStyle           | name of style class created                                               | It is used to change the styles of the icons in the floating button.                                                                 |
| icons                       | array of IconProps   | { icon: 'name of image', onPress: function, iconName: 'name of icon'}     | It is used to pass the name, image and function the for the icon.                                                                    |
| isLeftAligned               | Boolean              | true/false                                                                | It is used to change the position of the floating button to left when true otherwise right.                                          |
| textStyle                   | TextStyle            | name of style class created                                               | It is used to change the styles of the text when the type of floating button is FloatingButtonWithLabel.                             |

**Note:** All the props are passed to the floating-button component from where it will send the props to the type chosen by the user.
