# react-native-vs-animated-component

# Search Bar

The Search Bar component is an expandable search bar component which can expand and collapse by clicking on search icon.

<img src="https://github.com/user-attachments/assets/4130df80-e647-485b-acb5-2de9abd945e2" width="250" height="500"/>

## Props

## Search Bar Props

| Prop                      | Type                   | Description                                                                                                 |
| ------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| CloseIcon                 | React.ReactNode        | It is an optional prop which holds the icon to be displayed to close the search bar.                        |
| SearchIcon                | React.ReactNode        | It is an optional prop which holds the icon to be displayed.                                                |
| closeIconBackgroundColor  | string                 | It is an optional prop which indicates the color of the close icon background.                              |
| closeIconColor            | string                 | It is an optional prop which indicates the color of the close icon.                                         |
| duration                  | number                 | It is an optional prop which dictates the duration of the animation.                                        |
| handleInputChange         | (text: string) => void | It is a prop which handles the input change.                                                                |
| iconSize                  | number                 | It is an optional prop which dictates the size of the icon                                                  |
| iconStyle                 | DefaultStyle           | It is an optional prop which dictates the style of the search icon                                          |
| inputContainerStyle       | DefaultStyle           | It is an optional prop which dictates the style of the text input.                                          |
| placeholderText           | string                 | It is an optional prop which dictates the placeholder text                                                  |
| placeholderTextColor      | string                 | It is an optional prop which holds the placeholder text color.                                              |
| searchBarContainerStyle   | DefaultStyle           | It is an optional prop which holds the style of the search bar.                                             |
| searchIconBackgroundColor | string                 | It is an optional prop which indicates the color of the search icon background.                             |
| searchIconColor           | string                 | It is an optional prop which indicates the color of the search icon.                                        |
| searchValue               | string                 | It is a prop which dictates the value of the search bar                                                     |
| wrapperContainerStyle     | DefaultStyle           | It is an optional prop which dictates the style of the main container which wraps the search bar container. |

## Usage

```
const SearchBarDemo = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <View
      style={{
        marginTop: 22,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 5,
      }}>
      <Icon name="apple1" color="#016FC3" size={50} />
      <SearchBar searchValue={searchValue} handleInputChange={setSearchValue} />
    </View>
  )
}
```
