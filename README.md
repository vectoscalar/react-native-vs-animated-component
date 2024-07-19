# React Native Timer

## Features

- **Customizable**: Easily style the timer and its control buttons.
- **Dual Timer Types**: Supports both linear and circular timers.
- **Controls**: Optional start, pause, resume, and reset controls.
- **Animations**: Smooth animations

## Preview

https://github.com/user-attachments/assets/d84c2673-4d8b-46c7-b714-449ba7f4b016

## Props
|Prop |Type |Default Value |Required |Description |
|--- |--- |--- |--- |--- |
|buttonStyles |{ container?: ViewStyle; text?: TextStyle } |- |No |Custom styles for the timer control buttons |
|circularTimerStrokeColor |string |black |No |Stroke color for the circular timer |
|controls |boolean |false |No |Determines if control buttons (Start, Pause, Reset) are shown |
|linearTimerColor |string |black |No |Color for the linear timer |
|timerType |TimerPreset |- |Yes |Type of the timer (TimerPreset.Linear or TimerPreset.Circular)
|totalDurationInSeconds |number |- |Yes |Total duration of the timer in seconds |

## Usage
```typescript
import React from 'react'
import Timer from '@components'
import { TimerPreset } from '@constants'

const App = () => {
  return (
    <Timer
      buttonStyles={{ container: { backgroundColor: 'blue' }, text: { color: 'white' } }}
      circularTimerStrokeColor="red"
      controls={true}
      linearTimerColor="green"
      timerType={TimerPreset.Circular} // or TimerPreset.Linear
      totalDurationInSeconds={60}
    />
  )
}

export default App

```
