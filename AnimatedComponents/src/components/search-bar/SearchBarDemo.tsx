import React, { useState } from 'react'

import SearchBar from './SearchBar'

const SearchBarDemo = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <SearchBar
      inputContainerStyle={{ color: 'white', width: '90%' }}
      searchValue={searchValue}
      handleInputChange={setSearchValue}
    />
  )
}

export default SearchBarDemo
