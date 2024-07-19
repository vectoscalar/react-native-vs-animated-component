import { ImageSourcePropType, ImageStyle, TextStyle, ViewStyle } from 'react-native'

import { FloatingButtonPreset } from '@constants'

interface IconProps {
  icon: ImageSourcePropType
  iconName: string
  onPress: () => void
}

export interface FloatingButtonProps {
  animationTransitionDuration?: number
  buttonContainerStyle?: ViewStyle
  buttonType: FloatingButtonPreset
  circleStyle?: ViewStyle
  contentContainerStyle?: ViewStyle
  iconContainerStyle?: ViewStyle
  iconStyle?: ImageStyle
  icons: IconProps[]
  textStyle?: TextStyle
  isLeft?: boolean
}
