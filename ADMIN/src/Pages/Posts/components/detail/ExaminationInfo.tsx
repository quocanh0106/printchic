import moment from 'moment'
import styled from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBox } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppSelector } from '~/Hooks/useAppSelector'
import { Colors } from '~/Themes'

function ExaminationInfo() {
  const { postDetail } = useAppSelector((state: RootState) => state.posts)

  const data = [
    {
      name: 'Hình thức thi tuyển',
      value: postDetail?.examForm
    },
    {
      name: 'Ngày thi tuyển',
      value: postDetail?.examDate ? moment(postDetail?.examDate).format('DD-MM-YYYY') : ''
    },
    {
      name: 'Hạn đăng ký',
      value: postDetail?.expiredDate ? moment(postDetail?.expiredDate).format('DD-MM-YYYY') : ''
    },
    {
      name: 'Dự kiến xuất cảnh',
      value: postDetail?.exportDate ? moment(postDetail?.exportDate).format('DD-MM-YYYY') : ''
    }
  ]

  return (
    <Container>
      <CustomText
        type={TEXT_TYPE.secondary_20_700}
        block
        customStyle={{ borderLeft: `5px solid ${Colors.secondary}`, paddingLeft: '10px', marginBottom: 35 }}
      >
        Thi tuyển
      </CustomText>
      {data.map((ele: any) => (
        <FlexBox style={{ margin: '15px 0' }}>
          <CustomText type={TEXT_TYPE.primary_18_700} customStyle={{ width: '50%' }}>
            {ele.name}
          </CustomText>
          <CustomText
            type={ele?.isBold ? TEXT_TYPE.primary_16_700 : TEXT_TYPE.darkGrey_16_400}
            customStyle={{ width: '50%', borderLeft: `1px solid #BDBDBD`, paddingLeft: '7px' }}
          >
            {ele.value}
          </CustomText>
        </FlexBox>
      ))}
    </Container>
  )
}

export default ExaminationInfo

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 23px 20px;
  border-radius: 8px;
`
