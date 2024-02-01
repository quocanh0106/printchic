import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export interface DashboardState {
  userData: any
  revenueData: any
  revenueByYear: any
  dataSubmitBefore: any
}

const initialState: any = {
  isSignedIn: false,
  dataSubmitBefore: {}
}

const DashboardRedux = createSlice({
  name: 'DashboardRedux',
  initialState,
  reducers: {
    userDataRequest: () => {},
    userDataFailed: () => {
      toast.error('lấy dữ liệu thất bại')
    },
    userDataSuccess: (state, action) => {
      state.userData = action.payload
    },
    revenueDataRequest: () => {},
    revenueDataFailed: () => {
      toast.error('lấy dữ liệu thất bại')
    },
    revenueDataSuccess: (state, action) => {
      state.revenueData = action.payload
    },
    revenueByYearRequest: (state, action) => {
      state.dataSubmitBefore.revenueByYear = action.payload
    },
    revenueByYearFailed: () => {
      toast.error('lấy dữ liệu thất bại')
    },
    revenueByYearSuccess: (state, action) => {
      state.revenueByYear = action.payload
    }
  }
})

export const DashboardReduxActions = DashboardRedux.actions

export default DashboardRedux.reducer
