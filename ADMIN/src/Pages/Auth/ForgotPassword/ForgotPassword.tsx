import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { useAppDispatch } from '~/Hooks/useAppSelector'
import { AuthReduxActions } from '~/ReduxSaga/Auth/AuthRedux'
import logo from '../../../Assets/Images/Icons/logoFlex.png'
import { ChangeSchema, InputEmailSchema, InputOTPSchema } from '../schema'
import ChangePassword from './components/ChangePassword'
import InputEmail from './components/InputEmail'
import InputOTP from './components/InputOTP'
import { stepForgot } from './config'
import * as S from './style'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [stepForgotPassword, setStepForgotPassword] = useState(stepForgot.INPUT_EMAIL)

  useEffect(() => {
    setStepForgotPassword(stepForgot.INPUT_EMAIL)
  }, [])

  const renderView = () => {
    switch (stepForgotPassword) {
      case stepForgot.INPUT_EMAIL:
        return {
          schema: InputEmailSchema,
          component: <InputEmail />
        }
      case stepForgot.INPUT_OTP:
        return {
          schema: InputOTPSchema,
          component: <InputOTP currentEmail={'currentEmail'} />
        }
      case stepForgot.CHANGE_PASSWORD:
        return {
          schema: ChangeSchema,
          component: <ChangePassword />
        }
      default:
        return {
          schema: InputEmailSchema,
          component: <InputEmail />
        }
    }
  }

  const callBackSuccess = () => {
    switch (stepForgotPassword) {
      case stepForgot.INPUT_EMAIL:
        setStepForgotPassword(stepForgot.INPUT_OTP)
        break
      case stepForgot.INPUT_OTP:
        setStepForgotPassword(stepForgot.CHANGE_PASSWORD)
        break
      case stepForgot.CHANGE_PASSWORD:
        navigate('/login')
        break

      default:
        break
    }
  }

  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(renderView().schema)
  })

  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<any> = (values) => {
    console.log('value forgot password', values)
    switch (stepForgotPassword) {
      case stepForgot.INPUT_EMAIL:
        dispatch(
          AuthReduxActions.forgotPasswordInputEmailRequest({ email: values.email, callBackSuccess: callBackSuccess })
        )
        break
      case stepForgot.INPUT_OTP:
        dispatch(
          AuthReduxActions.FWInputOTPRequest({
            verifyCode:
              values.input_1 + values.input_2 + values.input_3 + values.input_4 + values.input_5 + values.input_6,
            email: values.email,
            callBackSuccess: callBackSuccess
          })
        )
        break
      case stepForgot.CHANGE_PASSWORD:
        dispatch(
          AuthReduxActions.FWChangePasswordRequest({
            password: values.password,
            confirmPassword: values.confirmPassword,
            email: values.email,
            callBackSuccess: callBackSuccess
          })
        )
        break

      default:
        break
    }
  }

  return (
    <S.Container>
      <div>
        <img width={'450px'} src={logo} alt='#' />
      </div>
      <div style={{ margin: '20px 0' }}>
        <CustomText type={TEXT_TYPE.primary_24_700}>{'Quên mật khẩu'}</CustomText>
      </div>
      <FormProvider {...methods}>
        {renderView().component}
        <CustomBtn
          width='100%'
          sx={{ marginTop: '30px' }}
          colorButton='yellow'
          onClick={handleSubmit(onSubmit)}
          text={'Tiếp tục'}
        />
      </FormProvider>
    </S.Container>
  )
}

export default ForgotPassword
