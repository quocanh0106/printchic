import styled from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBoxAlignCenter, FlexBoxColumn, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { Colors, Images } from '~/Themes'
import Utilities from '~/Utils/Util'

interface RevenueCardProps {
  number: number
  percent?: number
  name: string
  isDown?: boolean
  imgChartIcon?: any
}

function RevenueCard({ number, name, imgChartIcon, percent, isDown }: RevenueCardProps) {
  return (
    <RevenueCardContainer>
      <FlexBoxColumn style={{ gap: 5 }}>
        <CustomText type={TEXT_TYPE.primary_16_700}>{name}</CustomText>
        <CustomText type={TEXT_TYPE.primary_30_700}>
          {number ? Utilities.numberWithCommas(number.toString()) : 0} VNĐ
        </CustomText>
      </FlexBoxColumn>
      <FlexBoxColumn style={{ gap: 10 }}>
        {percent && (
          <PercentContainer>
            <>
              <img width={'24px'} src={isDown ? Images.chartDown : Images.chartUp} alt='#' />
              <CustomText
                type={TEXT_TYPE.primary_16_700}
                customStyle={{ color: isDown ? Colors.redColor : Colors.greenColor }}
              >
                {percent}%
              </CustomText>
            </>
          </PercentContainer>
        )}
        {imgChartIcon && <img width={'81px'} src={imgChartIcon} alt='#' />}
      </FlexBoxColumn>
    </RevenueCardContainer>
  )
}

export default RevenueCard

const RevenueCardContainer = styled(FlexBoxSpaceBetween)`
  width: 100%;
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 25px;
  border-radius: 8px;
  align-items: start;
`

const PercentContainer = styled(FlexBoxAlignCenter)`
  border: 1px solid #e3e3e3;
  padding: 6px 15px;
  border-radius: 5px;
  gap: 10px;
`
