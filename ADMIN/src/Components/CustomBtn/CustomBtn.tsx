import { Button } from '@mui/material'
import { Colors } from '~/Themes'
import CustomText, { TEXT_TYPE } from '../CustomText'

interface ButtonProps {
  text: string
  type?: 'contained' | 'outlined'
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  disabled?: boolean
  onClick?: any
  sx?: any
  width?: string
  colorButton?: 'yellow'
}

function CustomBtn(props: ButtonProps) {
  return (
    <Button
      variant={props.type || 'contained'}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      onClick={props?.onClick}
      sx={{
        '&.MuiButtonBase-root': {
          outline: 'none',
          width: props?.width ? props?.width : ''
        },
        borderColor:
          props.colorButton === 'yellow' ? Colors.secondary : props.type === 'outlined' ? Colors.primary : 'unset',
        borderRadius: '8px',
        textTransform: 'capitalize',
        backgroundColor:
          props.colorButton === 'yellow' ? Colors.secondary : props.type === 'outlined' ? Colors.white : Colors.primary,
        padding: '7px 25px',
        height: '48px',
        '&:hover': {
          backgroundColor:
            props.colorButton === 'yellow'
              ? Colors.secondary
              : props.type === 'outlined'
              ? Colors.white
              : Colors.primaryDark
        },
        ...props?.sx
      }}
      disabled={props.disabled}
    >
      <CustomText block type={props.type === 'outlined' ? TEXT_TYPE.primary_16_700 : TEXT_TYPE.white_16_600}>
        {props.text}
      </CustomText>
    </Button>
  )
}

export default CustomBtn
