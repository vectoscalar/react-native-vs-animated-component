import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { LayoutAnimation, Platform, Pressable, Text, UIManager, View } from 'react-native'
import Animated, { useDerivedValue, withTiming } from 'react-native-reanimated'
import { DefaultStyle } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes'
import Icon from 'react-native-vector-icons/AntDesign'

import { styles } from './accordion-styles'

interface AccordionContextType {
  activeAccordionId: string
  duration: number
  setActiveAccordionId: (id: string) => void
  showSingleItemAtOnce: boolean
}

const AccordionContext = createContext<AccordionContextType>({
  activeAccordionId: '',
  duration: 300,
  setActiveAccordionId: (id: string) => {},
  showSingleItemAtOnce: false,
})

interface IAccordionItemProps {
  /** children: is a required prop which dictates the children of the accordion */
  children: JSX.Element
  /** icon: is an optional prop which dictates the name of the icon */
  icon?: string
  /** id: is a required prop which dictates the id of the accordion item */
  id: string
  /** isDefaultOpen: is an optional prop which dictates the default state of accordion */
  isDefaultOpen?: boolean
  /** titleContainerStyle: is an optional prop which defines the style of the accordion title container. */
  titleContainerStyle?: DefaultStyle
  /** titleStyle: is an optional prop which defines the style of the accordion title */
  titleStyle?: DefaultStyle
  /** title: is an optional prop which defines the title of the accordion */
  title: string
}

interface IAccordionProps {
  /** children: is a required prop which dictates the children of the accordion */
  children: React.ReactElement[]
  /** duration: is an optional prop which dictates the duration of accordion drop down animation */
  duration?: number
  /** showSingleItemAtOnce: is an optional prop which dictates if multiple accordion items can be open at the same time. */
  showSingleItemAtOnce?: boolean
}

const Item: FC<IAccordionItemProps> = props => {
  const {
    children,
    icon = 'down',
    id,
    isDefaultOpen = false,
    title,
    titleContainerStyle = {},
    titleStyle = {},
  } = props

  const { activeAccordionId, duration, setActiveAccordionId, showSingleItemAtOnce } =
    useContext(AccordionContext)

  const [isOpen, setIsOpen] = useState(
    showSingleItemAtOnce ? activeAccordionId === id : isDefaultOpen,
  )

  const rotateIconValue = useDerivedValue(() =>
    withTiming(isOpen ? '180deg' : '0deg', { duration }),
  )

  const accordionAnimationConfig = {
    duration,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.scaleY,
    },
    delete: {
      type: LayoutAnimation.Types.easeIn,
      property: LayoutAnimation.Properties.scaleY,
    },
  }

  const onPress = () => {
    if (showSingleItemAtOnce) {
      setActiveAccordionId(activeAccordionId === id ? '' : id)
    }
    setIsOpen(!isOpen)
    LayoutAnimation.configureNext(accordionAnimationConfig)
  }

  useLayoutEffect(() => {
    if (activeAccordionId !== id && isOpen) {
      LayoutAnimation.configureNext(accordionAnimationConfig)
      setIsOpen(false)
    }
  }, [activeAccordionId])

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }, [])

  return (
    <Animated.View>
      <Pressable style={[styles.accordionContainer, titleContainerStyle]} onPress={onPress}>
        <Text style={[styles.accordionHeading, titleStyle]}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateIconValue }] }}>
          <Icon name={icon} size={20} />
        </Animated.View>
      </Pressable>

      {isOpen && <View>{children}</View>}
    </Animated.View>
  )
}

const Accordion: FC<IAccordionProps> = props => {
  const { children, duration = 300, showSingleItemAtOnce = false } = props
  const [activeAccordionId, setActiveAccordionId] = useState('')

  const accordionContextValue = useMemo(() => {
    return { activeAccordionId, duration, setActiveAccordionId, showSingleItemAtOnce }
  }, [activeAccordionId, duration, showSingleItemAtOnce])

  return (
    <AccordionContext.Provider value={accordionContextValue}>
      <View>{children}</View>
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
