import { Popover, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Images } from '~/Themes'
import { listDialog, listStatusPost } from '../config'

interface ActionColumnProps {
  id?: string
  status: number
  handleOpenDialog: any
}

function ActionColumn({ id, status, handleOpenDialog }: ActionColumnProps) {
  const navigate = useNavigate()
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchor(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setPopoverAnchor(null)
  }

  const open = Boolean(popoverAnchor)

  const renderListFunc = () => {
    switch (status) {
      case listStatusPost.ACTIVE:
        return (
          <>
            <ImgContainer onClick={() => handleOpenDialog(listDialog.EXPIRE, id)}>
              <ImgIcon width={'18px'} src={Images.expiredIcon} alt='#' />
              Đã hết hạn
            </ImgContainer>
          </>
        )
      case listStatusPost.INACTIVE:
        return (
          <>
            <ImgContainer onClick={() => handleOpenDialog(listDialog.EXTEND, id)}>
              <ImgIcon width={'18px'} src={Images.extendTimeIcon} alt='#' />
              Gia hạn bài đăng
            </ImgContainer>
          </>
        )
      case listStatusPost.REJECTED:
        return <></>
      case listStatusPost.WAITING_ACCEPTED:
        return (
          <>
            <ImgContainer onClick={() => handleOpenDialog(listDialog.ACCEPT, id)}>
              <ImgIcon width={'18px'} src={Images.acceptIcon} alt='#' />
              Phê duyệt
            </ImgContainer>
            <ImgContainer onClick={() => handleOpenDialog(listDialog.REJECT, id)}>
              <ImgIcon width={'18px'} src={Images.rejectIcon} alt='#' />
              Từ chối
            </ImgContainer>
          </>
        )

      default:
        break
    }
  }
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
            <ImgContainer onClick={() => navigate(`/posts/detail/${id}`)}>
              <ImgIcon width={'18px'} src={Images.viewIcon} alt='#' />
              Xem chi tiết
            </ImgContainer>
            {renderListFunc()}
          </div>
        </Typography>
      </Popover>
    </div>
  )
}

export default ActionColumn

const ImgIcon = styled.img`
  margin: 0 10px -3px 0;
`

const ImgContainer = styled.div`
  cursor: pointer;
  margin: 15px 10px;
`
