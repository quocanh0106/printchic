import styled from 'styled-components'

const FlexBox = styled.div`
  display: flex;
`

const FlexBoxAlignCenter = styled.div`
  display: flex;
  align-items: center;
`

const FlexBoxStart = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`

const FlexBoxEnd = styled.div`
  display: flex;
  align-items: end;
`

const FlexBoxColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const FlexBoxColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FlexBoxSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Container = styled(FlexBox)`
  height: 100%;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 50px;
`
const GridBox = styled(FlexBox)`
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  justify-content: space-between;
`
const Title = styled(FlexBox)`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #1a202c;
`
const FullWidthDiv = styled.div`
  width: 100%;
`

export {
  FlexBox,
  FlexCenter,
  Container,
  FlexBoxColumn,
  GridBox,
  Title,
  FullWidthDiv,
  FlexBoxSpaceBetween,
  FlexBoxColumnCenter,
  FlexBoxStart,
  FlexBoxEnd,
  FlexBoxAlignCenter
}
