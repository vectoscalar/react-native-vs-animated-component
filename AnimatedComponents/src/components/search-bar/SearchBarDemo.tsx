import React, { useState } from 'react'
import { Text, View } from 'react-native'

import SearchBar from './SearchBar'

const SearchBarDemo = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#016FC3' }}>
        Search Bar
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          gap: 20,
        }}>
        <Text style={{ fontSize: 40, fontWeight: '700', color: '#016FC3' }}>VS</Text>
        <SearchBar
          inputContainerStyle={{ color: 'white', width: '90%' }}
          searchValue={searchValue}
          handleInputChange={setSearchValue}
        />
      </View>
    </View>
  )
}

export default SearchBarDemo
