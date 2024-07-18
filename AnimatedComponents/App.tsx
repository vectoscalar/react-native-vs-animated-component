/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'
import { Platform, SafeAreaView, ScrollView, Text, UIManager, View } from 'react-native'

import { CrossIcon, RightArrowIcon, TickIcon } from '@assets'
import {
  Accordion,
  IconTransitionButton,
  ProgressButton,
  Select,
  Slider,
  SpringButton,
  SwipeButton,
  TriDotLoader,
} from '@components'
import { RemixIcons, SliderType, TriDotLoaderPreset } from '@constants'

import AccordionDemo from './src/components/accordion/AccordionDemo'
import type { ISelectOption } from './src/components/select/Select'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [select, setSelect] = useState<ISelectOption>({ title: '', value: '' })
  const onPress = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }

  const onSpringPress = () => {}

  const handleSubmitBtnPress = () => {
    try {
      return true
    } catch {
      return false
    }
  }

  const onIconTransition = () => {
    try {
      return false
    } catch {
      return false
    }
  }

  const taskStatusData = useMemo(
    () => ({
      fail: {
        text: 'Failed',
        icon: RemixIcons.FILLED_CLOSE_CIRCLE,
        iconColor: 'white',
        waveColor: ['#D54D49', '#D54D49'],
      },
      success: {
        text: 'Successfully',
        icon: RemixIcons.CHECKBOX_CIRCLE_FILLED,
        iconColor: 'white',
        waveColor: ['#59B359', '#59B359'],
      },
    }),
    [],
  )

  const gradientWaveColor = useMemo(() => ['#1A63C5', '#1A63C5'], [])
  const thumbColors = useMemo(() => ['#1A63C5', '#1A63C5'], [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SpringButton label="Press me" onPress={onSpringPress} />
      {/* <TriDotLoader loaderPreset={TriDotLoaderPreset.Large} /> */}
      <Select
        onChange={setSelect}
        options={[
          { title: 'Test 1', value: 'test1' },
          { title: 'Test 2', value: 'test2' },
          { title: 'Test 3', value: 'test3' },

          { title: 'Test 4', value: 'test4' },
        ]}
        selectedOption={select}
        placeholderText="Enter Value"
        optionContainerStyle={{ zIndex: 1000 }}
      />

      <ProgressButton
        isLoading={isLoading}
        onPress={onPress}
        label="Submit"
        buttonContainerStyle={{
          marginVertical: 20,
        }}
      />

      <SwipeButton
        buttonInitialText="Swipe To left"
        gradientWaveColor={gradientWaveColor}
        onSwipeComplete={handleSubmitBtnPress}
        onTaskComplete={handleSubmitBtnPress}
        taskStatusData={taskStatusData}
        thumbColors={thumbColors}
      />

      <IconTransitionButton
        onPress={onIconTransition}
        startIcon={<RightArrowIcon />}
        failedIcon={<CrossIcon />}
        successIcon={<TickIcon />}
      />

      <AccordionDemo />

      <Slider type={SliderType.SingleValueSlider} sliderWidth={300} min={0} max={100} step={5} />
    </SafeAreaView>
  )
}

export default App
