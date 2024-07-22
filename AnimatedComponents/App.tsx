/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

import {
  IconTransitionDemo,
  Modal,
  ProgressButton,
  SelectDemo,
  Slider,
  SpringButton,
  SwipeButton,
  TriDotLoader,
} from '@components'
import { ModalPreset, RemixIcons, SliderType, TriDotLoaderPreset } from '@constants'
import { Sizes, palette } from '@theme'

import AccordionDemo from './src/components/accordion/AccordionDemo'
import SearchBarDemo from './src/components/search-bar/SearchBarDemo'
import type { ISelectOption } from './src/components/select/Select'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [select, setSelect] = useState<ISelectOption>({ title: '', value: '' })
  const [fadeInVisible, setFadeInVisible] = useState(false)
  const [slideInVisible, setSlideInVisible] = useState(false)
  const [scaleVisible, setScaleVisible] = useState(false)
  const [slideInLeftVisible, setSlideInLeftVisible] = useState(false)
  const onPress = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }
  const onSpringPress = () => {}
  const handleSubmitBtnPress = () => {
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.childrenContainer}>
          <Text style={styles.title}>Search Bar</Text>
          <SearchBarDemo />
        </View>
        <View style={styles.childrenContainer}>
          <Text style={styles.title}>Spring Button</Text>
          <SpringButton label="Press me" onPress={onSpringPress} />
        </View>
        <View style={styles.childrenContainer}>
          <Text style={styles.title}>TriDotLoader</Text>
          <TriDotLoader loaderPreset={TriDotLoaderPreset.Large} />
        </View>
        <View style={styles.childrenContainer}>
          <Text style={styles.title}>Select Box</Text>
          <SelectDemo />
        </View>
        <View style={styles.childrenContainer}>
          <Text style={styles.title}>Progress Button</Text>
          <ProgressButton
            isLoading={isLoading}
            onPress={onPress}
            label="Submit"
            buttonContainerStyle={{
              marginVertical: 20,
            }}
          />
        </View>
        <View style={styles.childrenContainer}>
          <Text style={styles.title}>Icon Transition Button</Text>
          <IconTransitionDemo />
        </View>
        <View style={styles.childrenContainer}>
          <Text style={styles.title}>Swipe Button</Text>
          <SwipeButton
            buttonInitialText="Swipe To left"
            gradientWaveColor={gradientWaveColor}
            onSwipeComplete={handleSubmitBtnPress}
            onTaskComplete={handleSubmitBtnPress}
            taskStatusData={taskStatusData}
            thumbColors={thumbColors}
          />
        </View>

        <AccordionDemo />

        <View style={styles.childrenContainer}>
          <Text style={styles.title}>Slider</Text>
          <Slider
            type={SliderType.SingleValueSlider}
            sliderWidth={300}
            min={0}
            max={100}
            step={5}
          />
        </View>
        <View style={styles.childrenContainer}>
          <Text style={styles.title}>Modals</Text>
          <View>
            <Button title="Show Fade in Modal" onPress={() => setFadeInVisible(true)} />
            <Button title="Show Slide in Modal" onPress={() => setSlideInVisible(true)} />
            <Button title="Show Scale Modal" onPress={() => setScaleVisible(true)} />
            <Button title="Show Slide in Left Modal" onPress={() => setSlideInLeftVisible(true)} />
            <Modal
              isOpen={fadeInVisible}
              onClose={() => setFadeInVisible(false)}
              animationType={ModalPreset.FadeIn}>
              <Text>This is a fade-in modal</Text>
            </Modal>
            <Modal
              isOpen={slideInVisible}
              onClose={() => setSlideInVisible(false)}
              animationType={ModalPreset.SlideIn}>
              <Text>This is a slide-in modal</Text>
            </Modal>
            <Modal
              isOpen={scaleVisible}
              onClose={() => setScaleVisible(false)}
              animationType={ModalPreset.Scale}>
              <Text>This is a scale modal</Text>
            </Modal>
            <Modal
              isOpen={slideInLeftVisible}
              onClose={() => setSlideInLeftVisible(false)}
              animationType={ModalPreset.SlideInLeft}>
              <Text>This is a slide-in left modal</Text>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default App

const styles = StyleSheet.create({
  childrenContainer: {
    alignItems: 'center',
    borderBottomWidth: Sizes.Size_0_5,
    borderBottomColor: palette.black,
    display: 'flex',
    flexDirection: 'column',
    gap: Sizes.Size_10,
    marginBottom: Sizes.Size_16,
    paddingBottom: Sizes.Size_16,
  },

  title: {
    color: palette.black,
    fontSize: Sizes.Size_20,
    textAlign: 'center',
  },

  container: {
    backgroundColor: palette.neutral[0],
    flex: Sizes.Size_1,
    padding: Sizes.Size_10,
  },
})
