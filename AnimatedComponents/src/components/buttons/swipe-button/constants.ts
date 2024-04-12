import { Dimensions } from 'react-native'

export const DEVICE_WIDTH = Dimensions.get('window').width

export const BUTTON_WIDTH = DEVICE_WIDTH - 32
export const BUTTON_HEIGHT = 48
export const BUTTON_PADDING = 4
export const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING

export const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING
export const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS

export const ENTERING_ANIMATION_DURATION = 750
export const EXITING_ANIMATION_DURATION = 300
