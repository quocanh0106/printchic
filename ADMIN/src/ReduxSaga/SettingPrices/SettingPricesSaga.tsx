import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { globalLoading } from '~/Components/GlobalLoading'
import { client } from '~/api/client'
import { Endpoint, url } from '~/api/endpoint'
import { isSuccessResponse } from '~/api/interceptors'
import { SettingPricesReduxActions } from './SettingPricesRedux'

export function* watchSettingPricesSaga() {
  yield all([
    takeLatest(SettingPricesReduxActions.getListConfigsRequest.type, getListConfigs),
    takeLatest(SettingPricesReduxActions.updateSettingPricesRequest.type, updateSettingPrices)
  ])
}

function* getListConfigs(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { status, page, searchParams } = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.LIST_CONFIG}`, { status, page, ...searchParams })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(SettingPricesReduxActions.getListConfigsSuccess(response.data.data))
    } else {
      yield put(SettingPricesReduxActions.getListConfigsFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* updateSettingPrices(action: PayloadAction<any>): any {
  globalLoading.show()

  const { body } = action.payload
  try {
    const api = () => client.put(`${url.development}/${Endpoint.UPDATE_CONFIG}`, body, {})
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(SettingPricesReduxActions.updateSettingPricesSuccess())
    } else {
      yield put(SettingPricesReduxActions.updateSettingPricesFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}
