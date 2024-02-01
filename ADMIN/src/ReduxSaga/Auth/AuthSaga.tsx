import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { globalLoading } from '~/Components/GlobalLoading'
import { client } from '~/api/client'
import { Endpoint, url } from '~/api/endpoint'
import { isSuccessResponse } from '~/api/interceptors'
import { AuthReduxActions } from './AuthRedux'

export function* watchAuthSaga() {
  yield all([
    takeLatest(AuthReduxActions.loginRequest.type, handleLogin),
    takeLatest(AuthReduxActions.forgotPasswordInputEmailRequest.type, handleInputEmailFW),
    takeLatest(AuthReduxActions.FWChangePasswordRequest.type, handleChangePasswordFW),
    takeLatest(AuthReduxActions.FWInputOTPRequest.type, handleInputOTPFW)
  ])
}

function* handleLogin(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { email, password } = action.payload
    const api = () => client.post(`${url.development}/${Endpoint.LOGIN_ADMIN}`, { email, password }, '')
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(
        AuthReduxActions.loginSuccess({
          accessToken: response.data.accessToken,
          userData: JSON.stringify(response.data.data)
        })
      )
    } else {
      yield put(AuthReduxActions.loginFailed(response.data))
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* handleInputEmailFW(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { email, callBackSuccess } = action.payload
    const api = () => client.post(`${url.development}/${Endpoint.FW_INPUT_EMAIL}`, { email }, '')
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AuthReduxActions.forgotPasswordInputEmailSuccess({ data: response.data.data, callBackSuccess }))
    } else {
      yield put(AuthReduxActions.forgotPasswordInputEmailFail(response.data))
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* handleInputOTPFW(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { verifyCode, email, callBackSuccess } = action.payload
    const api = () => client.post(`${url.development}/${Endpoint.FW_INPUT_OTP}`, { email, verifyCode }, '')
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AuthReduxActions.FWInputOTPSuccess({ data: response.data.data, callBackSuccess }))
    } else {
      yield put(AuthReduxActions.FWInputOTPFail(response.data))
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* handleChangePasswordFW(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { password, confirmPassword, email, callBackSuccess } = action.payload
    const api = () =>
      client.post(`${url.development}/${Endpoint.FW_CHANGE_PASSWORD}`, { email, password, confirmPassword }, '')
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AuthReduxActions.FWChangePasswordSuccess({ data: response.data.data, callBackSuccess }))
    } else {
      yield put(AuthReduxActions.FWChangePasswordFail(response.data))
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}
