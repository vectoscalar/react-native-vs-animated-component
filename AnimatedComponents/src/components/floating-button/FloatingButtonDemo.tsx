import React from 'react'
import { Alert } from 'react-native'

import { FileIcon, FolderIcon, PenIcon } from '@assets'
import { FloatingButtonPreset } from '@constants'

import FloatingButton from './FloatingButton'

const FloatingButtonDemo = () => {
  const icons = [
    {
      icon: FileIcon,
      onPress: () => Alert.alert('File Icon Pressed'),
      iconName: 'File',
    },
    {
      icon: FolderIcon,
      onPress: () => Alert.alert('Folder Icon Pressed'),
      iconName: 'Folder',
    },
    {
      icon: PenIcon,
      onPress: () => Alert.alert('Pen Icon Pressed'),
      iconName: 'Pen',
    },
    {
      icon: PenIcon,
      onPress: () => Alert.alert('Pen Icon Pressed'),
      iconName: 'Pencil',
    },
  ]

  return <FloatingButton buttonType={FloatingButtonPreset.CircularFloatingButton} icons={icons} />
}

export default FloatingButtonDemo
