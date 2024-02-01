import { isObject } from 'lodash'
import React from 'react'
import { AntText } from './styles'

interface iProps {
  type?: any
  pointerCursor?: boolean
  block?: boolean
  customStyle?: any
  children: React.ReactNode
}

export const CustomText = (props: iProps) => {
  const { children, type, customStyle, pointerCursor, block } = props
  let cStyle = {}
  if (type && isObject(type)) {
    cStyle = { ...type }
  }
  if (customStyle && isObject(customStyle)) {
    cStyle = { ...cStyle, ...customStyle }
  }

  return (
    <AntText
      style={{
        ...cStyle,
        cursor: pointerCursor ? 'pointer' : 'unset',
        display: block ? 'block' : 'inline'
      }}
    >
      {children}
    </AntText>
  )
}
