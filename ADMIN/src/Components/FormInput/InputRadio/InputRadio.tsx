import { Box, FormHelperText, InputLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { Colors } from '~/Themes'
import { FormHelperSx, MuiFormControlSx, WrapRadioGroupBoxSx } from './styles'

const InputRadio = (props: any) => {
  const { hasBorderWrap, fullWidth, helperText, error, ...rest } = props
  const renderInputRadio = () => {
    return (
      <>
        {props.hiddenTitle ? (
          <></>
        ) : (
          <FormControl variant='standard' sx={{ marginBottom: '25px' }}>
            <InputLabel shrink>
              <CustomText type={TEXT_TYPE.primary_16_400}>{props.label}</CustomText>
            </InputLabel>
          </FormControl>
        )}
        <Box
          component='div'
          sx={{
            ...WrapRadioGroupBoxSx,
            borderColor: error ? Colors.primary : WrapRadioGroupBoxSx.borderColor,
            border: hasBorderWrap || 'none'
          }}
        >
          <RadioGroup
            column
            aria-labelledby={props.name + '-row-radio-buttons-group-label'}
            name={props.name}
            {...rest}
            sx={{
              '& .Mui-checked': {
                color: `${Colors.secondary} !important`
              },
              '& .MuiFormControlLabel-label': {
                color: `${Colors.primary} !important`
              }
            }}
          >
            {props.options &&
              props.options.map((item: any, i: number) => (
                <FormControlLabel key={i} value={item.value} control={<Radio />} label={item.label} />
              ))}
          </RadioGroup>
        </Box>
        {error && <FormHelperText sx={{ ...FormHelperSx, color: 'red' }}>{helperText}</FormHelperText>}
      </>
    )
  }

  return (
    <Box component='div' sx={{ width: fullWidth ? '100%' : 'auto' }}>
      <FormControl sx={MuiFormControlSx}>{renderInputRadio()}</FormControl>
    </Box>
  )
}

export default InputRadio
