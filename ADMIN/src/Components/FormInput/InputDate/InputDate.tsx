import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { Colors } from '~/Themes'

const InputDate = (props: any) => {
  const handleOnchange = (e: any) => {
    props?.onChange(moment(e).format('DD/MM/YYYY'))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        sx={{
          width: props.width ? props.width : 'unset',
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.primary
          },
          '& .MuiInputBase-root': {
            height: 48
          },
          'button:focus': {
            outline: 'none'
          },
          label: {
            color: Colors.primary,
            top: '-3px'
          },
          input: {
            color: Colors.primary
          }
        }}
        onChange={handleOnchange}
        label={props.label ? props.label : ''}
        format={'DD/MM/YYYY'}
        slotProps={{
          textField: {
            helperText: props?.errorMessage ? props?.errorMessage : ''
          }
        }}
      />

      {/* <DatePicker
        {...props}
        dayOfWeekFormatter={(day) => day}
        inputFormat={props.dateFormat ? props.dateFormat : 'DD/MM/YYYY'}
        renderInput={(params: any) => (
          <TextField
            {...params}
            fullWidth={props.fullWidth}
            InputLabelProps={{
              shrink: props.shrink ? props.shrink : true
            }}
            required={props.required}
            error={props.error}
            helperText={props.helperText}
            inputProps={{
              ...params.inputProps,
              placeholder: props.placeholder ? props.placeholder : 'Chọn'
            }}
          />
        )}
      /> */}
    </LocalizationProvider>
  )
}

export default InputDate
