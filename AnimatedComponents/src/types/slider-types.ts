import { TextStyle, ViewStyle } from 'react-native'

export interface ISliderProps {
  /** activeTrackStyle is an optional prop that specifies the styles of the active track of the slider. */
  activeTrackStyle?: Omit<ViewStyle, 'width'>
  /** duration is an optional prop which specifies the duration of animation in milliseconds. */
  duration?: number
  /** inactiveTrackStyle is an optional prop that specifies the styles of the inactive track of the slider. */
  inactiveTrackStyle?: Omit<ViewStyle, 'width'>
  /** labelContainerStyle is an optional prop that specifies the styles for label container */
  labelContainerStyle?: ViewStyle
  /** labelTextStyle is an optional prop that specifies the styles for label text */
  labelTextStyle?: TextStyle
  /** max is an optional prop that specifies the maximum value for the slider. */
  max?: number
  /** min is an optional prop that specifies the minimum value for the slider. */
  min?: number
  /** sliderWidth is an optional prop that specifies the width of the slider. */
  sliderWidth?: number
  /** sliderHeight is an optional prop that specifies the height of slider. */
  sliderHeight?: number
  /** step is an optional prop that specifies the increment or decrement in the slider value when sliding. */
  step?: number
  /** thumbIcon is an optional prop that specifies the icon for the slider thumb. */
  thumbIcon?: React.ReactNode
  /** thumbSize is an optional prop that specifies the size of the slider thumb. */
  thumbSize?: number
  /** thumbStyle is an optional prop that specifies the styles of the slider thumb. */
  thumbStyle?: ViewStyle
}
