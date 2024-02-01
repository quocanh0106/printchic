import * as yup from 'yup'
import { PRICE_SETTING_FIELD_NAME } from './fieldName'
import { messages } from '~/Constants/Messages'

export const editPriceSchema = yup.object({
  [PRICE_SETTING_FIELD_NAME.CONTENT]: yup.string().required(messages.REQUIRED),
  [PRICE_SETTING_FIELD_NAME.PRICE]: yup.number().required(messages.REQUIRED),
  [PRICE_SETTING_FIELD_NAME.UNIT]: yup.string().required(messages.REQUIRED)
})
