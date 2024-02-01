import { styled } from 'styled-components'
import Color from '~/Themes/Colors'
import { FontSizes } from '~/Themes/Fonts'

type ItemProps = {
  isActive: boolean
}

export const ImgContract = styled('img')({
  transform: 'rotate(-90deg)',
  backgroundColor: 'white',
  padding: '10px 5px',
  borderRadius: '6px 6px 0px 0px',
  marginTop: '25px'
})

export const Item = styled('div')<ItemProps>(({ isActive }) => ({
  // position: 'relative',
  display: 'flex',
  alignItems: 'center',
  fontSize: FontSizes.font_16,
  color: Color.neutral_gray_1,
  padding: '9px 19px',
  width: '100%',
  minWidth: '200px',
  margin: '7px 0',
  cursor: 'pointer',
  backgroundColor: isActive ? Color.secondary : 'transparent',
  borderRadius: isActive ? '8px' : '0px'
}))

export const ItemSetting = styled('div')<ItemProps>(({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: FontSizes.font_16,
  color: Color.neutral_gray_1,
  padding: '7px 19px',
  width: '100%',
  minWidth: '200px',
  margin: '2px 0',
  cursor: 'pointer',
  backgroundColor: isActive ? Color.secondary : 'transparent',
  borderRadius: isActive ? '8px' : '0px'
}))

export const ListItem = styled('div')({
  margin: '25px 0 0 0'
})

export const IconLogoutContainer = styled('div')({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: '40px'
})

export const ImgIcon = styled('img')({
  width: '35px',
  height: 'auto'
})

export const ImgContainer = styled('span')({})

export const Text = styled('span')({
  marginLeft: '11px',
  marginBottom: '2px'
})
