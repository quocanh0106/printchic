import * as yup from 'yup'
import { POST_FIELD_NAME } from './fieldName'
import { messages } from '~/Constants/Messages'

export const SearchPostsSchema = yup.object({
  [POST_FIELD_NAME.SEARCH]: yup.string(),
  [POST_FIELD_NAME.CREATED_AT]: yup.string(),
  [POST_FIELD_NAME.STATUS]: yup.string()
})

export const SubmitReasonSchema = yup.object({
  [POST_FIELD_NAME.REASON]: yup.string().required(messages.REQUIRED)
})
