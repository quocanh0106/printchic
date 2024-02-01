import styled from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBoxAlignCenter, FlexBoxColumn, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { Colors, Images } from '~/Themes'
import Utilities from '~/Utils/Util'

interface StaticCardProps {
  number: number
  percent?: number
  name: string
  imgIcon: any
  isDown?: boolean
}

function StaticCard({ number, name, imgIcon, percent, isDown }: StaticCardProps) {
  return (
    <StaticCardContainer>
      <FlexBoxColumn style={{ gap: 5 }}>
        <img width={'50px'} src={imgIcon} alt='#' />
        <CustomText type={TEXT_TYPE.primary_30_700}>
          {number ? Utilities.numberWithCommas(number.toString()) : 0}
        </CustomText>
        <CustomText type={TEXT_TYPE.primary_18_400}>{name}</CustomText>
      </FlexBoxColumn>
      {percent && (
        <FlexBoxColumn style={{ gap: 10 }}>
          <PercentContainer>
            <img width={'24px'} src={isDown ? Images.chartDown : Images.chartUp} alt='#' />
            <CustomText
              type={TEXT_TYPE.primary_16_700}
              customStyle={{ color: isDown ? Colors.redColor : Colors.greenColor }}
            >
              {percent}%
            </CustomText>
          </PercentContainer>
        </FlexBoxColumn>
      )}
    </StaticCardContainer>
  )
}

export default StaticCard

const StaticCardContainer = styled(FlexBoxSpaceBetween)`
  width: 100%;
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 15px;
  border-radius: 8px;
  align-items: start;
`

const PercentContainer = styled(FlexBoxAlignCenter)`
  border: 1px solid #e3e3e3;
  padding: 6px 15px;
  border-radius: 5px;
  gap: 10px;
`
