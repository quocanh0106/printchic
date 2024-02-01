import * as yup from 'yup'
import { EMPLOYER_FIELD_NAME } from './fieldName'
import { messages } from '~/Constants/Messages'

export const SearchEmployerSchema = yup.object({
  [EMPLOYER_FIELD_NAME.SEARCH]: yup.string(),
  [EMPLOYER_FIELD_NAME.STATUS]: yup.string()
})

export const rechargeSchema = yup.object({
  [EMPLOYER_FIELD_NAME.RECHARGE]: yup.string().required(messages.REQUIRED)
})
