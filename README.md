# react-native-vs-animated-component

# Search Bar

The Search Bar component is an expandable search bar component which can expand and collapse by clicking on search icon.

## Example

```
<View
    style={{
        marginTop: 22,
        backgroundColor: 'black',
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 5,
    }}>
    <SearchBar
      searchValue={searchValue}
      onInputChange={setSearchValue}
      wrapperContainer={{
        backgroundColor: 'black',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
      }}
    />
</View>
```

## Props

## Search Bar Props

| Prop                  | Type                 | Description                                                                                                      |
| --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| duration              | number               | It is an optional prop which dictates the duration of the animation.                                             |
| icon                  | ReactNode            | It is an optional prop which dictates the icon to be displayed                                                   |
| iconColorCollapsed    | string               | It is an optional prop which dictates the color of the icon when search bar is collapsed                         |
| iconColorExpanded     | string               | It is an optional prop which dictates the color of the icon when search bar is expanded                          |
| iconSize              | number               | It is an optional prop which dictates the size of the icon                                                       |
| iconStyle             | DefaultStyle         | It is an optional prop which dictates the style of the search icon                                               |
| inputContainerStyle   | DefaultStyle         | It is an optional prop which dictates the style of the text input.                                               |
| onInputChange         | (text: string) => {} | It is a prop which handles the input change                                                                      |
| placeholderText       | string               | It is an optional prop which dictates the placeholder text                                                       |
| searchBarContainer    | DefaultStyle         | It is an optional prop which dictates the style of the search bar which contains the input and the search button |
| searchValue           | string               | It is a prop which dictates the value of the search bar                                                          |
| wrapperContainerStyle | DefaultStyle         | It is an optional prop which dictates the style of the main container which wraps the search bar container.      |
