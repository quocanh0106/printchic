import { messages } from '~/Constants/Messages'
import { AUTH_FIELD_NAME, OTP_AUTH_NAME } from './fieldName'
import * as yup from 'yup'
import { REGEX } from '~/Constants/Regex'

export const LoginSchema = yup.object({
  [AUTH_FIELD_NAME.EMAIL]: yup.string().required(messages.REQUIRED),
  [AUTH_FIELD_NAME.PASSWORD]: yup.string().required(messages.REQUIRED)
})

export const InputEmailSchema = yup.object({
  [AUTH_FIELD_NAME.EMAIL]: yup.string().required(messages.REQUIRED)
})

export const InputOTPSchema = yup.object({
  [OTP_AUTH_NAME.INPUT_1]: yup.string().required(messages.REQUIRED),
  [OTP_AUTH_NAME.INPUT_2]: yup.string().required(messages.REQUIRED),
  [OTP_AUTH_NAME.INPUT_3]: yup.string().required(messages.REQUIRED),
  [OTP_AUTH_NAME.INPUT_4]: yup.string().required(messages.REQUIRED),
  [OTP_AUTH_NAME.INPUT_5]: yup.string().required(messages.REQUIRED),
  [OTP_AUTH_NAME.INPUT_6]: yup.string().required(messages.REQUIRED)
})

export const ChangeSchema = yup.object({
  [AUTH_FIELD_NAME.PASSWORD]: yup.string().required(messages.REQUIRED),
  [AUTH_FIELD_NAME.CONFIRM_PASSWORD]: yup.string().required(messages.REQUIRED)
})

export const RegisterSchema = yup.object({
  [AUTH_FIELD_NAME.EMAIL]: yup.string().required(messages.REQUIRED).matches(REGEX.EMAIL, messages.REGEX_EMAIL),
  [AUTH_FIELD_NAME.USERNAME]: yup.string().required(messages.REQUIRED),
  [AUTH_FIELD_NAME.PASSWORD]: yup.string().required(messages.REQUIRED),
  [AUTH_FIELD_NAME.CONFIRM_PASSWORD]: yup
    .string()
    .oneOf([yup.ref(AUTH_FIELD_NAME.PASSWORD)], 'Passwords must match')
    .required(messages.REQUIRED),
  [AUTH_FIELD_NAME.GENDER]: yup.string().required(messages.REQUIRED)
})
