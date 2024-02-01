import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest, delay } from 'redux-saga/effects'
import { globalLoading } from '~/Components/GlobalLoading'
import { client } from '~/api/client'
import { Endpoint, url } from '~/api/endpoint'
import { isSuccessResponse } from '~/api/interceptors'
import { PostsReduxActions } from './PostsRedux'

export function* watchPostsSaga() {
  yield all([
    takeLatest(PostsReduxActions.getListPostsRequest.type, getListPosts),
    takeLatest(PostsReduxActions.getPostDetailRequest.type, getPostDetail),
    takeLatest(PostsReduxActions.extendPostsRequest.type, extendPosts),
    takeLatest(PostsReduxActions.expiredPostsRequest.type, expiredPosts),
    takeLatest(PostsReduxActions.acceptOrRejectPostsRequest.type, acceptOrRejectPosts)
  ])
}

function* getListPosts(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { status, page, searchParams } = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.LIST_POSTS}`, { status, page, ...searchParams })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(PostsReduxActions.getListPostsSuccess(response.data.data))
    } else {
      yield put(PostsReduxActions.getListPostsFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getPostDetail(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { postObjId } = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.POST_DETAIL}`, { postObjId })
    const response = yield call(api)
    delay(500)
    if (isSuccessResponse(response)) {
      yield put(PostsReduxActions.getPostDetailSuccess(response.data.data))
    } else {
      yield put(PostsReduxActions.getListPostsFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* acceptOrRejectPosts(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { postObjId, isApprove, reason, callBackSuccess } = action.payload
    const dataSubmit = { postObjId, isApprove, reason }
    if (isApprove) {
      delete dataSubmit.reason
    }
    const api = () => client.put(`${url.development}/${Endpoint.ACCEPT_OR_REJECT_POST}`, dataSubmit, '')
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(PostsReduxActions.acceptPostsSuccess({ isApprove }))
      callBackSuccess()
    } else {
      yield put(PostsReduxActions.acceptPostsFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* extendPosts(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { postObjId, callBackSuccess } = action.payload
    const dataSubmit = { postObjId }
    const api = () => client.put(`${url.development}/${Endpoint.EXTEND_POST}`, dataSubmit, '')
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(PostsReduxActions.extendSuccess())
      callBackSuccess()
    } else {
      yield put(PostsReduxActions.extendFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* expiredPosts(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { postObjId, callBackSuccess } = action.payload
    const dataSubmit = { postObjId }
    const api = () => client.put(`${url.development}/${Endpoint.EXPIRED_POST}`, dataSubmit, '')
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(PostsReduxActions.expiredPostsSuccess())
      callBackSuccess()
    } else {
      yield put(PostsReduxActions.expiredPostsFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}
