import * as yup from 'yup'
import { messages } from '~/Constants/Messages'
import { CHANGE_PASSWORD } from './fieldName'

export const changePasswordSchema = yup.object({
  [CHANGE_PASSWORD.OLD_PASSWORD]: yup
    .string()
    .required(messages.REQUIRED)
    .test('passwords-not-same', 'Mật khẩu mới và mật khẩu cũ phải khác nhau', function (value) {
      return value !== this.parent[CHANGE_PASSWORD.NEW_PASSWORD]
    }),
  [CHANGE_PASSWORD.NEW_PASSWORD]: yup.string().required(messages.REQUIRED),
  [CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD]: yup
    .string()
    .required(messages.REQUIRED)
    .test('passwords-match', 'Mật khẩu mới và mật khẩu nhập lại phải giống nhau', function (value) {
      return value === this.parent[CHANGE_PASSWORD.NEW_PASSWORD]
    })
})
