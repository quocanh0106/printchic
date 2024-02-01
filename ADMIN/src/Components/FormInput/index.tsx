// @ts-nocheck
import { InputComponent, typeInputComponent } from './helper'
import { Controller } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'

interface FormInputProps {
  type: string
  control: any
  name: string
  defaultValue?: any
  formStyle?: any
  errors?: any
  clearErrors?: { (name: string): void }
  disabled?: boolean
  rules?: any
  typeInput?: any
  options?: any[]
  placeholder?: any
  label?: any
  value?: any
  inputProps?: any
  fullWidth?: boolean
  required?: boolean
  dateFormat?: string
  sx?: any
  labelPlacement?: string
  defaultChecked?: boolean
  hasBorderWrap?: boolean
  multiline?: boolean
  rows?: number
  maxRows?: number
  errorMessage?: any
  helperText?: any
  onChange?: any
  autoCapitalize?: string
  maxLength?: number
  inputType?: string
  onChangeCallBack?: any
  startIcon?: any
  endIcon?: any
  inputRef?: any
  width?: string
  hiddenTitle?: boolean
}

const FormInput = (props: FormInputProps) => {
  const {
    type = typeInputComponent.InputText,
    control,
    name,
    defaultValue = '',
    rules,
    errorMessage,
    ...inputProps
  } = props

  const valueRef = useRef(null)

  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    if (errorMessage && errorMessage !== '') {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }, [errorMessage])

  useEffect(() => {
    if (valueRef.current === null) {
    }
  }, [valueRef.current])

  const renderComponent = (params: any) => {
    const { value } = params
    if (value !== valueRef.current) {
      valueRef.current = value
    }

    const Input = InputComponent[type]

    const { ref, ...rest } = params
    return <Input.Component {...rest} {...inputProps} error={hasError} helperText={hasError ? errorMessage : null} />
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => renderComponent(field)}
        rules={rules}
      />
    </>
  )
}

export default FormInput
