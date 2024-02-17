// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Events
export const fetchEventsSetting = createAsyncThunk('appSetting/fetchEvents', async query => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/setting/info`)

  return response.data
})

// ** Update Event
export const updateSetting = createAsyncThunk('appSetting/updateEvent', async (event, { dispatch }) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/auth/setting/update`, event.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  console.log('response.data', response.data)
  event.callBackSubmit(response.data)
  await dispatch(fetchEvents())

  return response.data.event
})

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    data: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEventsSetting.fulfilled, (state, action) => {
      state.data = action.payload?.data[0]
    })
  }
})

// export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = settingSlice.actions

export default settingSlice.reducer
