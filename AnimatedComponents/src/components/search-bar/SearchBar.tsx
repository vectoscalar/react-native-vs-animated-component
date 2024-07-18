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
  /** closeIconBackgroundColor: is an optional prop which indicates the color of the close icon background */
  closeIconBackgroundColor?: string
  /** closeIconColor: is an optional prop which indicates the color of the close icon */
  closeIconColor?: string
  /** CloseIcon: is an optional prop which holds the icon to be displayed to close the search bar */
  CloseIcon?: React.ReactNode
  /** duration: is an optional prop which indicates the duration of animation */
  duration?: number
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
  /** placeholderTextColor: is an optional prop which holds the placeholder text color */
  placeholderTextColor?: string
  /** searchBarContainerStyle: is an optional prop which holds the style of the search bar */
  searchBarContainerStyle?: DefaultStyle
  /** SearchIcon: is an optional prop which holds the icon to be displayed */
  SearchIcon?: React.ReactNode
  /** searchIconBackgroundColor: is an optional prop which indicates the color of the search icon background */
  searchIconBackgroundColor?: string
  /** searchIconColor: is an optional prop which indicates the color of the search icon */
  searchIconColor?: string
  /** searchValue: is a prop which holds the value of the search bar */
  searchValue: string
  /** wrapperContainerStyle: is an optional prop which holds the style of the main container which wraps the search bar */
  wrapperContainerStyle?: DefaultStyle
}

const SearchBar = (props: ISearchBarProps) => {
  const {
    closeIconBackgroundColor = 'black',
    closeIconColor = 'white',
    CloseIcon,
    duration = 200,
    SearchIcon,
    iconSize = 20,
    iconStyle = {},
    inputContainerStyle = {},
    searchBarContainerStyle = {},
    wrapperContainerStyle = {},
    handleInputChange,
    placeholderTextColor = 'white',
    placeholderText = 'Search here ...',
    searchIconBackgroundColor = '#016FC3',
    searchIconColor = 'white',
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
      opacity: interpolate(showSearchIcon.value, [0, 1], [1, 0]),
      transform: [{ translateX: translateX.value }],
    }
  })

  const searchIconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(showSearchIcon.value, [0, 1], [0, 1]),
    }
  })

  const closeIconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(showSearchIcon.value, [0, 1], [1, 0]),
    }
  })

  const getContainerLayout = (event: LayoutChangeEvent) => {
    const { x, width: containerWidth } = event.nativeEvent.layout
    setSearchBarEnd(x + containerWidth)
    setSearchBarStart(x)
  }

  const getSearchIconLayout = (event: LayoutChangeEvent) => {
    const { width: iconWidth } = event.nativeEvent.layout
    setSearchBarEnd(searchBarEnd - iconWidth)
    translateX.value -= iconWidth
  }

  return (
    <View style={[styles.container, wrapperContainerStyle]} onLayout={getContainerLayout}>
      <Animated.View
        style={[styles.searchBarContainer, searchBarAnimatedStyle, searchBarContainerStyle]}>
        <TextInput
          onChangeText={handleInputChange}
          placeholder={placeholderText}
          placeholderTextColor={placeholderTextColor}
          style={[inputContainerStyle]}
          value={searchValue}
        />
        <Animated.View style={[closeIconAnimatedStyle]}>
          <TouchableOpacity
            onPress={handlePress}
            style={[
              styles.searchIconContainer,
              { backgroundColor: closeIconBackgroundColor },
              iconStyle,
            ]}>
            {CloseIcon ?? <Icon name="close" size={iconSize} color={closeIconColor} />}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      <Animated.View style={[searchIconAnimatedStyle]} onLayout={getSearchIconLayout}>
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.searchIconContainer,
            { backgroundColor: searchIconBackgroundColor },
            iconStyle,
          ]}>
          {SearchIcon ?? <Icon name="search1" size={iconSize} color={searchIconColor} />}
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default SearchBar
