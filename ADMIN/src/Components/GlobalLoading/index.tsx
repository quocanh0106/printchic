import React, { useState, useImperativeHandle } from 'react'
import './style.css'

export const globalLoadingRef = React.createRef<any>()

export const globalLoading = {
  show: () => {
    globalLoadingRef?.current?.show()
  },
  hide: () => {
    globalLoadingRef?.current?.hide()
  }
}

export interface Props {
  name?: string
}

const GlobalLoading = React.forwardRef((_, ref) => {
  const [loading, setLoading] = useState(false)
  const show = () => {
    setLoading(true)
  }

  const hide = () => {
    setLoading(false)
  }

  useImperativeHandle(ref, () => {
    return { show: show, hide: hide }
  })

  return loading ? (
    <div className='loading'>
      <div className='half-circle-spinner'>
        <div className='circle circle-1'></div>
        <div className='circle circle-2'></div>
      </div>
    </div>
  ) : (
    <></>
  )
})

export default GlobalLoading
