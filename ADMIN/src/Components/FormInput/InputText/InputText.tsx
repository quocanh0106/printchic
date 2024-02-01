import { FormControl, InputAdornment, InputLabel, TextField } from '@mui/material'

import { typeTextInput } from '~/Components/FormInput/helper'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { Colors, Images } from '~/Themes'
import { useState } from 'react'

const InputText = (props: any) => {
  const [hideShowPassword, setHideShowPassword] = useState(true)
  const { typeInput, maxLength, autoCapitalize, inputType, ...restProps } = props

  let _inputProps: any = {}
  if (props.inputProps) {
    _inputProps = { ...props.inputProps }
  }

  if (maxLength) {
    _inputProps = { ..._inputProps, maxLength }
  }

  const isDecimalNumber = (str: any) => /^\d{0,18}\.\d{0,1}$|^\d{0,20}$/.test(str)

  const onBlurHandle = (e: any) => {
    let value: any = e.target.value
    if (typeInput === typeTextInput.trimMiddleText) {
      value = value?.replace(/\s+/g, ' ')
      value = value.trim()
    }
    if (autoCapitalize && autoCapitalize === 'characters') {
      value = value?.toLocaleUpperCase()
    }
    if (props.onChange) {
      props.onChange(value)
    }
  }

  const onChangeHandle = (e: any) => {
    const value: any = e.target.value
    if (typeInput === typeTextInput.decimal) {
      if (isDecimalNumber(value)) {
        props.onChange(value)
      }
    } else {
      props.onChange(value)
    }
  }

  const handleShowAndHidePassword = () => {
    setHideShowPassword(!hideShowPassword)
  }

  return (
    <div style={{ width: props.fullWidth ? '100%' : 'unset' }}>
      {props.hiddenTitle ? (
        <></>
      ) : (
        <InputLabel shrink required={props.required}>
          <CustomText type={TEXT_TYPE.primary_18_700}>{props.label}</CustomText>
        </InputLabel>
      )}
      <FormControl variant='standard' sx={{ width: '100%' }}>
        <TextField
          {...restProps}
          label={''}
          autoComplete={''}
          onBlur={onBlurHandle}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '5px',
              height: '48px'
            },
            '& fieldset': {
              borderColor: Colors.primary
            },
            '& .Mui-disabled': {
              '-webkit-text-fill-color': Colors.primary
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: Colors.primary
            },
            '& .MuiInputBase-input::placeholder': {
              ...TEXT_TYPE.grey_16_400_italic
            },
            ...props.sx
          }}
          type={inputType ? (hideShowPassword ? inputType : null) : null}
          inputProps={{ ..._inputProps, autoComplete: 'off' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {props?.startIcon ? <img src={props?.startIcon} alt='icon' /> : <></>}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='start'>
                {props?.inputType === 'password' ? (
                  <img src={Images.hidePasswordIcon} onClick={() => handleShowAndHidePassword()} alt='icon' />
                ) : props?.endIcon ? (
                  <img src={props?.endIcon} alt='icon' />
                ) : (
                  <></>
                )}
              </InputAdornment>
            )
          }}
          value={props.value ? props.value : ''}
          onChange={onChangeHandle}
          InputLabelProps={{
            shrink: props.shrink ? props.shrink : true
          }}
        />
      </FormControl>
    </div>
  )
}

export default InputText
