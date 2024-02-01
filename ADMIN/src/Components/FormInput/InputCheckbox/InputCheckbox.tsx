import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const InputCheckbox = (props: any) => {
  const { fullWidth, helperText, error, ref, ...rest } = props
  return (
    <FormControlLabel
      control={<Checkbox {...rest} inputRef={ref} value={!!props.value} checked={!!props.value} />}
      label={props.label}
      labelPlacement={props.labelPlacement ? props.labelPlacement : 'end'}
    />
  )
}

export default InputCheckbox
