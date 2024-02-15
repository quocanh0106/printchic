// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Events
export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async query => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/categoryProduct/list`, {
    params: {
      query
    }
  })

  return response.data
})

// ** Add Event
export const addCategoryProduct = createAsyncThunk('appCalendar/addCategoryProduct', async (event, { dispatch }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/categoryProduct/create`, event.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  console.log('response', response)
  if (response.data.success) {
    event.setVisible(false)
    toast.success('New category product created successfully', {
      duration: 2000
    })
    event.setLoading(false)
  } else {
    toast.error(response.data.message, {
      duration: 2000
    })
    event.setLoading(false)
  }
  await dispatch(fetchEvents())

  return response.data.event
})

// ** Update Event
export const updateCategoryProduct = createAsyncThunk('appCalendar/updateEvent', async (event, { dispatch }) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/auth/categoryProduct/update`, event.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  if (response.data.success) {
    event.setVisible(false)
    toast.success('Category product updated successfully', {
      duration: 2000
    })
    event.setLoading(false)
  } else {
    toast.error(response.data.message, {
      duration: 2000
    })
    event.setLoading(false)
  }
  await dispatch(fetchEvents())

  return response.data.event
})

// ** Delete Event
export const deleteCategoryProduct = createAsyncThunk('appCalendar/deleteEvent', async (categoryProductId, { dispatch }) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/auth/categoryProduct/delete`, {
    params: { categoryProductId }
  })
  if (response.data.success) {
    toast.success('Category product deleted successfully', {
      duration: 2000
    })
  } else {
    toast.error(response.data.message, {
      duration: 2000
    })
  }
  await dispatch(fetchEvents())
  return response.data.event
})

export const appCategoryProductSlice = createSlice({
  name: 'appCategoryProduct',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      console.log('ád', action.payload)
      state.data = action.payload.data.items
      state.total = action.payload.data?.paginator?.itemCount
      state.params = action.payload.data.params
      state.allData = action.payload.data.items
    })
  }
})

// export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = appCategoryProductSlice.actions

export default appCategoryProductSlice.reducer
