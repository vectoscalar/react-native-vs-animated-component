# react-native-vs-animated-component

# Accordion

The Accordion component lets users show and hide sections of related content on a page.

## Example

```
<Accordion showSingleItemAtOnce={false}>
  <Accordion.Item id={1} title="FAQ">
    <View style={{ padding: 20, backgroundColor: '#E8C5E5' }}>
      <Text style={{ fontFamily: 'Robot-Medium', letterSpacing: 1 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia nostrum libero
        similique iste cumque, perspiciatis quasi exercitationem, suscipit voluptatum autem,
        fuga maiores? Saepe, vitae perspiciatis. Cumque consequatur facilis incidunt.
      </Text>
    </View>
  </Accordion.Item>
  <Accordion.Item id={2} title="FAQ">
    <View style={{ padding: 20, backgroundColor: '#E8C5E5' }}>
      <Text style={{ fontFamily: 'Robot-Medium', letterSpacing: 1 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia nostrum libero
        similique iste cumque, perspiciatis quasi exercitationem, suscipit voluptatum autem,
        fuga maiores? Saepe, vitae perspiciatis. Cumque consequatur facilis incidunt.
      </Text>
    </View>
  </Accordion.Item>
  <Accordion.Item id={3} title="FAQ">
    <View style={{ padding: 20, backgroundColor: '#E8C5E5' }}>
      <Text style={{ fontFamily: 'Robot-Medium', letterSpacing: 1 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia nostrum libero
        similique iste cumque, perspiciatis quasi exercitationem, suscipit voluptatum autem,
        fuga maiores? Saepe, vitae perspiciatis. Cumque consequatur facilis incidunt.
      </Text>
    </View>
  </Accordion.Item>
</Accordion>

```

## Props

## Accordion Item Props

| Prop                | Type             | Description                                                                                                                                       |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| title               | string           | It dictates the title of the accordion.                                                                                                           |
| titleStyle          | DefaultStyle     | It is an optional prop which is used to allow users to change the style of title text.                                                            |
| isDefaultOpen       | boolean          | It is an optional prop which is used to dictate whether the accordion will be open by default. Only works when showSingleItemAtOnce prop is false |
| duration            | number           | It is used to control the speed of the animation.                                                                                                 |
| icon                | string           | It is used to dictate the icon name from the ant design library for the accordion dropdown.                                                       |
| id                  | number or string | It is used to define the id of the accordion item.                                                                                                |
| titleContainerStyle | DefaultStyle     | It is an optional prop which is used to allow users to change the style of title container.                                                       |

## Accordion Props

| Prop                 | Type    | Description                                                                                     |
| -------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| showSingleItemAtOnce | boolean | It is an optional prop which dictates if multiple accordion items can be open at the same time. |
