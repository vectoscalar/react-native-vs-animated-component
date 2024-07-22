import React, { useRef } from 'react'
import { Dimensions, LayoutChangeEvent, Pressable, TextInput, View } from 'react-native'
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
  /** iconSize: is an optional prop which indicates the size of the icon */
  iconSize?: number
  /** iconStyle: is an optional prop which holds the style of the search icon */
  iconStyle?: DefaultStyle
  /** inputContainerStyle: is an optional prop which holds the style of the input container */
  inputContainerStyle?: DefaultStyle
  /** handleInputChange: is a prop which handles the input change */
  handleInputChange: (text: string) => void
  /** height: is an optional prop which indicates the height of the search bar */
  height?: number
  /** iconBackgroundColor: is an optional prop which indicates the color of the icon background */
  iconBackgroundColor?: string
  /** iconColor: is an optional prop which indicates the color of the icon */
  iconColor?: string
  /** placeholderText: is an optional prop which holds the placeholder text */
  placeholderText?: string
  /** placeholderTextColor: is an optional prop which holds the placeholder text color */
  placeholderTextColor?: string
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
    CloseIcon,
    SearchIcon,
    duration = 400,
    handleInputChange,
    height = 50,
    iconBackgroundColor = '#016FC3',
    iconColor = 'white',
    iconSize = 20,
    iconStyle = {},
    inputContainerStyle = {},
    placeholderText = 'Search here ...',
    placeholderTextColor = 'white',
    searchBarContainerStyle = {},
    searchValue,
    wrapperContainerStyle = {},
  } = props

  const { width } = Dimensions.get('window')
  const showInput = useRef(false)
  const translateX = useSharedValue(width)
  const searchBarEnd = useRef(width)
  const searchBarStart = useRef(width)
  const showSearchIcon = useSharedValue(1)

  const handlePress = () => {
    const isTextboxVisible = !showInput.current
    showInput.current = isTextboxVisible

    translateX.value = withTiming(
      isTextboxVisible ? searchBarStart.current : searchBarEnd.current,
      {
        duration,
        easing: Easing.ease,
      },
    )

    showSearchIcon.value = withTiming(showSearchIcon.value === 1 ? 0 : 1, {
      duration: duration * 0.8,
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
      opacity: showSearchIcon.value,
    }
  })

  const closeIconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(showSearchIcon.value, [0, 1], [1, 0]),
    }
  })

  const getContainerLayout = (event: LayoutChangeEvent) => {
    const { width: containerWidth } = event.nativeEvent.layout
    searchBarEnd.current = containerWidth - height
    searchBarStart.current = 0
    translateX.value = containerWidth - height
  }

  const renderIconComponent = () => {
    return (
      <>
        <Animated.View style={[styles.iconStyle, searchIconAnimatedStyle]}>
          {SearchIcon ?? <Icon name="search1" size={iconSize} color={iconColor} />}
        </Animated.View>
        <Animated.View style={[styles.iconStyle, closeIconAnimatedStyle]}>
          {CloseIcon ?? <Icon name="close" size={iconSize} color={iconColor} />}
        </Animated.View>
      </>
    )
  }

  return (
    <View
      style={[styles.container, wrapperContainerStyle, { height }]}
      onLayout={getContainerLayout}>
      <Animated.View
        style={[
          styles.searchBarContainer,
          searchBarAnimatedStyle,
          searchBarContainerStyle,
          { height },
        ]}>
        <TextInput
          onChangeText={handleInputChange}
          placeholder={placeholderText}
          placeholderTextColor={placeholderTextColor}
          style={[inputContainerStyle]}
          value={searchValue}
        />
      </Animated.View>
      <Pressable
        onPress={handlePress}
        style={[
          styles.searchIconContainer,
          iconStyle,
          { backgroundColor: iconBackgroundColor },
          { height, width: height },
        ]}>
        {renderIconComponent()}
      </Pressable>
    </View>
  )
}

export default SearchBar
