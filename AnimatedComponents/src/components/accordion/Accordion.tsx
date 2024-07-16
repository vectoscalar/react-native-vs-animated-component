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
import Animated, { useDerivedValue, withTiming } from 'react-native-reanimated'
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

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  const { activeAccordionId, setActiveAccordionId, isMultipleOpen } = useContext(AccordionContext)

  const [open, setOpen] = useState(isMultipleOpen ? isDefaultOpen : activeAccordionId === id)

  const rotateIconValue = useDerivedValue(() =>
    withTiming(open ? '180deg' : '0deg', { duration: duration }),
  )

  const onPress = () => {
    if (!isMultipleOpen) {
      setActiveAccordionId(activeAccordionId === id ? undefined : id)
    }
    setOpen(!open)
    LayoutAnimation.configureNext({
      duration: duration,
      create: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.opacity,
      },
    })
  }

  useEffect(() => {
    if (activeAccordionId === id && !open) {
      LayoutAnimation.configureNext({
        duration: duration,
        create: {
          type: LayoutAnimation.Types.easeIn,
          property: LayoutAnimation.Properties.opacity,
        },
      })
      setOpen(true)
    } else if (activeAccordionId !== id && open) {
      LayoutAnimation.configureNext({
        duration: duration,
        create: {
          type: LayoutAnimation.Types.easeOut,
          property: LayoutAnimation.Properties.opacity,
        },
      })
      setOpen(false)
    }
  }, [activeAccordionId])

  const myIcon = <Icon name={icon ? icon : 'down'} size={20} />

  return (
    <>
      <Pressable style={[styles.accordionContainer, titleContainerStyle]} onPress={onPress}>
        <Text style={[styles.accordionHeading, titleStyle]}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateIconValue }] }}>{myIcon}</Animated.View>
      </Pressable>

      {open && (
        <Animated.View>
          <View>{children}</View>
        </Animated.View>
      )}
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
