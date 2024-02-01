import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormInput } from '~/Components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { OTP_AUTH_NAME } from '../../fieldName'

interface InputOTPProps {
  currentEmail: string
  resendOTP?: () => void
}

function InputOTP({ currentEmail, resendOTP }: InputOTPProps) {
  console.log('currentEmail', currentEmail)
  const {
    clearErrors,
    setValue,
    control,
    formState: { errors }
  } = useFormContext()
  const InputRef_1: any = useRef(null)
  const InputRef_2: any = useRef(null)
  const InputRef_3: any = useRef(null)
  const InputRef_4: any = useRef(null)
  const InputRef_5: any = useRef(null)
  const InputRef_6: any = useRef(null)
  return (
    <div>
      <CustomText block type={TEXT_TYPE.primary_18_700} customStyle={{ fontWeight: '400', margin: '30px 0' }}>
        Mã xác minh đã được gửi đến email bạn đã đăng ký. Vui lòng kiểm tra và nhập mã xác minh vào bên dưới.
      </CustomText>
      <FlexBoxSpaceBetween>
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={OTP_AUTH_NAME.INPUT_1}
          inputRef={InputRef_1}
          onChange={(value: string) => {
            setValue(OTP_AUTH_NAME.INPUT_1, value.charAt(0))
            if (value.length === 1) {
              clearErrors(OTP_AUTH_NAME.INPUT_1)
              InputRef_2.current.focus()
            }
          }}
          sx={{
            '& .MuiInputBase-root': {
              width: '54px',
              borderRadius: '16px',
              paddingRight: '0',
              paddingLeft: '17px',
              fontSize: '16px',
              backgroundColor: '#F9F9F9',
              fontWeight: 'bold'
            },
            '& fieldset': {
              border: errors[OTP_AUTH_NAME.INPUT_1] ? '1px red solid' : 'none'
            }
          }}
          label={''}
          placeholder={'-'}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={OTP_AUTH_NAME.INPUT_2}
          inputRef={InputRef_2}
          onChange={(value: string) => {
            setValue(OTP_AUTH_NAME.INPUT_2, value.charAt(0))
            if (value.length === 1) {
              clearErrors(OTP_AUTH_NAME.INPUT_2)
              InputRef_3.current.focus()
            }
          }}
          sx={{
            '& .MuiInputBase-root': {
              width: '54px',
              borderRadius: '16px',
              fontSize: '16px',
              paddingRight: '0',
              paddingLeft: '17px',
              backgroundColor: '#F9F9F9',
              fontWeight: 'bold'
            },
            '& fieldset': {
              border: errors[OTP_AUTH_NAME.INPUT_2] ? '1px red solid' : 'none'
            }
          }}
          label={''}
          placeholder={'-'}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={OTP_AUTH_NAME.INPUT_3}
          inputRef={InputRef_3}
          onChange={(value: string) => {
            setValue(OTP_AUTH_NAME.INPUT_3, value.charAt(0))
            if (value.length === 1) {
              clearErrors(OTP_AUTH_NAME.INPUT_3)
              InputRef_4.current.focus()
            }
          }}
          sx={{
            '& .MuiInputBase-root': {
              width: '54px',
              borderRadius: '16px',
              fontSize: '16px',
              paddingRight: '0',
              paddingLeft: '17px',
              backgroundColor: '#F9F9F9',
              fontWeight: 'bold'
            },
            '& fieldset': {
              border: errors[OTP_AUTH_NAME.INPUT_3] ? '1px red solid' : 'none'
            }
          }}
          label={''}
          placeholder={'-'}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={OTP_AUTH_NAME.INPUT_4}
          inputRef={InputRef_4}
          onChange={(value: string) => {
            setValue(OTP_AUTH_NAME.INPUT_4, value.charAt(0))
            if (value.length === 1) {
              clearErrors(OTP_AUTH_NAME.INPUT_4)
              InputRef_5.current.focus()
            }
          }}
          sx={{
            '& .MuiInputBase-root': {
              width: '54px',
              borderRadius: '16px',
              fontSize: '16px',
              paddingRight: '0',
              paddingLeft: '17px',
              backgroundColor: '#F9F9F9',
              fontWeight: 'bold'
            },
            '& fieldset': {
              border: errors[OTP_AUTH_NAME.INPUT_4] ? '1px red solid' : 'none'
            }
          }}
          label={''}
          placeholder={'-'}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={OTP_AUTH_NAME.INPUT_5}
          inputRef={InputRef_5}
          onChange={(value: string) => {
            setValue(OTP_AUTH_NAME.INPUT_5, value.charAt(0))
            if (value.length === 1) {
              clearErrors(OTP_AUTH_NAME.INPUT_5)
              InputRef_6.current.focus()
            }
          }}
          sx={{
            '& .MuiInputBase-root': {
              width: '54px',
              borderRadius: '16px',
              fontSize: '16px',
              paddingRight: '0',
              paddingLeft: '17px',
              backgroundColor: '#F9F9F9',
              fontWeight: 'bold'
            },
            '& fieldset': {
              border: errors[OTP_AUTH_NAME.INPUT_5] ? '1px red solid' : 'none'
            }
          }}
          label={''}
          placeholder={'-'}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={OTP_AUTH_NAME.INPUT_6}
          inputRef={InputRef_6}
          onChange={(value: string) => {
            setValue(OTP_AUTH_NAME.INPUT_6, value.charAt(0))
            if (value.length === 1) {
              clearErrors(OTP_AUTH_NAME.INPUT_6)
            }
          }}
          sx={{
            '& .MuiInputBase-root': {
              width: '54px',
              borderRadius: '16px',
              backgroundColor: '#F9F9F9',
              fontSize: '16px',
              paddingRight: '0',
              paddingLeft: '17px',
              fontWeight: 'bold'
            },
            '& fieldset': {
              border: errors[OTP_AUTH_NAME.INPUT_6] ? '1px red solid' : 'none'
            }
          }}
          label={''}
          placeholder={'-'}
        />
      </FlexBoxSpaceBetween>
      <CustomText block type={TEXT_TYPE.primary_16_400} customStyle={{ marginTop: '30px', color: '#9CA3AF' }}>
        Bạn chưa nhận được mã xác minh?
        <span onClick={resendOTP}>
          <CustomText type={TEXT_TYPE.primary_16_700} customStyle={{ color: '#4B92FF' }}>
            &nbsp;Gửi lại
          </CustomText>
        </span>
      </CustomText>
    </div>
  )
}

export default InputOTP
