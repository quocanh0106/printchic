import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const rootRedux = createSlice({
  name: 'rootRedux',
  initialState,
  reducers: {}
})

export const rootActions = rootRedux.actions

export default rootRedux.reducer
