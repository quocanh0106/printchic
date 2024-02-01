import styled from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBox } from '~/Components/StyleComponents'
import { Colors } from '~/Themes'
import { useAppSelector } from '~/Hooks/useAppSelector'
import { RootState } from '~/Config/ReduxConfig/Store'
import moment from 'moment'
import { listStatusName } from '../../config'

function BasicInfo() {
  const { postDetail } = useAppSelector((state: RootState) => state.posts)

  const data = [
    {
      name: 'Nhà tuyển dụng',
      value: postDetail?.createdBy?.fullName
    },
    {
      name: 'SĐT',
      value: postDetail?.createdBy?.phoneNumber
    },
    {
      name: 'Trạng thái',
      value: listStatusName[postDetail?.status],
      isBold: true
    },
    {
      name: 'Ngày tạo',
      value: postDetail?.createdBy?.createdAt ? moment(postDetail?.createdBy?.createdAt).format('DD-MM-YYYY') : ''
    },
    {
      name: 'Ngày cập nhật',
      value: postDetail?.createdBy?.updatedAt ? moment(postDetail?.createdBy?.updatedAt).format('DD-MM-YYYY') : ''
    },
    {
      name: 'Lượt xem',
      value: postDetail?.createdBy?.view ? postDetail?.createdBy?.view : 0
    }
  ]

  return (
    <Container>
      <CustomText
        type={TEXT_TYPE.secondary_20_700}
        block
        customStyle={{ borderLeft: `5px solid ${Colors.secondary}`, paddingLeft: '10px', marginBottom: 35 }}
      >
        {postDetail?.title}
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

export default BasicInfo

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 23px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`
