/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'
import { Button, SafeAreaView, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { CrossIcon, RightArrowIcon, TickIcon } from '@assets'
import {
  IconTransitionButton,
  Modal,
  ProgressButton,
  SelectDemo,
  Slider,
  SpringButton,
  SwipeButton,
  TriDotLoader,
} from '@components'
import { ModalPreset, RemixIcons, TriDotLoaderPreset } from '@constants'

import AccordionDemo from './src/components/accordion/AccordionDemo'
import type { ISelectOption } from './src/components/select/Select'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [select, setSelect] = useState<ISelectOption>({ title: '', value: '' })
  const [fadeInVisible, setFadeInVisible] = useState(false)
  const [slideInVisible, setSlideInVisible] = useState(false)
  const [scaleVisible, setScaleVisible] = useState(false)
  const [slideInLeftVisible, setSlideInLeftVisible] = useState(false)
  const [minValue, setMinValue] = useState(1)
  const [maxValue, setMaxValue] = useState(100)

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
      <TriDotLoader loaderPreset={TriDotLoaderPreset.Large} />
      <SelectDemo />
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

      <Slider.SingleValue setValue={setMinValue} />
      <Slider.SingleValue
        setValue={setMinValue}
        thumbIcon={<Icon name="hive" size={35} color="black" />}
        activeTrackStyle={{ backgroundColor: 'red' }}
        inactiveTrackStyle={{ backgroundColor: 'plum' }}
      />
      <Slider.Range setMinValue={setMinValue} setMaxValue={setMaxValue} />
      <Slider.Range
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        thumbIcon={<Icon name="hive" size={35} color="black" />}
        activeTrackStyle={{ backgroundColor: 'red' }}
        inactiveTrackStyle={{ backgroundColor: 'plum' }}
      />
      <AccordionDemo />

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
    </SafeAreaView>
  )
}
export default App
