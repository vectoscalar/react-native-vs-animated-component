import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  FlatList,
  Modal,
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
  /** multiSelect: is an optional prop which dictates whether multiple selections is allowed or not. */
  multiSelect?: boolean
  /** onChange: is a required prop which dictates the function which will be called on clicking the options. */
  onChange: (newValue: ISelectOption[] | ISelectOption) => void
  /** options: is an required prop which dictates an array containing titles and values for options. */
  options: Array<ISelectOption>
  /** optionContainerStyle: is an optional prop which defines the styles of option container. */
  optionContainerStyle?: ViewStyle
  /** optionStyle: is an optional prop which defines the styles of options. */
  optionStyle?: ViewStyle
  /** placeholderText: is an optional prop which dictates the text of placeholder. */
  placeholderText?: string
  /** selectedOptionStyle: is an optional prop which defines the styles of selected option. */
  selectedOptionStyle?: ViewStyle
  /** selectContainerStyle: is an optional prop which defines the styles of select container. */
  selectContainerStyle?: ViewStyle | TextStyle
  /** selectedOptions: is a required prop which dictates the selected options. */
  selectedOptions: ISelectOption[] | ISelectOption
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
    selectContainerStyle,
    selectedOptions,
    multiSelect = false,
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [dropdownTop, setDropdownTop] = useState(0)
  const dropdownRef = useRef<View>(null)
  const [optionsContainerHeight, setOptionsContainerHeight] = useState(MIN_HEIGHT)

  const heightAnim = useRef(new Animated.Value(0)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const rotateArrow = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const handleOpenClosePress = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((fx, fy, width, height, px, py) => {
        setDropdownTop(py + height)
      })
    }
    setIsOpen(!isOpen)
  }

  const handleOptionPress = (item: ISelectOption) => () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      if (multiSelect && Array.isArray(selectedOptions)) {
        const isSelected = selectedOptions.some(option => option.value === item.value)
        const newSelectedOptions = isSelected
          ? selectedOptions.filter(option => option.value !== item.value)
          : [...selectedOptions, item]
        onChange(newSelectedOptions)
      } else {
        const isSelected = selectedOptions.value === item.value
        onChange(isSelected ? { title: '', value: '' } : item)
      }
    })
    if (!multiSelect) {
      setIsOpen(false)
    }
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
  }, [selectedOptions, fadeAnim])

  const renderOptions = useCallback(() => {
    return (
      <FlatList
        data={options}
        renderItem={({ item, index }) => {
          const isSelected = multiSelect
            ? Array.isArray(selectedOptions) &&
              selectedOptions.some(option => option.value === item.value)
            : selectedOptions.value === item.value
          const selectedStyle = isSelected ? [styles.selectedOption, selectedOptionStyle] : []

          return (
            <TouchableOpacity
              onLayout={event =>
                optionsContainerHeight === MIN_HEIGHT &&
                setOptionsContainerHeight(event.nativeEvent.layout.height * options.length)
              }
              activeOpacity={10}
              onPress={handleOptionPress(item)}>
              <View style={[styles.option, optionStyle]}>
                {isSelected ? (
                  <Icon name="check" style={styles.optionIcon} />
                ) : (
                  <View style={styles.emptyView} />
                )}
                <Text style={[styles.optionText, ...selectedStyle]} key={`${item.value}-${index}`}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    )
  }, [selectedOptions, options.length])

  const renderSelectedChips = () => {
    if (!multiSelect || !Array.isArray(selectedOptions)) return null

    const displayedChips = selectedOptions.slice(0, 2)
    const additionalChips = selectedOptions.length > 2 ? selectedOptions.length - 2 : 0

    return (
      <View style={styles.chipsContainer}>
        {displayedChips.map(option => (
          <View key={option.value} style={styles.chip}>
            <Text style={styles.chipText}>{option.title}</Text>
            <TouchableOpacity onPress={() => handleOptionPress(option)()}>
              <Icon name="cross" style={styles.chipIcon} />
            </TouchableOpacity>
          </View>
        ))}
        {additionalChips > 0 && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{`+${additionalChips} more`}</Text>
          </View>
        )}
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        ref={dropdownRef}
        activeOpacity={10}
        onPress={handleOpenClosePress}
        style={[styles.container, selectContainerStyle]}>
        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            opacity: fadeAnim,
          }}>
          {renderSelectedChips()}
          {!multiSelect && (
            <Text style={styles.selectText}>{selectedOptions.value || placeholderText}</Text>
          )}
        </Animated.View>
        <Animated.View style={{ transform: [{ rotate: rotateArrow }] }}>
          <Icon name="chevron-down" size={20} />
        </Animated.View>
      </TouchableOpacity>
      {isOpen && (
        <Modal
          transparent
          animationType="none"
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setIsOpen(false)}>
            <View
              style={[
                styles.modalContent,
                { top: dropdownTop, maxHeight: options.length > 4 ? '55%' : '100%' },
                optionContainerStyle,
              ]}>
              {renderOptions()}
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  )
}

export default Select
