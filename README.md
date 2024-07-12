# react-native-vs-animated-component

# Accordion

The Accordion component lets users show and hide sections of related content on a page.

## Example

jsx
```
<Accordion title="Lorem ipsum dolor">
  <View style={{ padding: 20, backgroundColor: '#E8C5E5' }}>
    <Text style={{ fontFamily: 'Robot-Medium', letterSpacing: 1 }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia nostrum libero
      similique iste cumque, perspiciatis quasi exercitationem, suscipit voluptatum autem,
      fuga maiores? Saepe, vitae perspiciatis. Cumque consequatur facilis incidunt.
    </Text>
  </View>
</Accordion>
```

## Props

| Prop                | Type            | Values            | Description                                                                                    |
| ------------------- | --------------- | ----------------- | ---------------------------------------------------------------------------------------------- |
| title               | string          | any string        | It dictates the title of the accordion.                                                        |
| accordionTitleStyle | DefaultStyle    | style object      | It is an optional prop which is used to allow users to change the style of title text.         |
| isDefaultOpen       | boolean         | true/false        | It is an optional prop which is used to dictate whether the accordion will be open by default. |
| duration            | number          | any number value  | It is used to control the speed of the animation.                                              |
| icon                | string          | name of react vector icon | It is used to dictate the icon name for the accordion dropdown.                                     |
