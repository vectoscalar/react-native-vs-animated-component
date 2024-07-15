import React, { FC, createContext, useContext, useEffect, useState } from 'react'
import {
  LayoutAnimation,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  UIManager,
  View,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { DefaultStyle } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes'
import Icon from 'react-native-vector-icons/AntDesign'

import { styles } from './accordion-styles'

interface AccordionContextType {
  activeAccordionId: number | string | undefined
  setActiveAccordionId: (id: number | string | undefined) => void
  isMultipleOpen: boolean
}

const AccordionContext = createContext<AccordionContextType>({
  activeAccordionId: undefined,
  setActiveAccordionId: (id: number | string | undefined) => {},
  isMultipleOpen: true,
})

interface IAccordionItemProps {
  /** children: is a required prop which dictates the children of the accordion */
  children: JSX.Element
  /** duration: is an optional prop which dictates the duration of accordion drop down animation */
  duration?: number
  /** icon: is an optional prop which dictates the name of the icon */
  icon?: string
  /** id: is a required prop which dictates the id of the accordion item */
  id: number | string
  /** isDefaultOpen: is an optional prop which dictates the default state of accordion */
  isDefaultOpen?: boolean
  /** titleContainerStyle: is an optional prop which defines the style of the accordion title container. */
  titleContainerStyle?: DefaultStyle
  /** titleStyle: is an optional prop which defines the style of the accordion title */
  titleStyle?: DefaultStyle
  /** title: is an optional prop which defines the title of the accordion */
  title: string
}

const Item: FC<IAccordionItemProps> = props => {
  const {
    children,
    duration = 300,
    icon = '',
    id,
    isDefaultOpen = false,
    title,
    titleContainerStyle = {},
    titleStyle = {},
  } = props

  const { activeAccordionId, setActiveAccordionId, isMultipleOpen } = useContext(AccordionContext)

  const open = isMultipleOpen
    ? useSharedValue(isDefaultOpen)
    : useSharedValue(activeAccordionId === id)

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
    if (!isMultipleOpen) {
      setActiveAccordionId(activeAccordionId === id ? undefined : id)
    }
    open.value = !open.value
  }

  useEffect(() => {
    open.value = activeAccordionId === id
  }, [activeAccordionId])

  const myIcon = <Icon name={icon ? icon : 'down'} size={20} />

  return (
    <>
      <Pressable style={[styles.accordionContainer, titleContainerStyle]} onPress={onPress}>
        <Text style={[styles.accordionHeading, titleStyle]}>{title}</Text>
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
    </>
  )
}

interface IAccordionProps {
  /** children: is a required prop which dictates the children of the accordion */
  children: React.ReactElement[]
  /** showSingleItemAtOnce: is an optional prop which dictates if multiple accordion items can be open at the same time. */
  showSingleItemAtOnce?: boolean
}

const Accordion: FC<IAccordionProps> = props => {
  const { children, showSingleItemAtOnce = false } = props
  const [activeAccordionId, setActiveAccordionId] = useState<number | string | undefined>(undefined)

  return (
    <AccordionContext.Provider
      value={{ activeAccordionId, setActiveAccordionId, isMultipleOpen: !showSingleItemAtOnce }}>
      <SafeAreaView>{children}</SafeAreaView>
    </AccordionContext.Provider>
  )
}

export type IAccordionType = ((props: IAccordionProps) => React.JSX.Element) & {
  Item: (props: IAccordionItemProps) => React.JSX.Element
}

const AccordionTemp: any = Accordion
AccordionTemp.Item = Item

const AccordionMain = AccordionTemp as IAccordionType

export default AccordionMain
