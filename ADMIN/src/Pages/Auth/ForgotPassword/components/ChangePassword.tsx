import { useFormContext } from 'react-hook-form'
import { FormInput } from '~/Components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { AUTH_FIELD_NAME } from '../../fieldName'

function ChangePassword() {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <CustomText block type={TEXT_TYPE.primary_18_700} customStyle={{ fontWeight: '400', margin: '20px 0' }}>
        {'Vui lòng đặt mặt khẩu của bạn'}
      </CustomText>
      <div>
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={AUTH_FIELD_NAME.PASSWORD}
          inputType={'password'}
          label={'Mật khẩu'}
          placeholder={'Nhập mật khẩu'}
          errorMessage={errors[AUTH_FIELD_NAME.PASSWORD]?.message || ''}
          sx={{ marginBottom: '40px' }}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={AUTH_FIELD_NAME.CONFIRM_PASSWORD}
          inputType={'password'}
          label={'Nhập lại mật khẩu'}
          placeholder={'Nhập mật khẩu'}
          errorMessage={errors[AUTH_FIELD_NAME.CONFIRM_PASSWORD]?.message || ''}
          sx={{ marginBottom: '20px' }}
        />
      </div>
    </div>
  )
}

export default ChangePassword
