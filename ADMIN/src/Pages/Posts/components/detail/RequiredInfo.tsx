import styled from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBox } from '~/Components/StyleComponents'
import { Colors } from '~/Themes'
import { useAppSelector } from '~/Hooks/useAppSelector'
import { RootState } from '~/Config/ReduxConfig/Store'
import moment from 'moment'

function RequiredInfo() {
  const { postDetail } = useAppSelector((state: RootState) => state.posts)

  const data = [
    {
      name: 'Giới tính',
      value: postDetail?.gender
    },
    {
      name: 'Năm sinh',
      value: `${moment(postDetail?.endBorn).format('YYYY')}`,
      isBold: true
    },
    {
      name: 'Trình độ học vấn',
      value: postDetail?.education
    },
    {
      name: 'Ngoại ngữ',
      value: postDetail?.languages
    },
    {
      name: 'Tay nghề',
      value: postDetail?.workmanship
    },
    {
      name: 'Tình trạng sức khỏe',
      value: postDetail?.healthCondition ? 'tốt' : 'không'
    },
    {
      name: 'Thị lực',
      value: postDetail?.eyesight
    },
    {
      name: 'Viêm gan B',
      value: postDetail?.isHepatitis ? 'có' : 'không'
    },
    {
      name: 'Xăm hình',
      value: postDetail?.isTattoo ? 'có' : 'không'
    },
    {
      name: 'Yêu cầu khác',
      value: postDetail?.otherRequirement
    }
  ]

  return (
    <Container>
      <CustomText
        type={TEXT_TYPE.secondary_20_700}
        block
        customStyle={{ borderLeft: `5px solid ${Colors.secondary}`, paddingLeft: '10px', marginBottom: 35 }}
      >
        Yêu cầu
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
              paddingLeft: '7px'
            }}
          >
            {ele.value}
          </CustomText>
        </FlexBox>
      ))}
    </Container>
  )
}

export default RequiredInfo

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 23px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`
