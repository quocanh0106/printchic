import { Popover, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import { useAppDispatch } from '~/Hooks/useAppSelector'
import { CandidateReduxActions } from '~/ReduxSaga/Candidate/CandidateRedux'
import { Images } from '~/Themes'

interface ActionColumnProps {
  id?: string
  status: string
}

function ActionColumn({ id, status }: ActionColumnProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchor(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setPopoverAnchor(null)
  }

  const [openDialogBlockUser, setOpenDialogBlockUser] = useState(false)

  const handleCloseDialogBlockUser = () => {
    setOpenDialogBlockUser(false)
  }

  const handleConfirmBlock = () => {
    dispatch(CandidateReduxActions.BlockUserCandidateRequest({ userObjId: id, status: status, fromScreen: 'list' }))
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
            <ImgContainer onClick={() => navigate(`/candidate/detail/${id}`)}>
              <ImgIcon src={Images.viewIcon} alt='#' />
              Xem chi tiết
            </ImgContainer>
            <ImgContainer onClick={() => setOpenDialogBlockUser(true)}>
              <ImgIcon src={status === 'ACTIVE' ? Images.blockUserIcon : Images.unlockUserIcon} alt='#' />
              {status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa'}
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
