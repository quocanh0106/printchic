import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { globalLoading } from '~/Components/GlobalLoading'
import { client } from '~/api/client'
import { Endpoint, url } from '~/api/endpoint'
import { isSuccessResponse } from '~/api/interceptors'
import { CandidateReduxActions } from './CandidateRedux'

export function* watchCandidateSaga() {
  yield all([
    takeLatest(CandidateReduxActions.CandidateRequest.type, getListEmployer),
    takeLatest(CandidateReduxActions.DetailCandidateRequest.type, getDetailCandidate),
    takeLatest(CandidateReduxActions.BlockUserCandidateRequest.type, blockUserCandidate)
  ])
}

function* getListEmployer(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { type, page, searchParams } = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.LIST_DATA}`, { type, page, ...searchParams })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(CandidateReduxActions.CandidateSuccess(response.data.data))
    } else {
      yield put(CandidateReduxActions.CandidateFailed())
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getDetailCandidate(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { id } = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.DETAIL_USER}`, { userObjId: id })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(CandidateReduxActions.DetailCandidateSuccess(response.data.data))
    } else {
      yield put(CandidateReduxActions.DetailCandidateFailed())
      // wrongPasswordOrUsername(response.data.message)
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* blockUserCandidate(action: PayloadAction<any>): any {
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
      yield put(
        CandidateReduxActions.BlockUserCandidateSuccess({
          data: response.data.data,
          fromScreen: fromScreen,
          status: status
        })
      )
    } else {
      yield put(CandidateReduxActions.BlockUserCandidateFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}
