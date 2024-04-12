import Animated from 'react-native-reanimated'

export interface SliderProps {
  sliderWidth: number
  min: number
  max: number
  step: number
  onValueChange: (range: Range) => void
}

export interface Range {
  min: number
  max: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnimatedPropsProp<T> = Partial<Record<keyof T, Animated.SharedValue<any>>>

export const MIN_DEFAULT = 0
export const MAX_DEFAULT = 100
