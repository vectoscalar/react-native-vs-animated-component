import React, { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native'

import { CrossIcon, RightArrowIcon, TickIcon } from '@assets'
import {
  IconTransitionButton,
  ProgressButton,
  Select,
  SpringButton,
  SwipeButton,
  TriDotLoader,
} from '@components'
import { RemixIcons, TriDotLoaderPreset } from '@constants'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
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
      <Select
        onChange={() => {}}
        options={[{ title: 'Pranjul', value: 'pranjul' }]}
        value="Pranjul"
      />
      <ProgressButton isLoading={isLoading} onPress={onPress} label="Submit" />
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
        startIcon={RightArrowIcon}
        failedIcon={CrossIcon}
        successIcon={TickIcon}
      />
    </SafeAreaView>
  )
}

export default App
