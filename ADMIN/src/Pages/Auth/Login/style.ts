import styled from 'styled-components'
import { FlexBoxColumn } from '~/Components/StyleComponents'

export const Container = styled.div`
  background-color: white;
  padding: 60px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const GroupFormInput = styled(FlexBoxColumn)`
  width: 100%;
`

export const LogoImg = styled.img`
  width: 150px;
`

export const BtnSwitchLang = styled.div`
  position: absolute;
  top: 25px;
  right: 20px;
`
