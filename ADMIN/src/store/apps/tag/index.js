// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Events
export const fetchTag = createAsyncThunk('appTag/getListTag', async query => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/tag/list`, {
    params: query
  })

  return response.data
})

// ** Add Event
export const addTag = createAsyncThunk('appTag/addTag', async (event, { dispatch }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/tag/create`, event.formData)
  event.callBackSubmit(response.data)
  await dispatch(fetchTag())

  return response.data.event
})

// ** Update Event
export const updateTag = createAsyncThunk('appTag/updateEvent', async (event, { dispatch }) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/auth/tag/update`, event.formData)
  event.callBackSubmit(response.data)
  await dispatch(fetchTag())

  return response.data.event
})

// ** Delete Event
export const deleteTag = createAsyncThunk('appTag/deleteEvent', async (event, { dispatch }) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/auth/tag/delete`, {
    params: { tagId: event.tagId }
  })

  event.callBackSubmit(response.data)

  await dispatch(fetchTag())

  return response.data.event
})

export const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTag.fulfilled, (state, action) => {
      state.data = action.payload.data.items
      state.total = action.payload.data?.paginator?.itemCount
      state.params = action.payload.data.params
      state.allData = action.payload.data.items
    })
  }
})

// export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = blogSlice.actions

export default tagSlice.reducer
