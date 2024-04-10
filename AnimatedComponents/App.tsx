import React from 'react'
import { SafeAreaView } from 'react-native'

import SpringButton from './src/components/buttons/spring-button/SpringButton'
import Select from './src/components/select/Select'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SpringButton />
      <Select
        onChange={() => {}}
        options={[{ title: 'Pranjul', value: 'pranjul' }]}
        value="Pranjul"
      />
    </SafeAreaView>
  )
}

export default App
