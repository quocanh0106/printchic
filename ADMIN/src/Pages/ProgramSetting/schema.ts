import * as yup from 'yup'
import { ADV_SETTING_CREATE_FIELD_NAME, PROGRAM_SETTING_FIELD_NAME } from './fieldName'
import { messages } from '~/Constants/Messages'

export const SearchAdvSettingSchema = yup.object({
  [PROGRAM_SETTING_FIELD_NAME.SEARCH]: yup.string()
})

export const createAdvSchema = yup.object({
  [ADV_SETTING_CREATE_FIELD_NAME.POSITION_ADV_MODAl]: yup.string().required(messages.REQUIRED),
  [ADV_SETTING_CREATE_FIELD_NAME.PACKAGE_ADV_MODAL]: yup.string().required(messages.REQUIRED),
  [ADV_SETTING_CREATE_FIELD_NAME.REVENUE_MODAL]: yup.string().required(messages.REQUIRED),
  [ADV_SETTING_CREATE_FIELD_NAME.NAME_ADV_MODAL]: yup.string().required(messages.REQUIRED),
  [ADV_SETTING_CREATE_FIELD_NAME.LINK_URL_MODAL]: yup.string().required(messages.REQUIRED),
  [ADV_SETTING_CREATE_FIELD_NAME.START_DATE_MODAL]: yup.string().required(messages.REQUIRED),
  [ADV_SETTING_CREATE_FIELD_NAME.END_DATE_MODAL]: yup.string().required(messages.REQUIRED)
})
