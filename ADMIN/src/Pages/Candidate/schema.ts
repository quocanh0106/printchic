import * as yup from 'yup'
import { CANDIDATE_FIELD_NAME } from './fieldName'

export const SearchCandidateSchema = yup.object({
  [CANDIDATE_FIELD_NAME.SEARCH]: yup.string(),
  [CANDIDATE_FIELD_NAME.COUNTRY]: yup.string(),
  [CANDIDATE_FIELD_NAME.STATUS]: yup.string()
})
