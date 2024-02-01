import { styled } from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBoxStart } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppSelector } from '~/Hooks/useAppSelector'
import { Colors } from '~/Themes'

function TabInfo() {
  const { detailHR } = useAppSelector((state: RootState) => state.hr)
  return (
    <>
      <ContactContainer>
        <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ color: Colors.primary }}>
          THÔNG TIN LIÊN HỆ *
        </CustomText>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div style={{ width: '50%' }}>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Email
            </CustomText>
            <p>{detailHR?.email}</p>
          </div>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Số điện thoại
            </CustomText>
            <p>{detailHR?.phoneNumber}</p>
          </div>
        </FlexBoxStart>
      </ContactContainer>
      <BasicContainer>
        <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ color: Colors.primary }}>
          THÔNG TIN CƠ BẢN
        </CustomText>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Họ và tên
            </CustomText>
            <p>{detailHR?.fullName}</p>
          </div>
        </FlexBoxStart>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div style={{ width: '50%' }}>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Facebook
            </CustomText>
            <p>{detailHR?.fb}</p>
          </div>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Zalo
            </CustomText>
            <p>{detailHR?.zalo}</p>
          </div>
        </FlexBoxStart>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Giới thiệu
            </CustomText>
            <p>{detailHR?.description}</p>
          </div>
        </FlexBoxStart>
      </BasicContainer>
      <div></div>
    </>
  )
}

export default TabInfo

const ContactContainer = styled.div`
  box-shadow: 0px 4px 4px 0px #bdbdbd80;
  border-radius: 8px;
  padding: 20px;
`

const BasicContainer = styled.div`
  box-shadow: 0px 4px 4px 0px #bdbdbd80;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`
