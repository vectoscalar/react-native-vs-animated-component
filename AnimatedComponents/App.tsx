import React, { useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { ProgressButton, Select, SpringButton } from 'animated-tests-8-npm-public'

const App = () => {
  const [selectedOption, setSelectedOption] = useState({ title: '', value: '' })
  const [isloading, setIsloading] = useState(false)
  console.log(selectedOption)
  return (
    <SafeAreaView>
      <Text>App</Text>
      <Icon name="arrow-back" size={40} />
      <Select
        onChange={setSelectedOption}
        options={[{ title: 'aman', value: 'hello' }]}
        selectedOption={selectedOption}
      />
      <SpringButton label="test" onPress={() => {}} />
      <ProgressButton
        label="loading"
        onPress={() => {
          setIsloading(true)
        }}
        isLoading={isloading}
      />
    </SafeAreaView>
  )
}

export default App
