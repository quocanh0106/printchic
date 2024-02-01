import { Popover, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Images } from '~/Themes'

interface ActionColumnProps {
  id?: string
}

function ActionColumn({ id }: ActionColumnProps) {
  const navigate = useNavigate()
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchor(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setPopoverAnchor(null)
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
            <ImgContainer onClick={() => navigate(`/news/detail/${id}`)}>
              <ImgIcon src={Images.viewIcon} alt='#' />
              Xem chi tiết
            </ImgContainer>
            <ImgContainer>
              <ImgIcon src={Images.showNewsIcon} alt='#' />
              Hiển thị bài
            </ImgContainer>
            <ImgContainer>
              <ImgIcon src={Images.trashIcon} alt='#' />
              Xóa
            </ImgContainer>
          </div>
        </Typography>
      </Popover>
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
