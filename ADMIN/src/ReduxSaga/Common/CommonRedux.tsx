import { createSlice } from '@reduxjs/toolkit'

interface BreadcrumbsProps {
  text: string
  isShowBackIcon?: boolean
  backFunc?: () => void
}

export interface CommonState {
  breadcrumbsData: BreadcrumbsProps
}

const initialState: CommonState = {
  breadcrumbsData: {
    text: 'Trang chủ'
  }
}

const CommonRedux = createSlice({
  name: 'CommonRedux',
  initialState,
  reducers: {
    setDataBreadcrumbs: (state, action) => {
      state.breadcrumbsData.text = action.payload.text
      state.breadcrumbsData.isShowBackIcon = action.payload?.isShowBackIcon
      state.breadcrumbsData.backFunc = action.payload?.backFunc
    }
  }
})

export const CommonReduxActions = CommonRedux.actions

export default CommonRedux.reducer
