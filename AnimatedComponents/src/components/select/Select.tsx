import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  FlatList,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import styles from './select-styles'

export interface ISelectOption {
  title: string
  value: string
}

interface ISelectProps {
  onChange: (newValue: ISelectOption) => void
  optionContainerStyle?: ViewStyle
  options: Array<ISelectOption>
  optionStyle?: ViewStyle
  placeholderText?: string
  selectedOptionStyle?: ViewStyle
  style?: ViewStyle | TextStyle
  selectedOption: ISelectOption
}
const MIN_HEIGHT = 10

const DEFAULT_SELECTED_OPTION: ISelectOption = { title: '', value: '' }

const Select = (props: ISelectProps) => {
  const {
    onChange,
    optionContainerStyle,
    options,
    optionStyle,
    placeholderText,
    selectedOptionStyle,
    style,
    selectedOption,
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [selectedHeight, setSelectedHeight] = useState(0)
  const [optionsContainerHeight, setOptionsContainerHeight] = useState(10)

  const heightAnim = useRef(new Animated.Value(0)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const { value } = selectedOption

  const rotateArrow = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const handleOpenClosePress = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionPress = (item: ISelectOption) => () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      const isSelected = item.value === value
      onChange(isSelected ? DEFAULT_SELECTED_OPTION : item)
    })
    setIsOpen(false)
  }

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isOpen ? optionsContainerHeight : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isOpen, heightAnim])

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isOpen, rotateAnim])

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [value, fadeAnim])

  const renderOptions = useCallback(() => {
    return (
      <FlatList
        data={options}
        renderItem={({ item, index }) => {
          const isSelected = item.value === value
          const selectedStyle = isSelected ? [styles.selectedOption, selectedOptionStyle] : []

          return (
            <TouchableOpacity
              onLayout={event =>
                optionsContainerHeight === MIN_HEIGHT &&
                setOptionsContainerHeight(event.nativeEvent.layout.height * options.length)
              }
              activeOpacity={10}
              onPress={handleOptionPress(item)}>
              <Text
                style={[styles.option, styles.optionText, optionStyle, ...selectedStyle]}
                key={`${item.value}-${index}`}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    )
  }, [value, options.length])

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={10}
        onLayout={event => setSelectedHeight(event.nativeEvent.layout.height)}
        onPress={handleOpenClosePress}
        style={[styles.container, style]}>
        <Animated.Text style={[styles.selectText, { opacity: fadeAnim }]}>
          {value || placeholderText}
        </Animated.Text>
        <Animated.View style={{ transform: [{ rotate: rotateArrow }] }}>
          <Icon name="chevron-down" size={20} />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.optionsContainer,
          optionContainerStyle,
          { top: selectedHeight, height: heightAnim, maxHeight: 200 },
        ]}>
        {renderOptions()}
      </Animated.View>
    </View>
  )
}

export default Select
