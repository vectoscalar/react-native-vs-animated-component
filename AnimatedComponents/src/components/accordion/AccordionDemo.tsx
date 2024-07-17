import React from 'react'
import { Text, View } from 'react-native'

import { Accordion } from '@components'

const AccordionDemo = () => {
  return (
    <Accordion showSingleItemAtOnce>
      <Accordion.Item key="1" id="1" title="FAQ">
        <View style={{ padding: 20, backgroundColor: '#016FC3' }}>
          <Text style={{ color: 'white', fontFamily: 'Robot-Medium', letterSpacing: 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia nostrum libero
            similique iste cumque, perspiciatis quasi exercitationem, suscipit voluptatum autem,
            fuga maiores? Saepe, vitae perspiciatis. Cumque consequatur facilis incidunt.
          </Text>
        </View>
      </Accordion.Item>
      <Accordion.Item key="2" id="2" title="FAQ">
        <View style={{ padding: 20, backgroundColor: '#016FC3' }}>
          <Text style={{ color: 'white', fontFamily: 'Robot-Medium', letterSpacing: 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia nostrum libero
            similique iste cumque, perspiciatis quasi exercitationem, suscipit voluptatum autem,
            fuga maiores? Saepe, vitae perspiciatis. Cumque consequatur facilis incidunt.
          </Text>
        </View>
      </Accordion.Item>
      <Accordion.Item key="3" id="3" title="FAQ">
        <View style={{ padding: 20, backgroundColor: '#016FC3' }}>
          <Text style={{ color: 'white', fontFamily: 'Robot-Medium', letterSpacing: 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia nostrum libero
            similique iste cumque, perspiciatis quasi exercitationem, suscipit voluptatum autem,
            fuga maiores? Saepe, vitae perspiciatis. Cumque consequatur facilis incidunt.
          </Text>
        </View>
      </Accordion.Item>
    </Accordion>
  )
}

export default AccordionDemo
