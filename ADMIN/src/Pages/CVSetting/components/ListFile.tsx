/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBoxAlignCenter, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { AdvReduxActions } from '~/ReduxSaga/Adv/AdvRedux'
import { Images } from '~/Themes'
import Utilities from '~/Utils/Util'

function ListFile() {
  const { listCV } = useAppSelector((state: RootState) => state.adv)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(AdvReduxActions.getListCVRequest())
  }, [dispatch])

  const handleDelteCv = () => {
    dispatch(AdvReduxActions.deleteCVRequest({ id: openDialogDelete }))
    setOpenDialogDelete(false)
  }

  const checkTypeFile = (url: string | undefined) => {
    if (Utilities.checkTypeInputFile(url) === 'PDF') {
      return Images.pdfIcon
    } else if (Utilities.checkTypeInputFile(url) === 'PNG') {
      return Images.pngIcon
    } else if (Utilities.checkTypeInputFile(url) === 'JPG') {
      return Images.jpgIcon
    } else {
      return Images.jpgIcon
    }
  }

  const ItemFile = (props: any) => {
    return (
      <div>
        <ContainerItemList>
          <FlexBoxAlignCenter
            style={{ gap: '20px' }}
            onClick={() => window.open(props?.data?.attachmentObjId?.link, '_blank')}
          >
            <img width='40px' src={checkTypeFile(props?.data?.attachmentObjId?.type)} alt='pdfIcon' />
            <CustomText type={TEXT_TYPE.darkGrey_20_700} customStyle={{ textDecoration: 'underline' }}>
              {props?.data?.attachmentObjId?.name}
            </CustomText>
          </FlexBoxAlignCenter>
          <FlexBoxAlignCenter
            style={{ gap: '5px' }}
            onClick={() => setOpenDialogDelete(props?.data?.attachmentObjId?._id)}
          >
            <img width='30px' src={Images.trashIcon} alt='pdfIcon' />
            <CustomText type={TEXT_TYPE.primary_16_700}>Xóa</CustomText>
          </FlexBoxAlignCenter>
        </ContainerItemList>
      </div>
    )
  }

  return (
    <div>
      {listCV?.map((ele: any) => {
        return (
          <>
            <ItemFile data={ele} />
          </>
        )
      })}
      {listCV?.length == 0 && (
        <CustomText
          block
          type={TEXT_TYPE.primary_18_700}
          customStyle={{
            textAlign: 'center'
          }}
        >
          Hiện tại chưa có template CV mẫu nào
        </CustomText>
      )}
      <CustomDialog
        open={openDialogDelete}
        onClose={() => setOpenDialogDelete(false)}
        onConfirm={handleDelteCv}
        title={'Xóa CV'}
        content={'Bạn có chắc chắn muốn xóa CV này không?'}
      />
    </div>
  )
}

export default ListFile

const ContainerItemList = styled(FlexBoxSpaceBetween)`
  background: #f6f7f9;
  border-radius: 8px;
  padding: 20px;
  margin: 30px 0;
`
