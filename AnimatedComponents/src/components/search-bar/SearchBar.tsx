import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/AntDesign'

const SearchBar = () => {
  const searchAnimation = useSharedValue(0)
  const [showInput, setShowInput] = useState(false)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width:
        searchAnimation.value === 1
          ? withTiming(300, { duration: 300 })
          : withTiming(50, { duration: 200 }),
      borderRadius: searchAnimation.value === 1 ? 20 : 50,
      height: 50,
    }
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
      }}>
      <Animated.View
        style={[
          {
            height: 'auto',
            backgroundColor: 'black',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyle,
        ]}>
        {showInput && (
          <TextInput
            style={{ width: '85%', color: 'white' }}
            placeholder="Search Here..."
            placeholderTextColor={'white'}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            if (searchAnimation.value === 1) {
              searchAnimation.value = 0
              setShowInput(false)
            } else {
              searchAnimation.value = 1
              setShowInput(true)
            }
          }}>
          <Icon name={'search1'} size={20} color={'white'} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default SearchBar
