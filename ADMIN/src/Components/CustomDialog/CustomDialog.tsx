import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import CustomBtn from '../CustomBtn/CustomBtn'
import CustomText, { TEXT_TYPE } from '../CustomText'

interface CustomDialogProps {
  textConfirm?: string
  textCancel?: string
  open: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
  onConfirm?: () => void
  hideCancelBtn?: boolean
  hideSubmitBtn?: boolean
  width?: string
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  textCancel,
  textConfirm,
  hideCancelBtn,
  hideSubmitBtn,
  width
}) => {
  return (
    <Dialog
      sx={{
        '& .MuiPaper-root': {
          maxWidth: '80vw',
          padding: '10px 20px',
          width: width ? width : '600px',
          borderRadius: '8px'
        }
      }}
      open={open}
      onClose={onClose}
      aria-labelledby='dialog-title'
    >
      <DialogTitle id='dialog-title'>
        <CustomText type={TEXT_TYPE.primary_32_700}>{title}</CustomText>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {hideCancelBtn || <CustomBtn onClick={onClose} type={'outlined'} text={textCancel || 'Hủy'} width={'100px'} />}
        {hideSubmitBtn || (
          <CustomBtn
            onClick={() => {
              onConfirm ? onConfirm() : onClose()
            }}
            text={textConfirm || 'OK'}
            width={'100px'}
          />
        )}
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
