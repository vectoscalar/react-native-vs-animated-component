import React, { useMemo, useState } from 'react'
import { Easing, SafeAreaView, View } from 'react-native'

import { RemixIcons } from '@constants'

import ProgressButton from './src/components/buttons/progress-button/ProgressButton'
import SpringButton from './src/components/buttons/spring-button/SpringButton'
import SwipeButton from './src/components/buttons/swipe-button/SwipeButton'
import Select from './src/components/select/Select'
import SBTextAnimator from './src/components/text-animator/TextAnimator'

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

  const taskStatusData = useMemo(
    () => ({
      fail: {
        text: 'Failed',
        icon: RemixIcons.FILLED_CLOSE_CIRCLE,
        iconColor: 'white',
        waveColor: ['red', 'red'],
      },
      success: {
        text: 'Successfully',
        icon: RemixIcons.CHECKBOX_CIRCLE_FILLED,
        iconColor: 'white',
        waveColor: ['blue', 'blue'],
      },
    }),
    [],
  )

  const gradientWaveColor = useMemo(() => ['red', 'red'], [])
  const thumbColors = useMemo(() => ['yellow', 'yellow'], [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SpringButton label="Press me" onPress={onSpringPress} />
      <Select
        onChange={() => {}}
        options={[{ title: 'Pranjul', value: 'pranjul' }]}
        value="Pranjul"
      />
      <ProgressButton isLoading={isLoading} onPress={onPress} label="Submit" />
      <SwipeButton
        buttonInitialText="Swipe Tp left"
        gradientWaveColor={gradientWaveColor}
        onSwipeComplete={handleSubmitBtnPress}
        onTaskComplete={handleSubmitBtnPress}
        taskStatusData={taskStatusData}
        thumbColors={thumbColors}
      />
      <SBTextAnimator
        bounce={false}
        duration={3000}
        easing={Easing.linear}
        isRTL={false}
        loop
        marqueeDelay={0}
        repeatSpacer={30}
        scroll={false}
        shouldAnimateThreshold={40}>
        Textas dasjkdjkas jckdj kasdjkajkd kjsakldkasld Textas dasjkdjkas jckdj kasdjkajkd
        kjsakldkasld Textas dasjkdjkas jckdj kasdjkajkd kjsakldkasld Textas dasjkdjkas jckdj
      </SBTextAnimator>
    </SafeAreaView>
  )
}

export default App
