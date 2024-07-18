import type { Meta, StoryObj } from '@storybook/react'

import Slider from '../../../src/components/slider/Slider'
import { SliderType } from '../../../src/constants'

const meta = {
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const SingleValueSlider: Story = {
  args: {
    type: SliderType.SingleValueSlider,
    sliderWidth: 200,
    min: 0,
    max: 100,
    step: 4,
  },
}

export const RangeSlider: Story = {
  args: {
    type: SliderType.RangeSlider,
    sliderWidth: 200,
    min: 0,
    max: 100,
    step: 4,
  },
}
