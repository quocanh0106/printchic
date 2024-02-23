// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Events
export const fetchBlog = createAsyncThunk('appBlog/fetchEvents', async query => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/blog/list`, {
    params: query
  })

  return response.data
})

// ** Add Event
export const addBlog = createAsyncThunk('appBlog/addBlog', async (event, { dispatch }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/blog/create`, event.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  event.callBackSubmit(response.data)
  await dispatch(fetchBlog())

  return response.data.event
})

// ** Update Event
export const updateBlog = createAsyncThunk('appBlog/updateEvent', async (event, { dispatch }) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/auth/blog/update`, event.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  event.callBackSubmit(response.data)
  await dispatch(fetchBlog())

  return response.data.event
})

// ** Delete Event
export const deleteBlog = createAsyncThunk('appBlog/deleteEvent', async (blogId, { dispatch }) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/auth/blog/delete`, {
    params: { blogId }
  })
  if (response.data.success) {
    toast.success(' Blog deleted successfully', {
      duration: 2000
    })
  } else {
    toast.error(response.data.message, {
      duration: 2000
    })
  }
  await dispatch(fetchBlog())

  return response.data.event
})

export const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.data = action.payload.data.items
      state.total = action.payload.data?.paginator?.itemCount
      state.params = action.payload.data.params
      state.allData = action.payload.data.items
    })
  }
})

// export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = blogSlice.actions

export default blogSlice.reducer
