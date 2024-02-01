import styled from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBox } from '~/Components/StyleComponents'
import { Colors } from '~/Themes'
import { useAppSelector } from '~/Hooks/useAppSelector'
import { RootState } from '~/Config/ReduxConfig/Store'

function DetailRecruitment() {
  const { postDetail } = useAppSelector((state: RootState) => state.posts)

  const data = [
    {
      name: 'Quốc gia',
      value: postDetail?.countryObjId?.countryName
    },
    {
      name: 'Tỉnh',
      value: postDetail?.provinceObjId?.cityName
    },
    {
      name: 'Ngành nghề',
      value: postDetail?.jobObjId
    },
    {
      name: 'Mô tả công việc',
      value: postDetail?.jobDescription
    },
    {
      name: 'Nơi thi tuyển',
      value: postDetail.examPlace ? 'có' : 'không'
    },
    {
      name: 'Thời gian làm việc',
      value: postDetail?.workingTime
    },
    {
      name: 'Lương cơ bản',
      value: postDetail?.salary
    },
    {
      name: 'Thu nhập dự kiến',
      value: postDetail?.expectedIncome,
      isBold: true
    },
    {
      name: 'Làm thêm',
      value: postDetail?.isOverTime ? 'có' : 'không'
    },
    {
      name: 'Các quyền lợi',
      value: postDetail?.benefit ? 'có' : 'không'
    },
    {
      name: 'Số lượng tuyển',
      value: postDetail?.numberOfRecruits
    },
    {
      name: 'Hợp đồng',
      value: postDetail?.contractObjId
    },
    {
      name: 'Phí xuất cảnh',
      value: postDetail?.exportFee
    }
  ]
  return (
    <Container>
      <CustomText
        type={TEXT_TYPE.secondary_20_700}
        block
        customStyle={{ borderLeft: `5px solid ${Colors.secondary}`, paddingLeft: '10px', marginBottom: 35 }}
      >
        Chi tiết tuyển dụng
      </CustomText>
      {data.map((ele: any) => (
        <FlexBox style={{ margin: '15px 0' }} key={ele.name}>
          <CustomText type={TEXT_TYPE.primary_18_700} customStyle={{ width: '50%' }}>
            {ele.name}
          </CustomText>
          <CustomText
            type={ele?.isBold ? TEXT_TYPE.primary_16_700 : TEXT_TYPE.darkGrey_16_400}
            customStyle={{
              width: '50%',
              borderLeft: `1px solid #BDBDBD`,
              paddingLeft: '7px',
              fontWeight: ele?.isBold ? 'bold' : '400'
            }}
          >
            {ele.value}
          </CustomText>
        </FlexBox>
      ))}
    </Container>
  )
}

export default DetailRecruitment

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 23px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`
