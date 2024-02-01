/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export interface HRState {
  dataSubmitBefore: any
  listHR: any
  detailHR: any
  listPost: any
  listHistory: any
}

const initialState: HRState = {
  dataSubmitBefore: {},
  detailHR: {},
  listHR: {},
  listPost: {},
  listHistory: {}
}

const HRRedux = createSlice({
  name: 'HRRedux',
  initialState,
  reducers: {
    HRRequest: (state, action) => {
      state.dataSubmitBefore.listRequest = action.payload
    },
    HRFailed: () => {},
    HRSuccess: (state, action) => {
      state.listHR = action.payload
    },
    HRRechargeRequest: (state, action) => {
      state.dataSubmitBefore.callRecharge = action.payload
    },
    HRRechargeFailed: () => {},
    HRRechargeSuccess: (state, action) => {
      const { data, from } = action.payload
      if (data.statusCode == 10230) {
        toast.success('Nạp tiền thành công')
        if (from === 'list') {
          const tempListHRItems: any = JSON.parse(JSON.stringify(state.listHR.items))

          const indexOfObjectToReplace = tempListHRItems.findIndex((obj: any) => obj._id === data.data._id)

          if (indexOfObjectToReplace !== -1) {
            // Object found, update it
            tempListHRItems[indexOfObjectToReplace] = data.data
          } else {
            // Object not found, handle error or do nothing
            console.error('Object not found')
          }
          state.listHR.items = tempListHRItems
        } else if (from === 'detail') {
          state.detailHR = data.data
        }
      }
    },
    DetailHRRequest: (state, action) => {
      state.dataSubmitBefore.detailRequest = action.payload
    },
    DetailHRFailed: () => {
      toast.error('Gọi api lỗi')
    },
    DetailHRSuccess: (state, action) => {
      state.detailHR = action.payload
    },
    ListPostHRRequest: (state, action) => {
      state.dataSubmitBefore.ListPostRequest = action.payload
    },
    ListPostHRFailed: () => {
      toast.error('Gọi api lỗi')
    },
    ListPostHRSuccess: (state, action) => {
      state.listPost = action.payload
    },
    ListHistoryHRRequest: (state, action) => {
      state.dataSubmitBefore.ListHistoryRequest = action.payload
    },
    ListHistoryHRFailed: () => {
      toast.error('Gọi api lỗi')
    },
    ListHistoryHRSuccess: (state, action) => {
      state.listHistory = action.payload
    },
    BlockUserHRRequest: (state, action) => {
      state.dataSubmitBefore.blockUserRequest = action.payload
    },
    BlockUserHRFailed: () => {
      toast.error('Gọi api lỗi')
    },
    BlockUserHRSuccess: (state, action) => {
      if (action.payload.status === 'ACTIVE') {
        toast.success('Khóa tài khoản thành công')
      } else {
        toast.success('Mở khóa tài khoản thành công')
      }

      if (action.payload.fromScreen === 'list') {
        const tempListHRItems: any = JSON.parse(JSON.stringify(state?.listHR))
        const index = tempListHRItems?.items.findIndex((item: any) => item._id === action.payload.data._id)
        tempListHRItems.items[index] = action.payload.data
        state.listHR = tempListHRItems
      } else {
        state.detailHR = action.payload.data
      }
    },
    TopHRRequest: (state, action) => {
      state.dataSubmitBefore.topRequest = action.payload
    },
    TopHRFailed: () => {
      toast.error('Gọi api lỗi')
    },
    TopHRSuccess: (state, action) => {
      if (action.payload.isTopHR) {
        toast.success('Bỏ TOP trang chủ thành công')
      } else {
        toast.success('Nhà tuyển dụng đã được thêm vào TOP trang chủ')
      }
      if (action.payload.fromScreen === 'list') {
        const tempListHRItems: any = JSON.parse(JSON.stringify(state?.listHR))
        const index = tempListHRItems?.items.findIndex((item: any) => item._id === action.payload.data._id)
        tempListHRItems.items[index] = action.payload.data
        state.listHR = tempListHRItems
      } else {
        state.detailHR = action.payload.data
      }
    }
  }
})

export const HRReduxActions = HRRedux.actions

export default HRRedux.reducer
