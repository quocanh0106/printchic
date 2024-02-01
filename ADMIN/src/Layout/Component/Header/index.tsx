import Breadcrumbs from '~/Components/Breadcrumbs/Breadcrumbs'
import { FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import * as S from './style'

function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderInfo>
        <FlexBoxSpaceBetween style={{ width: '100%' }}>
          <Breadcrumbs />
        </FlexBoxSpaceBetween>
      </S.HeaderInfo>
    </S.HeaderContainer>
  )
}

export default Header
