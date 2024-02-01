/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { globalLoading } from '~/Components/GlobalLoading'
import { client } from '~/api/client'
import { Endpoint, url } from '~/api/endpoint'
import { isSuccessResponse } from '~/api/interceptors'
import { HRReduxActions } from './HRRedux'

export function* watchHRSaga() {
  yield all([
    takeLatest(HRReduxActions.HRRequest.type, getListEmployer),
    takeLatest(HRReduxActions.HRRechargeRequest.type, RechargeUser),
    takeLatest(HRReduxActions.DetailHRRequest.type, getDetailHR),
    takeLatest(HRReduxActions.ListPostHRRequest.type, getListPostHR),
    takeLatest(HRReduxActions.ListHistoryHRRequest.type, getListHistoryHR),
    takeLatest(HRReduxActions.BlockUserHRRequest.type, blockUserHR),
    takeLatest(HRReduxActions.TopHRRequest.type, setAndRemoveTopHR)
  ])
}

function* getListEmployer(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { type, page, searchParams } = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.LIST_DATA}`, { type, page, ...searchParams })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(HRReduxActions.HRSuccess(response.data.data))
    } else {
      yield put(HRReduxActions.HRFailed())
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* RechargeUser(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { userObjId, chargingMoney, from } = action.payload
    const api = () => client.put(`${url.development}/${Endpoint.RECHARGE_USER}`, { userObjId, chargingMoney }, '')
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(HRReduxActions.HRRechargeSuccess({ data: response.data, from }))
    } else {
      yield put(HRReduxActions.HRRechargeFailed())
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getDetailHR(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { id } = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.DETAIL_USER}`, { userObjId: id })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(HRReduxActions.DetailHRSuccess(response.data.data))
    } else {
      yield put(HRReduxActions.DetailHRFailed())
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getListPostHR(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { id, page } = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.LIST_POST_HR}`, { userObjId: id, page })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(HRReduxActions.ListPostHRSuccess(response.data.data))
    } else {
      yield put(HRReduxActions.ListPostHRFailed())
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getListHistoryHR(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { id, page, queryParams } = action.payload
    const api = () =>
      client.get(`${url.development}/${Endpoint.LIST_HISTORY_HR}`, { userObjId: id, page, ...queryParams })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(HRReduxActions.ListHistoryHRSuccess(response.data.data))
    } else {
      yield put(HRReduxActions.ListHistoryHRFailed())
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* blockUserHR(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { userObjId, status, fromScreen } = action.payload
    console.log('status', status)
    const api = () =>
      client.put(
        `${url.development}/${status === 'ACTIVE' ? Endpoint.BLOCK_USER : Endpoint.UNLOCK_USER}`,
        { userObjId },
        ''
      )
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(HRReduxActions.BlockUserHRSuccess({ data: response.data.data, fromScreen: fromScreen, status: status }))
    } else {
      yield put(HRReduxActions.BlockUserHRFailed())
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* setAndRemoveTopHR(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { userObjId, isTopHR, fromScreen } = action.payload
    console.log('userObjId', userObjId)
    const api = () =>
      client.put(
        `${url.development}/${isTopHR ? Endpoint.REMOVE_TOP_HR : Endpoint.SET_TOP_HR}`,
        { userObjId: userObjId },
        ''
      )
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(HRReduxActions.TopHRSuccess({ data: response.data.data, fromScreen: fromScreen, isTopHR: isTopHR }))
    } else {
      yield put(HRReduxActions.TopHRFailed())
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}
