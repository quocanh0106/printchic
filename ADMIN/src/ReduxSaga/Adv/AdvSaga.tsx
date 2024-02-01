import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { globalLoading } from '~/Components/GlobalLoading'
import { client } from '~/api/client'
import { Endpoint, url } from '~/api/endpoint'
import { isSuccessResponse } from '~/api/interceptors'
import { AdvReduxActions } from './AdvRedux'

export function* watchAdvSaga() {
  yield all([
    takeLatest(AdvReduxActions.getListCVRequest.type, getListCV),
    takeLatest(AdvReduxActions.getListProgramRequest.type, getListProgram),
    takeLatest(AdvReduxActions.getListAdvRequest.type, getListAdv),
    takeLatest(AdvReduxActions.addListCVRequest.type, addListAdv),
    takeLatest(AdvReduxActions.getListPackageRequest.type, getListPackageAdv),
    takeLatest(AdvReduxActions.createAdvRequest.type, createAdv),
    takeLatest(AdvReduxActions.createProgramRequest.type, createProgram),
    takeLatest(AdvReduxActions.DeleteAdvRequest.type, deleteAdv),
    takeLatest(AdvReduxActions.DeleteProgramRequest.type, deleteProgram),
    takeLatest(AdvReduxActions.deleteCVRequest.type, deleteCV)
  ])
}

function* getListAdv(action: PayloadAction<any>): any {
  const { query } = action.payload
  globalLoading.show()
  try {
    const api = () => client.get(`${url.development}/${Endpoint.ADV_GET_LIST}`, { query })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.getListAdvSuccess(response.data.data))
    } else {
      yield put(AdvReduxActions.getListAdvFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getListPackageAdv(): any {
  try {
    const api = () => client.get(`${url.development}/${Endpoint.LIST_PACKAGE_ADV}`)
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.getListPackageSuccess(response.data.data))
    } else {
      yield put(AdvReduxActions.getListPackageFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
}

function* createAdv(action: PayloadAction<any>): any {
  globalLoading.show()
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }

  const { formData, currentIdAdv } = action.payload
  try {
    const api = () => {
      if (currentIdAdv) {
        return client.put(`${url.development}/${Endpoint.UPDATE_ADV}`, formData, config)
      } else {
        return client.post(`${url.development}/${Endpoint.CREATE_ADV}`, formData, config)
      }
    }
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.createAdvSuccess({ data: response.data.data, currentIdAdv }))
      if (currentIdAdv) yield put(AdvReduxActions.getListAdvRequest({}))
    } else {
      yield put(AdvReduxActions.createAdvFailed(response.data))
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* deleteAdv(action: PayloadAction<any>): any {
  globalLoading.show()

  const { id } = action.payload
  try {
    const api = () => client.delete(`${url.development}/${Endpoint.DELETE_AUTH}`, { advertisementObjId: id })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.DeleteAdvSuccess(id))
    } else {
      yield put(AdvReduxActions.DeleteAdvFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getListCV(): any {
  globalLoading.show()
  try {
    const api = () => client.get(`${url.development}/${Endpoint.CV_GET_LIST}`)
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.getListCVSuccess(response.data.data))
    } else {
      yield put(AdvReduxActions.getListCVFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* addListAdv(action: PayloadAction<any>): any {
  globalLoading.show()
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }
  const { file } = action.payload
  try {
    const api = () => client.post(`${url.development}/${Endpoint.CV_ADD_LIST}`, file, config)
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.addListCVSuccess(response.data.data))
      yield put(AdvReduxActions.getListCVRequest())
    } else {
      yield put(AdvReduxActions.addListCVFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* deleteCV(action: PayloadAction<any>): any {
  globalLoading.show()

  const { id } = action.payload
  try {
    const api = () => client.delete(`${url.development}/${Endpoint.DELETE_CV}`, { attachmentObjId: id })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.getListCVRequest())
      yield put(AdvReduxActions.deleteCVSuccess())
    } else {
      yield put(AdvReduxActions.deleteCVFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* getListProgram(action: PayloadAction<any>): any {
  const { query } = action.payload
  console.log('qqqqqq', query)
  globalLoading.show()
  try {
    const api = () => client.get(`${url.development}/${Endpoint.LIST_PROGRAM}`, { query })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.getListProgramSuccess(response.data.data))
    } else {
      yield put(AdvReduxActions.getListProgramFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* createProgram(action: PayloadAction<any>): any {
  globalLoading.show()
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }

  const { formData, currentIdAdv } = action.payload
  try {
    const api = () => {
      if (currentIdAdv) {
        return client.put(`${url.development}/${Endpoint.UPDATE_PROGRAM}`, formData, config)
      } else {
        return client.post(`${url.development}/${Endpoint.CREATE_PROGRAM}`, formData, config)
      }
    }
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.getListProgramRequest({}))
      yield put(AdvReduxActions.createProgramSuccess(currentIdAdv))
    } else {
      yield put(AdvReduxActions.createProgramFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}

function* deleteProgram(action: PayloadAction<any>): any {
  globalLoading.show()

  const { id } = action.payload
  try {
    const api = () => client.delete(`${url.development}/${Endpoint.DELETE_PROGRAM}`, { countryObjId: id })
    const response = yield call(api)
    if (isSuccessResponse(response)) {
      yield put(AdvReduxActions.getListProgramRequest({}))
      yield put(AdvReduxActions.DeleteProgramSuccess())
    } else {
      yield put(AdvReduxActions.DeleteProgramFailed())
    }
  } catch (error) {
    console.log('error', error)
  }
  globalLoading.hide()
}
