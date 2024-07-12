/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'

import { Accordion } from '@components'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#91DDCF', gap: 10 }}>
      <Accordion title="Lorem ipsum dolor">
        <View style={{ padding: 20, backgroundColor: '#E8C5E5' }}>
          <Text style={{ fontFamily: 'Robot-Medium', letterSpacing: 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia nostrum libero
            similique iste cumque, perspiciatis quasi exercitationem, suscipit voluptatum autem,
            fuga maiores? Saepe, vitae perspiciatis. Cumque consequatur facilis incidunt.
          </Text>
        </View>
      </Accordion>
      <Accordion title="FAQ">
        <View style={{ padding: 20, backgroundColor: '#E8C5E5' }}>
          <Text style={{ fontFamily: 'Robot-Medium', letterSpacing: 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia nostrum libero
            similique iste cumque, perspiciatis quasi exercitationem, suscipit voluptatum autem,
            fuga maiores? Saepe, vitae perspiciatis. Cumque consequatur facilis incidunt.
          </Text>
        </View>
      </Accordion>
    </SafeAreaView>
  )
}

export default App
