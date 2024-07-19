# react-native-vs-animated-component

# Search Bar

The Search Bar component is an expandable search bar component which can expand and collapse by clicking on search icon.

# Preview

<img src="https://github.com/user-attachments/assets/4130df80-e647-485b-acb5-2de9abd945e2" width="250" height="500"/>

## Props

## Search Bar Props

| Prop                        | Type                   | Description                                                                                    |
| --------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| **CloseIcon**               | React.ReactNode        | It is an optional prop which holds the icon to be displayed to close the search bar.           |
| **duration**                | number                 | It is an optional prop which indicates the duration of the animation.                          |
| **iconSize**                | number                 | It is an optional prop which indicates the size of the icon.                                   |
| **iconStyle**               | DefaultStyle           | It is an optional prop which holds the style of the search icon.                               |
| **inputContainerStyle**     | DefaultStyle           | It is an optional prop which holds the style of the input container.                           |
| **handleInputChange**       | (text: string) => void | It is a prop which handles the input change.                                                   |
| **height**                  | number                 | It is an optional prop which indicates the height of the search bar.                           |
| **iconBackgroundColor**     | string                 | It is an optional prop which indicates the color of the icon background.                       |
| **iconColor**               | string                 | It is an optional prop which indicates the color of the icon.                                  |
| **placeholderText**         | string                 | It is an optional prop which holds the placeholder text.                                       |
| **placeholderTextColor**    | string                 | It is an optional prop which holds the placeholder text color.                                 |
| **searchBarContainerStyle** | DefaultStyle           | It is an optional prop which holds the style of the search bar.                                |
| **SearchIcon**              | React.ReactNode        | It is an optional prop which holds the icon to be displayed.                                   |
| **searchValue**             | string                 | It is a prop which holds the value of the search bar.                                          |
| **wrapperContainerStyle**   | DefaultStyle           | It is an optional prop which holds the style of the main container which wraps the search bar. |

## Usage

```jsx
const SearchBarDemo = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <View
      style={{
        marginTop: 22,
        backgroundColor: "white",
        flexDirection: "row",
        marginBottom: 20,
        paddingVertical: 5,
      }}
    >
      <Icon name="apple1" color="#016FC3" size={50} />
      <SearchBar
        inputContainerStyle={{ color: "white", width: "90%" }}
        searchValue={searchValue}
        handleInputChange={setSearchValue}
      />
    </View>
  );
};
```
