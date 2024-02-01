import { Popover, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import { useAppDispatch } from '~/Hooks/useAppSelector'
import { HRReduxActions } from '~/ReduxSaga/HR/HRRedux'
import { Images } from '~/Themes'

interface ActionColumnProps {
  id: string
  status: string
  isTopHr: boolean
  setOpenDialog: (isOpen: boolean) => void
  setCurrentUserClick: (id: string) => void
}

function ActionColumn({ id, status, isTopHr, setOpenDialog, setCurrentUserClick }: ActionColumnProps) {
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useAppDispatch()

  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null)
  const [openTopHrDialog, setOpenTopHrDialog] = useState(false)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchor(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setPopoverAnchor(null)
  }
  const handleTopHr = () => {
    dispatch(HRReduxActions.TopHRRequest({ userObjId: id, isTopHR: isTopHr, fromScreen: 'list' }))
    setOpenTopHrDialog(false)
  }
  const [openDialogBlockUser, setOpenDialogBlockUser] = useState(false)

  const handleCloseDialogBlockUser = () => {
    setOpenDialogBlockUser(false)
  }

  const handleConfirmBlock = () => {
    dispatch(HRReduxActions.BlockUserHRRequest({ userObjId: id, status: status, fromScreen: 'list' }))
    handleCloseDialogBlockUser()
  }

  const open = Boolean(popoverAnchor)
  return (
    <div>
      <Tooltip title=''>
        <img onClick={handlePopoverOpen} style={{ cursor: 'pointer' }} width={'18px'} src={Images.actionTable} alt='' />
      </Tooltip>
      <Popover
        open={open}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '8px',
            marginTop: '5px'
          }
        }}
      >
        <Typography style={{ padding: '5px 16px' }}>
          <div>
            <ImgContainer onClick={() => navigate(`/employer/detail/${id}`)}>
              <ImgIcon src={Images.viewIcon} alt='#' />
              Xem chi tiết
            </ImgContainer>
            <ImgContainer onClick={() => setOpenDialogBlockUser(true)}>
              <ImgIcon src={status === 'ACTIVE' ? Images.blockUserIcon : Images.unlockUserIcon} alt='#' />
              {status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa'}
            </ImgContainer>
            <ImgContainer
              onClick={() => {
                setCurrentUserClick(id)
                setOpenDialog(true)
              }}
            >
              <ImgIcon src={Images.depositIcon} alt='#' />
              Nạp tiền
            </ImgContainer>
            <ImgContainer
              onClick={() => {
                setCurrentUserClick(id)
                setOpenTopHrDialog(true)
              }}
            >
              <ImgIcon src={isTopHr ? Images.removeTop : Images.addTop} alt='#' />
              {isTopHr ? 'Bỏ top' : 'TOP Trang chủ'}
            </ImgContainer>
          </div>
        </Typography>
      </Popover>
      <CustomDialog
        open={openDialogBlockUser}
        onClose={handleCloseDialogBlockUser}
        onConfirm={handleConfirmBlock}
        title={status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
        content={
          status === 'ACTIVE'
            ? 'Bạn có chắc chắn muốn khóa tài khoản này không?'
            : 'Bạn có chắc chắn muốn mở khóa tài khoản này không?'
        }
      />
      <CustomDialog
        open={openTopHrDialog}
        title={isTopHr ? 'TOP Trang chủ' : 'Bỏ TOP Trang chủ'}
        content={
          isTopHr
            ? 'Bạn có chắc chắn muốn bỏ TOP trang chủ không?'
            : 'Bạn có chắc chắn muốn để tài khoản này ở TOP trang chủ không?'
        }
        onClose={() => setOpenTopHrDialog(false)}
        onConfirm={handleTopHr}
      />
    </div>
  )
}

export default ActionColumn

const ImgIcon = styled.img`
  width: 16px;
  margin: 0 10px -2px 0;
`

const ImgContainer = styled.div`
  cursor: pointer;
  margin: 15px 10px;
`
