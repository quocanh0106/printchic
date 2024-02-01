import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export interface SettingPricesState {
  dataSubmitBefore: any
  listConfigs: any
  isRefresh: boolean
}

const initialState: SettingPricesState = {
  listConfigs: {},
  dataSubmitBefore: {},
  isRefresh: false
}

const SettingPricesRedux = createSlice({
  name: 'SettingPricesRedux',
  initialState,
  reducers: {
    getListConfigsRequest: (state, action) => {
      state.dataSubmitBefore.getListConfigsRequest = action.payload
    },
    getListConfigsSuccess: (state, action) => {
      state.listConfigs = action.payload
    },
    getListConfigsFail: () => {
      toast.error('Gọi api lỗi')
    },
    updateSettingPricesRequest: (state, action) => {
      state.isRefresh = true
      state.dataSubmitBefore.updateSettingPricesRequest = action.payload
    },
    updateSettingPricesSuccess: (state) => {
      state.isRefresh = false
      toast.success('Cập nhật setting thành công')
    },
    updateSettingPricesFail: (state) => {
      state.isRefresh = false
      toast.error('Gọi api lỗi')
    }
  }
})

export const SettingPricesReduxActions = SettingPricesRedux.actions

export default SettingPricesRedux.reducer
