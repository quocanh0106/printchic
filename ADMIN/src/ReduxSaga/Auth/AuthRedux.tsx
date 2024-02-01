import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { TOKEN_KEY } from '~/Constants'
import { setItem } from '~/Utils/AsyncStorage'
import { setTokenToAuthor } from '~/api/interceptors'

export interface AuthState {
  error: string
  profile: any
  loading: boolean
  isSignedIn: boolean | null
  dataSubmitBefore: any
}

const initialState: any = {
  isSignedIn: false,
  dataSubmitBefore: {}
}

const AuthRedux = createSlice({
  name: 'AuthRedux',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.dataSubmitBefore.login = action.payload
    },
    loginFailed: (state, action) => {
      switch (action.payload.statusCode) {
        case 40106:
          toast.error('Sai tài khoản hoặc mật khẩu')
          break

        default:
          break
      }
      state.isSignedIn = false
    },
    loginSuccess: (state, action) => {
      const { accessToken, userData } = action.payload
      console.log('accessToken, userData', accessToken, userData)
      state.isSignedIn = true
      state.profile = JSON.parse(userData)
      setTokenToAuthor(accessToken)
      setItem(TOKEN_KEY, accessToken)
      setItem('user_data', userData)
    },
    forgotPasswordInputEmailRequest: (state, action) => {
      state.dataSubmitBefore.forgotStep1 = action.payload
    },
    forgotPasswordInputEmailSuccess: (state, action) => {
      state.dataSubmitBefore.forgotStep1 = action.payload.data.email
      toast.success('Mã xác nhận đã được gửi về email của bạn.')
      action.payload.callBackSuccess()
    },
    forgotPasswordInputEmailFail: (state, action) => {
      state.dataSubmitBefore.forgotStep1 = ''
      switch (action.payload.statusCode) {
        case 40100:
          toast.error('Tài khoản vừa nhập không tồn tại')
          break

        default:
          break
      }
    },
    FWInputOTPRequest: (state, action) => {
      state.dataSubmitBefore.forgotStep2 = action.payload
    },
    FWInputOTPSuccess: (state, action) => {
      state.dataSubmitBefore.forgotStep2 = action.payload.data
      toast.success('Xác thực mã code thành công.')
      action.payload.callBackSuccess()
    },
    FWInputOTPFail: (state, action) => {
      state.dataSubmitBefore.forgotStep2 = ''
      switch (action.payload.statusCode) {
        case 40104:
          toast.error('Sai mã xác thực.')
          break

        default:
          break
      }
    },
    FWChangePasswordRequest: (state, action) => {
      state.dataSubmitBefore.forgotStep3 = action.payload
    },
    FWChangePasswordSuccess: (state, action) => {
      state.dataSubmitBefore.forgotStep3 = action.payload.data
      toast.success('Đặt lại mật khẩu thành công.')
      action.payload.callBackSuccess()
    },
    FWChangePasswordFail: (state, action) => {
      state.dataSubmitBefore.forgotStep3 = ''
      switch (action.payload.statusCode) {
        case 40103:
          toast.error('Mật khẩu và nhập lại mật khẩu không giống nhau.')
          break

        default:
          break
      }
    }
  }
})

export const AuthReduxActions = AuthRedux.actions

export default AuthRedux.reducer
