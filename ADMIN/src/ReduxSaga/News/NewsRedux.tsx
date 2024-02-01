import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export interface NewsState {
  listNews: any
  detailNews: any
  dataSubmitBefore: any
}

const initialState: NewsState = {
  listNews: {},
  detailNews: {},
  dataSubmitBefore: {}
}

const NewsRedux = createSlice({
  name: 'NewsRedux',
  initialState,
  reducers: {
    getListNewsRequest: (state, action) => {
      state.dataSubmitBefore.callListNews = action.payload
    },
    getListNewsSuccess: (state, action) => {
      state.listNews = action.payload
    },
    getListNewsFail: () => {
      toast.error('Gọi api lỗi')
    },
    getInfoNewsRequest: (state, action) => {
      state.dataSubmitBefore.getInfoNews = action.payload
    },
    getInfoNewsSuccess: (state, action) => {
      state.detailNews = action.payload
    },
    getInfoNewsFail: () => {
      toast.error('Gọi api lỗi')
    },
    createNewsRequest: (state, action) => {
      state.dataSubmitBefore.createNews = action.payload
    },
    createNewsSuccess: (state, action) => {
      state.dataSubmitBefore.createNews = 'sucess'
      if (action.payload) {
        toast.success('Cập nhật tin tức thành công')
      } else {
        toast.success('Tạo mới tin tức thành công')
      }
    },
    createNewsFail: () => {
      toast.error('Gọi api lỗi')
    }
  }
})

export const NewsReduxActions = NewsRedux.actions

export default NewsRedux.reducer
