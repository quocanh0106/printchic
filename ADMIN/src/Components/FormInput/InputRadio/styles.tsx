import { Colors, FontTypes } from '~/Themes'

export const MuiFormControlSx = {
  width: '100%'
}

export const WrapRadioGroupBoxSx = {
  borderRadius: '12px',
  border: '1px solid',
  borderColor: Colors.primary,
  padding: '6px 12px'
}

export const FormLabelSx = {
  '&.MuiFormLabel-root': {
    fontFamily: FontTypes.InterRegular,
    fontSize: 12,
    color: Colors.primary,
    position: 'absolute',
    top: -8,
    left: 12,
    backgroundColor: Colors.primary,
    paddingLeft: '4px',
    paddingRight: '4px'
  },
  '&.MuiFormLabel-root.Mui-required': { color: Colors.primary },
  '&.MuiFormLabel-root.Mui-error': { color: Colors.primary },
  '& span.MuiFormLabel-asterisk': { color: Colors.primary }
}

export const FormHelperSx = {
  color: Colors.primary
}
