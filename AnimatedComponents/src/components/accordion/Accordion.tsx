import React from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { DefaultStyle } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes'
import Icon from 'react-native-vector-icons/AntDesign'

import { styles } from './accordion-styles'

interface IAccordionProps {
  /**accordionTitleStyle: is an optional prop which defines the style of the accordion title */
  accordionTitleStyle?: DefaultStyle
  /**accordionStyle: is an optional prop which defines the style of the accordion */
  accordionStyle?: DefaultStyle
  /**children: is a required prop which dictates the children of the accordion */
  children: JSX.Element
  /**isDefaultOpen: is an optional prop which dictates the default state of accordion */
  isDefaultOpen?: boolean
  /**duration: is an optional prop which dictates the duration of animation */
  duration?: number
  /**icon: is an optional prop which dictates the name of the icon */
  icon?: string
  /**title: is an optional prop which defines the title of the accordion */
  title: string
}

const Accordion = (props: IAccordionProps) => {
  const {
    accordionTitleStyle = {},
    accordionStyle = {},
    children,
    isDefaultOpen = false,
    duration = 300,
    icon = '',
    title,
  } = props

  const open = useSharedValue(isDefaultOpen)
  const height = useSharedValue(0)

  const derivedHeight = useDerivedValue(
    () =>
      withTiming(height.value * Number(open.value), {
        duration,
      }),
    [open],
  )

  const accordionBodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }))

  const rotateIconValue = useDerivedValue(() =>
    withTiming(open.value ? '180deg' : '0deg', { duration: duration }),
  )

  const onPress = () => {
    open.value = !open.value
  }

  const myIcon = <Icon name={icon ? icon : 'down'} size={20} />

  return (
    <SafeAreaView>
      <Pressable style={[styles.accordionContainer, accordionStyle]} onPress={onPress}>
        <Text style={[styles.accordionHeading, accordionTitleStyle]}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateIconValue }] }}>{myIcon}</Animated.View>
      </Pressable>

      <View style={styles.content}>
        <View style={styles.dropdown}>
          <Animated.View style={[styles.animatedView, accordionBodyStyle]}>
            <View
              onLayout={e => {
                height.value = e.nativeEvent.layout.height
              }}
              style={styles.wrapper}>
              {children}
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Accordion
