import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { globalLoading } from '~/Components/GlobalLoading'
import { client } from '~/api/client'
import { Endpoint, url } from '~/api/endpoint'
import { isSuccessResponse } from '~/api/interceptors'
import { DashboardReduxActions } from './DashboardRedux'

export function* watchDashboardSaga() {
  yield all([
    takeLatest(DashboardReduxActions.userDataRequest.type, getUserData),
    takeLatest(DashboardReduxActions.revenueDataRequest.type, getRevenueData),
    takeLatest(DashboardReduxActions.revenueByYearRequest.type, getRevenueByYearData)
  ])
}

function* getUserData(): any {
  globalLoading.show()
  try {
    const api = () => client.get(`${url.development}/${Endpoint.DASHBOARD_USER_DATA}`)
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(DashboardReduxActions.userDataSuccess(response.data.data))
    } else {
      yield put(DashboardReduxActions.userDataFailed(response.data))
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getRevenueData(): any {
  globalLoading.show()
  try {
    const api = () => client.get(`${url.development}/${Endpoint.DASHBOARD_REVENUE_DATA}`)
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(DashboardReduxActions.revenueDataSuccess(response.data.data))
    } else {
      yield put(DashboardReduxActions.revenueDataFailed(response.data))
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getRevenueByYearData(action: PayloadAction<any>): any {
  const { year } = action.payload
  globalLoading.show()
  try {
    const api = () => client.get(`${url.development}/${Endpoint.DASHBOARD_REVENUE_BY_YEAR}`, { year })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(DashboardReduxActions.revenueByYearSuccess(response.data.data))
    } else {
      yield put(DashboardReduxActions.revenueByYearFailed(response.data))
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}
