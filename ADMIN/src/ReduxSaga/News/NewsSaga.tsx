/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { globalLoading } from '~/Components/GlobalLoading'
import { client } from '~/api/client'
import { Endpoint, url } from '~/api/endpoint'
import { isSuccessResponse } from '~/api/interceptors'
import { NewsReduxActions } from './NewsRedux'

export function* watchNewsSaga() {
  yield all([
    takeLatest(NewsReduxActions.getListNewsRequest.type, getListNews),
    takeLatest(NewsReduxActions.createNewsRequest.type, createNews),
    takeLatest(NewsReduxActions.getInfoNewsRequest.type, getInfoNews)
  ])
}

function* getListNews(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const { status, page, searchParams } = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.LIST_NEWS}`, { status, page, ...searchParams })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(NewsReduxActions.getListNewsSuccess(response.data.data))
    } else {
      yield put(NewsReduxActions.getListNewsFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getInfoNews(action: PayloadAction<any>): any {
  globalLoading.show()
  try {
    const id = action.payload
    const api = () => client.get(`${url.development}/${Endpoint.GET_INFO_NEWS}`, { newObjId: id })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(NewsReduxActions.getInfoNewsSuccess(response.data.data))
    } else {
      yield put(NewsReduxActions.getInfoNewsFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* createNews(action: PayloadAction<any>): any {
  globalLoading.show()
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }

  const { formData, id } = action.payload
  try {
    const api = () => {
      if (id) {
        return client.put(`${url.development}/${Endpoint.UPDATE_NEWS}`, formData, config)
      } else {
        return client.post(`${url.development}/${Endpoint.CREATE_NEWS}`, formData, config)
      }
    }
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(NewsReduxActions.createNewsSuccess(id))
    } else {
      yield put(NewsReduxActions.createNewsFail())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}
