import * as yup from 'yup'
import { NEWS_FIELD_NAME } from './fieldName'
import { messages } from '~/Constants/Messages'

export const createNewsSchema = yup.object({
  [NEWS_FIELD_NAME.STATUS]: yup.string().required(messages.REQUIRED),
  [NEWS_FIELD_NAME.IMAGE_1]: yup.string().required(messages.REQUIRED),
  [NEWS_FIELD_NAME.IMAGE_2]: yup.string().required(messages.REQUIRED),
  [NEWS_FIELD_NAME.TITLE]: yup.string().required(messages.REQUIRED),
  [NEWS_FIELD_NAME.CONTENT]: yup.string().required(messages.REQUIRED)
})
