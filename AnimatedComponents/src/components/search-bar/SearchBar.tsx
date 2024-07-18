import React, { useState } from 'react'
import { Dimensions, LayoutChangeEvent, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { DefaultStyle } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes'
import Icon from 'react-native-vector-icons/AntDesign'

import { styles } from './searchBar-styles'

interface ISearchBarProps {
  /** CloseIcon: is an optional prop which holds the icon to be displayed to close the search bar */
  CloseIcon?: React.ReactNode
  /** duration: is an optional prop which indicates the duration of animation */
  duration?: number
  /** iconColorCollapsed: is an optional prop which indicates the color of the icon when search bar is collapsed */
  iconColorCollapsed?: string
  /** iconColorExpanded: is an optional prop which indicates the color of the icon when search bar is expanded */
  iconColorExpanded?: string
  /** iconSize: is an optional prop which indicates the size of the icon */
  iconSize?: number
  /** iconStyle: is an optional prop which holds the style of the search icon */
  iconStyle?: DefaultStyle
  /** inputContainerStyle: is an optional prop which holds the style of the input container */
  inputContainerStyle?: DefaultStyle
  /** handleInputChange: is a prop which handles the input change */
  handleInputChange: (text: string) => void
  /** placeholderText: is an optional prop which holds the placeholder text */
  placeholderText?: string
  /** searchBarContainerStyle: is an optional prop which holds the style of the search bar */
  searchBarContainerStyle?: DefaultStyle
  /** SearchIcon: is an optional prop which holds the icon to be displayed */
  SearchIcon?: React.ReactNode
  /** searchValue: is a prop which holds the value of the search bar */
  searchValue: string
  /** wrapperContainerStyle: is an optional prop which holds the style of the main container which wraps the search bar */
  wrapperContainerStyle?: DefaultStyle
}

const SearchBar = (props: ISearchBarProps) => {
  const {
    CloseIcon = null,
    duration = 300,
    SearchIcon = null,
    iconColorCollapsed = 'black',
    iconColorExpanded = 'white',
    iconSize = 20,
    iconStyle = {},
    inputContainerStyle = {},
    searchBarContainerStyle = {},
    wrapperContainerStyle = {},
    handleInputChange,
    placeholderText = 'Search here ...',
    searchValue,
  } = props

  const { width } = Dimensions.get('window')
  const [showInput, setShowInput] = useState(false)
  const translateX = useSharedValue(width)
  const [searchBarEnd, setSearchBarEnd] = useState(width)
  const [searchBarStart, setSearchBarStart] = useState(width)
  const showSearchIcon = useSharedValue(1)

  const handlePress = () => {
    const isTextboxVisible = !showInput
    setShowInput(isTextboxVisible)

    translateX.value = withTiming(isTextboxVisible ? searchBarStart : searchBarEnd, {
      duration,
      easing: Easing.ease,
    })

    showSearchIcon.value = withTiming(showSearchIcon.value === 1 ? 0 : 1, {
      duration,
      easing: Easing.ease,
    })
  }

  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const searchIconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(showSearchIcon.value, [0, 1], [0, 1]),
    }
  })

  const getContainerLayout = (event: LayoutChangeEvent) => {
    const { x, width: containerWidth } = event.nativeEvent.layout
    setSearchBarEnd(x + containerWidth)
    setSearchBarStart(x)
    translateX.value = x + containerWidth
  }

  return (
    <View style={[styles.container, wrapperContainerStyle]} onLayout={getContainerLayout}>
      <Animated.View
        style={[styles.searchBarContainer, searchBarAnimatedStyle, searchBarContainerStyle]}>
        <TextInput
          onChangeText={handleInputChange}
          placeholder={placeholderText}
          style={[inputContainerStyle]}
          value={searchValue}
        />
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.searchIconContainer,
            { backgroundColor: showInput ? iconColorCollapsed : iconColorExpanded },
            iconStyle,
          ]}>
          {CloseIcon ?? (
            <Icon
              name="close"
              size={iconSize}
              color={showInput ? iconColorExpanded : iconColorCollapsed}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[searchIconAnimatedStyle]}>
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.searchIconContainer, { backgroundColor: '#016FC3' }, iconStyle]}>
          {SearchIcon ?? (
            <Icon
              name="search1"
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
