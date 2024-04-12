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

interface ISelectProps {
  onChange: (newValue: string) => void
  optionContainerStyle?: ViewStyle
  options: Array<{ title: string; value: string }>
  optionStyle?: ViewStyle
  placeholderText?: string
  selectedOptionStyle?: ViewStyle
  style?: ViewStyle | TextStyle
  value: string
}
const MIN_HEIGHT = 10

const Select = (props: ISelectProps) => {
  const {
    onChange,
    optionContainerStyle,
    options,
    optionStyle,
    placeholderText,
    selectedOptionStyle,
    style,
    value,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [selectedHeight, setSelectedHeight] = useState(0)
  const [optionsContainerHeight, setOptionsContainerHeight] = useState(10)

  const heightAnim = useRef(new Animated.Value(0)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const rotateArrow = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const handleOpenClosePress = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionPress = (item: string) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start(() => onChange(item))
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
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start()
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
              onPress={() => handleOptionPress(item.value)}>
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
