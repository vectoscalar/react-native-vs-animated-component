# react-native-vs-animated-component

# React Native Select Box

## Preview

<img src="./AnimatedComponents/src/assets/gifs/SelectBox.gif" width="250" height="500"/>

## Features

- **Animation Transition Duration:** Control the duration of the opening/closing animation.
- **Customizable Styles:** Styles can be customized via props.
- **Different Types:** Allows users to choose the type of select box.
- **Dropdown Selection:** Opens a dropdown interface to select options.
- **Performance Optimizations:** Only renders the dropdown and animations when needed, reducing unnecessary re-renders.
- **Responsive Design:** Adjusts to screen dimensions to maintain consistent behavior across devices.
- **Single/Multi-selection:** Supports both single and multi-select use cases with the same component, reducing the need for multiple components.
- **TypeScript Support:** Fully typed with TypeScript, providing type safety and better developer experience.

## Usage

```jsx
import Select from "react-native-animated-components";

const [select, setSelect] = useState<ISelectOption | ISelectOption[]>([])

<Select
  onChange={setSelect}
  options={[
    { title: "Amandeep", value: "amandeep" },
    { title: "Aman Rana", value: "aman rana" },
    { title: "Hargun", value: "hargun" },
    { title: "Ravi", value: "ravi" },
  ]}
  selectedOptions={select}
  placeholderText="Select option"
/>
```

## Props

| Prop                 | Type                                              | Values                                                         | Description                                                                                     |
| -------------------- | ------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| multiSelect          | Boolean                                           | true/false                                                     | It is is an optional prop which dictates whether multiple selections is allowed or not.         |
| onChange             | (newValue: ISelectOption[]/ISelectOption) => void | name of function to perform                                    | It is a required prop which dictates the function which will be called on clicking the options. |
| options              | Array of { title: '', value: '' }                 | [{ title: 'Name to be displayed', value: 'Value to be used' }] | It is an required prop which dictates an array containing titles and values for options.        |
| optionContainerStyle | ViewStyle                                         | name of style class created                                    | It is an optional prop which defines the styles of option container.                            |
| optionStyle          | ViewStyle                                         | name of style class created                                    | It is an optional prop which defines the styles of options.                                     |
| placeholderText      | string                                            | values to be display in select box                             | It is an optional prop which dictates the text of placeholder.                                  |
| selectedOptionStyle  | ViewStyle                                         | name of style class created                                    | It is an optional prop which defines the styles of selected option.                             |
| selectContainerStyle | ViewStyle                                         | name of style class created                                    | It is an optional prop which defines the styles of select container.                            |
| selectedOptions      | ISelectOption[]/ISelectOption                     | [{ title: 'Name to be displayed', value: 'Value to be used' }] | It is a required prop which dictates the selected options.                                      |

**Note:** All the props are passed to the select component.
