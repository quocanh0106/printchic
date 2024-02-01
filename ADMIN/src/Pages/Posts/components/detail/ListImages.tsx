import styled from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { Colors } from '~/Themes'
import { useAppSelector } from '~/Hooks/useAppSelector'
import { RootState } from '~/Config/ReduxConfig/Store'

function ListImages() {
  const { postDetail } = useAppSelector((state: RootState) => state.posts)

  return (
    <Container>
      <CustomText
        type={TEXT_TYPE.secondary_20_700}
        block
        customStyle={{ borderLeft: `5px solid ${Colors.secondary}`, paddingLeft: '10px', marginBottom: 35 }}
      >
        Hình ảnh
      </CustomText>
      {postDetail?.detailImages?.map((item: string) => (
        <img width={'100%'} style={{ borderRadius: '8px', marginBottom: '15px' }} src={item} alt='img' />
      ))}
    </Container>
  )
}

export default ListImages

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 23px 20px;
  border-radius: 8px;
`
