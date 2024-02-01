import { styled } from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBoxAlignCenter, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { Colors, Images } from '~/Themes'

function TabListCV() {
  const Item = () => {
    return (
      <ItemContainer>
        <FlexBoxAlignCenter style={{ gap: 10 }}>
          <img width='40px' src={Images.exelIcon} alt='exel icon' />
          <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ color: Colors.darkGrey }}>
            NguyenVanA_XKLD.xlsx
          </CustomText>
        </FlexBoxAlignCenter>
        <FlexBoxAlignCenter style={{ gap: 10 }}>
          <img src={Images.downloadIcon} alt='exel icon' />
          <CustomText type={TEXT_TYPE.primary_16_700}>Tải xuống</CustomText>
        </FlexBoxAlignCenter>
      </ItemContainer>
    )
  }

  return (
    <div>
      <Item />
      <p>Lần cập nhật gần nhất: 08/09/2023</p>
    </div>
  )
}

export default TabListCV

const ItemContainer = styled(FlexBoxSpaceBetween)`
  background: #f6f7f9;
  padding: 20px 30px;
  border-radius: 8px;
`
