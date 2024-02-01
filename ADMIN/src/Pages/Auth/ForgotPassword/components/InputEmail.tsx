import { useFormContext } from 'react-hook-form'
import { FormInput } from '~/Components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { AUTH_FIELD_NAME } from '../../fieldName'

function InputEmail() {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <CustomText type={TEXT_TYPE.primary_18_700} customStyle={{ fontWeight: '400', margin: '20px 0' }}>
        {'Vui lòng nhập email của bạn.'}
      </CustomText>
      <div style={{ marginTop: '20px' }}>
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={AUTH_FIELD_NAME.EMAIL}
          label={'Email'}
          placeholder={'Nhập Email'}
          errorMessage={errors[AUTH_FIELD_NAME.EMAIL]?.message || ''}
        />
      </div>
    </div>
  )
}

export default InputEmail
