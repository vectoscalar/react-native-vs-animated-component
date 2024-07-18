import React, { useState } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

import SearchBar from './SearchBar'

const SearchBarDemo = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <View
      style={{
        marginTop: 22,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 5,
      }}>
      <Icon name="apple1" color="#016FC3" size={50} />
      <SearchBar searchValue={searchValue} handleInputChange={setSearchValue} />
    </View>
  )
}

export default SearchBarDemo
