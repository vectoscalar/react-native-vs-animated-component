import React, { useCallback, useEffect, useMemo } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { TriDotLoaderPreset } from '@constants'

import { styles } from './tri-loader-styles'

type TriDotLoaderPropsType = {
  customLoaderStyle?: StyleProp<ViewStyle>
  loaderDotColor?: string
  loaderPreset?: TriDotLoaderPreset
}

const TriDotLoader = (props: TriDotLoaderPropsType) => {
  const {
    loaderPreset = TriDotLoaderPreset.Medium,
    loaderDotColor = 'black',
    customLoaderStyle = {},
  } = props
  const dot1Opacity = useSharedValue(1)
  const dot2Opacity = useSharedValue(1)
  const dot3Opacity = useSharedValue(1)

  useEffect(() => {
    const interval = setInterval(() => {
      dot1Opacity.value = withTiming(0, {}, () => {
        dot1Opacity.value = withTiming(1)
      })
      setTimeout(() => {
        dot2Opacity.value = withTiming(0, {}, () => {
          dot2Opacity.value = withTiming(1)
        })
      }, 200)
      setTimeout(() => {
        dot3Opacity.value = withTiming(0, {}, () => {
          dot3Opacity.value = withTiming(1)
        })
      }, 400)
    }, 600)

    return () => clearInterval(interval)
  }, [])

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1Opacity.value,
  }))

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2Opacity.value,
  }))

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3Opacity.value,
  }))

  const getDotStyle = useCallback(() => {
    const dotStyle: { [key: string]: StyleProp<ViewStyle> } = {
      [TriDotLoaderPreset.Small]: styles.dotSmall,
      [TriDotLoaderPreset.Medium]: styles.dot,
      [TriDotLoaderPreset.Large]: styles.dotLarge,
    }
    return dotStyle[loaderPreset]
  }, [loaderPreset])

  const dotStyle = useMemo(() => getDotStyle(), [loaderPreset])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[dotStyle, dot1Style, { backgroundColor: loaderDotColor }, customLoaderStyle]}
      />
      <Animated.View
        style={[dotStyle, dot2Style, { backgroundColor: loaderDotColor }, customLoaderStyle]}
      />
      <Animated.View
        style={[dotStyle, dot3Style, { backgroundColor: loaderDotColor }, customLoaderStyle]}
      />
    </View>
  )
}

export default TriDotLoader
