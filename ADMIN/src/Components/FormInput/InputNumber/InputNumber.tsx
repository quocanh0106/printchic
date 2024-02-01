import { TextField } from '@mui/material'

const InputNumber = (props: any) => {
  return (
    <TextField
      {...props}
      type='number'
      InputLabelProps={{
        shrink: props.shrink ? props.shrink : true
      }}
    />
  )
}

export default InputNumber
