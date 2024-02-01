import { useState } from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

import Colors from '~/Themes/Colors'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'

interface IOption {
  value: string | number
  label: string
}

const SelectFieldMui = (props: any) => {
  const { value, onChangeCallBack } = props
  const [shrink, setShrink] = useState(true)
  const RenderValue = (selected: any, text: string) => {
    if (!props.value || props.value === '') {
      if (props.notched || shrink) {
        return <span style={TEXT_TYPE.grey_16_400_italic}>{props.placeholder ?? 'Chọn' + text}</span>
      } else {
        return ''
      }
    } else {
      return props.options ? props.options?.find((o: IOption) => o.value === selected)?.label : ''
    }
  }

  const onChangeHandle = (e: any) => {
    const value: any = e.target.value
    props.onChange && props.onChange(value)
    onChangeCallBack && onChangeCallBack(value)
  }

  return (
    <div style={{ width: props.fullWidth ? '100%' : 'unset' }}>
      <InputLabel
        id={props.name + '-select-outlined-label'}
        shrink={value && value !== '' ? true : props.notched ?? shrink}
        error={props.error}
        required={props.required}
      >
        <CustomText type={TEXT_TYPE.primary_18_700}>{props.label}</CustomText>
      </InputLabel>
      <FormControl variant={props.variant ?? 'outlined'} sx={{ width: '100%' }}>
        <Select
          disabled={props.disabled}
          labelId={props.name + '-select-outlined-label'}
          id={props.name + '-select-outlined'}
          displayEmpty={value && value !== '' ? true : props.notched ?? shrink}
          MenuProps={{
            style: {
              maxHeight: 400
            }
          }}
          sx={{
            height: '48px',
            borderRadius: '5px',
            '& fieldset': {
              borderColor: `${Colors.primary} !important` // Change this to your desired border color
            },
            ...props.sx
          }}
          value={value && value !== '' ? value : ''}
          onChange={onChangeHandle}
          renderValue={(selected) => RenderValue(selected, ` ${props.label ?? ''}`)}
          onFocus={() => setShrink(true)}
          // onBlur={() => setShrink(false)}
          size={props.size}
          notched={value && value !== '' ? true : props.notched ?? shrink}
          error={props.error}
        >
          {props.options ? (
            props.options?.map((o: IOption, i: number) => (
              <MenuItem key={i} value={o.value}>
                {o.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Không có dữ liệu</MenuItem>
          )}
        </Select>
        {props.helperText && (
          <FormHelperText error={props.error} id={props.name + '-helper-text'}>
            {props.helperText}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

export default SelectFieldMui
