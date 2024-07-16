import React, { useRef, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { DefaultStyle } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes'
import Icon from 'react-native-vector-icons/AntDesign'

import { styles } from './searchBar-styles'

interface ISearchBarProps {
  /** duration: is an optional prop which dictates the duration of animation */
  duration?: number
  /** icon: is an optional prop which dictates the icon to be displayed */
  icon?: React.ReactNode
  /** iconColorCollapsed: is an optional prop which dictates the color of the icon when search bar is collapsed */
  iconColorCollapsed?: string
  /** iconColorExpanded: is an optional prop which dictates the color of the icon when search bar is expanded */
  iconColorExpanded?: string
  /** iconSize: is an optional prop which dictates the size of the icon */
  iconSize?: number
  /** iconStyle: is an optional prop which dictates the style of the search icon */
  iconStyle?: DefaultStyle
  /** inputContainerStyle: is an optional prop which dictates the style of the input container */
  inputContainerStyle?: DefaultStyle
  /** onInputChange: is a prop which handles the input change */
  onInputChange: (text: string) => void
  /** placeholderText: is an optional prop which dictates the placeholder text */
  placeholderText?: string
  /** searchBarContainer: is an optional prop which dictates the style of the search bar */
  searchBarContainer?: DefaultStyle
  /** searchValue: is a prop which dictates the value of the search bar */
  searchValue: string
  /** wrapperContainerStyle: is an optional prop which dictates the style of the main container which wraps the search bar */
  wrapperContainerStyle?: DefaultStyle
}

const SearchBar = (props: ISearchBarProps) => {
  const {
    duration = 300,
    icon = null,
    iconColorCollapsed = 'black',
    iconColorExpanded = 'white',
    iconSize = 20,
    iconStyle = {},
    inputContainerStyle = {},
    searchBarContainer = {},
    wrapperContainerStyle = {},
    onInputChange,
    placeholderText = 'Search here ...',
    searchValue,
  } = props

  const [showInput, setShowInput] = useState(false)
  const width = useSharedValue(50)
  const containerWidth = useRef(0)

  const handlePress = () => {
    const newShowInput = !showInput
    setShowInput(newShowInput)

    width.value = withTiming(newShowInput ? containerWidth.current * 1 : 50, {
      duration: duration,
      easing: Easing.ease,
    })
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    }
  })

  const enteringAnimation = FadeIn.duration(duration).easing(Easing.ease)
  const exitingAnimation = FadeOut.duration(duration / 2).easing(Easing.ease)

  return (
    <View
      style={[styles.container, wrapperContainerStyle]}
      onLayout={event => {
        containerWidth.current = event.nativeEvent.layout.width
      }}>
      <Animated.View style={[styles.searchBarContainer, animatedStyle, searchBarContainer]}>
        {showInput && (
          <Animated.View
            entering={enteringAnimation}
            exiting={exitingAnimation}
            style={[styles.searchBarTextContainer, inputContainerStyle]}>
            <TextInput
              placeholder={placeholderText}
              value={searchValue}
              onChangeText={onInputChange}
            />
          </Animated.View>
        )}
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.searchIconContainer,
            { backgroundColor: showInput ? iconColorCollapsed : iconColorExpanded },
            iconStyle,
          ]}>
          {icon ? (
            icon
          ) : (
            <Icon
              name={'search1'}
              size={iconSize}
              color={showInput ? iconColorExpanded : iconColorCollapsed}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default SearchBar
