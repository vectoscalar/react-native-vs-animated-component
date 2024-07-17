import { SharedValue } from 'react-native-reanimated'

export type AnimatedProps<T> = Partial<Record<keyof T, SharedValue<any>>>

export interface ValueSliderProps {
  sliderWidth?: number
  min?: number
  max?: number
  step?: number
  activeTrackColor?: string
  inactiveTrackColor?: string
  thumbColor?: string
}
