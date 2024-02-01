import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
// import LogoImg from '~/Assets/Images/Icons/logo.jpg'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { FlexBoxColumn, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { useAppDispatch } from '~/Hooks/useAppSelector'
import { AuthReduxActions } from '~/ReduxSaga/Auth/AuthRedux'
import { Colors } from '~/Themes'
import logo from '../../../Assets/Images/Icons/logoFlex.png'
import { AUTH_FIELD_NAME } from '../fieldName'
import { LoginSchema } from '../schema'
import * as S from './style'
import { useTranslation } from 'react-i18next'
type InputsLogin = {
  email: string
  password: string
}

function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginSchema)
  })
  const dispatch = useAppDispatch()

  // const wrongPasswordOrUsername = (text: string) => {
  //   setError(AUTH_FIELD_NAME.USERNAME, { type: 'custom', message: text })
  //   toast.error(text)
  // }

  const onSubmit: SubmitHandler<InputsLogin> = (values) => {
    dispatch(AuthReduxActions.loginRequest({ email: values.email, password: values.password }))
  }
  return (
    <S.Container>
      <img width={'450px'} src={logo} alt='#' />
      <S.GroupFormInput>
        <FlexBoxColumn>
          <CustomText type={TEXT_TYPE.primary_24_700} customStyle={{ margin: '15px 0 5px 0' }}>
          {t('login.title')}
          </CustomText>
          <CustomText type={TEXT_TYPE.primary_18_700} customStyle={{ margin: '15px 0', fontWeight: '400' }}>
            {'Chào mừng bạn đến Lorep ipsum. '}
          </CustomText>
        </FlexBoxColumn>
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={AUTH_FIELD_NAME.EMAIL}
          label={'Email'}
          placeholder={'Nhập Email'}
          errorMessage={errors[AUTH_FIELD_NAME.EMAIL]?.message || ''}
          sx={{ marginBottom: '50px' }}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={AUTH_FIELD_NAME.PASSWORD}
          inputType={'password'}
          label={'Mật khẩu'}
          placeholder={'Nhập mật khẩu'}
          errorMessage={errors[AUTH_FIELD_NAME.PASSWORD]?.message || ''}
        />
        <FlexBoxSpaceBetween style={{ margin: '30px 0' }}>
          <FlexBoxSpaceBetween>
            <Checkbox sx={{ color: Colors.neutral_gray_4 }} />
            <CustomText type={TEXT_TYPE.primary_16_400} customStyle={{ color: Colors.neutral_gray_1, fontWeight: 400 }}>
              {'Nhớ mật khẩu'}
            </CustomText>
          </FlexBoxSpaceBetween>
          <div onClick={() => navigate('/forgot-password')}>
            <CustomText pointerCursor type={TEXT_TYPE.primary_16_400}>
              <CustomText type={TEXT_TYPE.primary_16_400} customStyle={{ color: Colors.semantic }}>
                {'Quên mật khẩu?'}
              </CustomText>
            </CustomText>
          </div>
        </FlexBoxSpaceBetween>
        <CustomBtn width='100%' colorButton='yellow' onClick={handleSubmit(onSubmit)} text={'Đăng nhập'} />
      </S.GroupFormInput>
    </S.Container>
  )
}

export default Login
