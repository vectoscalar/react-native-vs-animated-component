import Animated from 'react-native-reanimated'

export interface ValueSliderProps {
  sliderWidth: number
  min: number
  max: number
  step: number
  activeTrackColor?: string
  inactiveTrackColor?: string
  thumbColor?: string
}

export interface Range {
  min: number
  max: number
}

export enum SliderType {
  RangeSlider = 'RANGE_SLIDER',
  SingleValueSlider = 'SINGLE_VALUE_SLIDER', 
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnimatedPropsProp<T> = Partial<Record<keyof T, Animated.SharedValue<any>>>

export const MIN_DEFAULT = 0
export const MAX_DEFAULT = 100
