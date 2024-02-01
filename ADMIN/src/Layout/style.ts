import { styled } from 'styled-components'

export const LayoutContainer = styled('div')({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden'
})

export const SideBarContainer = styled('div')({
  height: '100vh',
  background: 'white',
  borderRadius: '0 25px 25px 0',
  boxShadow: '0px 3px 40px 0px rgba(28, 39, 76, 0.16)',
  width: '14vw',
  position: 'relative',
  zIndex: '0',
  minWidth: '220px'
})
