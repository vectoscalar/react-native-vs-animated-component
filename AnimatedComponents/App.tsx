/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

import { FileIcon, FolderIcon, PenIcon } from '@assets'
import {
  Accordion,
  FloatingButton,
  IconTransitionDemo,
  ProgressButton,
  Select,
  SelectDemo,
  Slider,
  SpringButton,
  SwipeButton,
  TriDotLoader,
} from '@components'
import { FloatingButtonPreset, RemixIcons, SliderType, TriDotLoaderPreset } from '@constants'
import { Sizes, palette } from '@theme'

import AccordionDemo from './src/components/accordion/AccordionDemo'
import type { ISelectOption } from './src/components/select/Select'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
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

  const icons = [
    {
      icon: FileIcon,
      onPress: () => Alert.alert('File Icon Pressed'),
      iconName: 'File',
    },
    {
      icon: FolderIcon,
      onPress: () => Alert.alert('Folder Icon Pressed'),
      iconName: 'Folder',
    },
    {
      icon: PenIcon,
      onPress: () => Alert.alert('Pen Icon Pressed'),
      iconName: 'Pen',
    },
    {
      icon: PenIcon,
      onPress: () => Alert.alert('Pen Icon Pressed'),
      iconName: 'Pencil',
    },
  ]

  const gradientWaveColor = useMemo(() => ['#1A63C5', '#1A63C5'], [])
  const thumbColors = useMemo(() => ['#1A63C5', '#1A63C5'], [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        <Text style={styles.title}>Accordion</Text>
        <AccordionDemo />
        {/* <View style={styles.accordionContainer}></View> */}
      </ScrollView>
      <FloatingButton buttonType={FloatingButtonPreset.CircularFloatingButton} icons={icons} />
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
  accordionContainer: {
    alignItems: 'center',
    borderBottomWidth: Sizes.Size_0_5,
    borderBottomColor: palette.black,
    display: 'flex',
    flex: Sizes.Size_1,
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
