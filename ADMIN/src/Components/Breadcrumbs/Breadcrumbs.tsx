import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppSelector } from '~/Hooks/useAppSelector'
import CustomText, { TEXT_TYPE } from '../CustomText'
import { Images } from '~/Themes'
import { FlexCenter } from '../StyleComponents'

const Breadcrumbs = () => {
  const { breadcrumbsData } = useAppSelector((state: RootState) => state.common)
  return (
    <FlexCenter>
      {breadcrumbsData?.isShowBackIcon && (
        <span onClick={breadcrumbsData?.backFunc}>
          <img style={{ marginTop: '10px' }} src={Images.backIcon} alt='#' />
        </span>
      )}
      <CustomText type={TEXT_TYPE.primary_24_700}>{breadcrumbsData.text}</CustomText>
    </FlexCenter>
  )
}

export default Breadcrumbs
