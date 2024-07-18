import { SliderType } from '@constants'
import type { Meta, StoryObj } from '@storybook/react'

import Slider from '../../../src/components/slider/Slider'

const meta = {
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const SingleValueSlider: Story = {
  args: {
    max: 0,
    min: 10,

    type: SliderType.SingleValueSlider,
    sliderWidth: 300,
    step: 5,
  },
}
