import { SharedValue } from 'react-native-reanimated'

export type AnimatedProps<T> = Partial<Record<keyof T, SharedValue<any>>>

export interface ValueSliderProps {
  /** sliderWidth is an optional prop which states the slider width. */
  sliderWidth?: number
  /** min is an optional prop which states the min value for slider. */
  min?: number
  /** max is an optional prop which states the max value for slider. */
  max?: number
  /** step is an optional prop which states the increment or decrement in slider value on sliding. */
  step?: number
  /** activeTrackColor is an optional prop which states the color of the active track of the slider. */
  activeTrackColor?: string
  /** inactiveTrackColor is an optional prop which states the color of the inactive track of the slider. */
  inactiveTrackColor?: string
  /** thumbColor is an optional prop which states the color of slider thumb */
  thumbColor?: string
}
