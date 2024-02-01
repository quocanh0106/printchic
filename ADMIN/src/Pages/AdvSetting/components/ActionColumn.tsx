import { useState } from 'react'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import { FlexBoxAlignCenter } from '~/Components/StyleComponents'
import { useAppDispatch } from '~/Hooks/useAppSelector'
import { AdvReduxActions } from '~/ReduxSaga/Adv/AdvRedux'
import { Images } from '~/Themes'

interface ActionColumnProps {
  id: string
  setOpenDialog: (value: boolean) => void
  setcurrentIdAdv: (id: string) => void
}

function ActionColumn({ id, setOpenDialog, setcurrentIdAdv }: ActionColumnProps) {
  const dispatch = useAppDispatch()
  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false)
  }

  const handleConfirmDelete = () => {
    dispatch(AdvReduxActions.DeleteAdvRequest({ id }))
    handleCloseDialogDelete()
  }
  return (
    <>
      <FlexBoxAlignCenter style={{ gap: 10, justifyContent: 'center' }}>
        <img
          width={'32px'}
          style={{ cursor: 'pointer' }}
          onClick={() => setOpenDialogDelete(true)}
          src={Images.trashIcon}
          alt='edit icon'
        />
        <img
          width={'20px'}
          style={{ marginBottom: -2, cursor: 'pointer' }}
          onClick={() => {
            setOpenDialog(true)
            setcurrentIdAdv(id)
          }}
          src={Images.editIcon}
          alt='edit icon'
        />
      </FlexBoxAlignCenter>
      <CustomDialog
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        onConfirm={handleConfirmDelete}
        title={'Xóa quảng cáo'}
        content={'Bạn có chắc chắn muốn xóa quảng cáo không?'}
      />
    </>
  )
}

export default ActionColumn
