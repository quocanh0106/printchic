import { useState } from 'react'
import { styled } from 'styled-components'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { CHANGE_PASSWORD } from './fieldName'
import { changePasswordSchema } from './schema'

interface ChangePasswordProps {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

function SettingPassword() {
  const [openDialog, setOpenDialog] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit',
    resolver: yupResolver(changePasswordSchema)
  })
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const onSubmit: SubmitHandler<ChangePasswordProps> = (values) => {
    console.log('values', values)
  }

  const customDialogContent = (
    <div>
      <FormInput
        control={control}
        type={typeInputComponent.InputText}
        name={CHANGE_PASSWORD.OLD_PASSWORD}
        inputType={'password'}
        label={'Mật khẩu cũ'}
        placeholder={'Nhập mật khẩu cũ'}
        errorMessage={errors[CHANGE_PASSWORD.OLD_PASSWORD]?.message || ''}
        sx={{ marginBottom: '40px' }}
      />
      <FormInput
        control={control}
        type={typeInputComponent.InputText}
        name={CHANGE_PASSWORD.NEW_PASSWORD}
        inputType={'password'}
        label={'Mật khẩu mới'}
        placeholder={'Nhập mật khẩu mới'}
        errorMessage={errors[CHANGE_PASSWORD.NEW_PASSWORD]?.message || ''}
        sx={{ marginBottom: '40px' }}
      />
      <FormInput
        control={control}
        type={typeInputComponent.InputText}
        name={CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD}
        inputType={'password'}
        label={'Nhập lại mật khẩu mới'}
        placeholder={'Nhập lại mật khẩu mới'}
        errorMessage={errors[CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD]?.message || ''}
        sx={{ marginBottom: '20px' }}
      />
    </div>
  )

  return (
    <Container>
      <div>
        <CustomText type={TEXT_TYPE.primary_20_700}>Email: </CustomText>
        <CustomText type={TEXT_TYPE.primary_20_400}>lucyhale@gmail.com</CustomText>
      </div>
      <div>
        <CustomText type={TEXT_TYPE.primary_20_700}>Password: </CustomText>
        <CustomText type={TEXT_TYPE.primary_20_400}>********************</CustomText>
      </div>
      <ButtonContainer>
        <CustomBtn onClick={() => setOpenDialog(true)} width={'160px'} text={'Đổi mật khẩu'} />
      </ButtonContainer>
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title='Đổi mật khẩu'
        content={customDialogContent}
        onConfirm={handleSubmit(onSubmit)}
      />
    </Container>
  )
}

export default SettingPassword

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  width: 100%;
  border-radius: 8px;
  position: relative;
  padding: 20px;
  height: 200px;
`

const ButtonContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`
