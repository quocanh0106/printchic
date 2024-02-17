// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Events
export const fetchCategoryBlog = createAsyncThunk('appCategoryBlog/fetchEvents', async query => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/categoryBlog/list`, {
    params: query
  })

  return response.data
})

// ** Add Event
export const addCategoryBlog = createAsyncThunk('appCategoryBlog/addCategoryBlog', async (event, { dispatch }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/categoryBlog/create`, event.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  event.callBackSubmit(response.data)
  await dispatch(fetchCategoryBlog())

  return response.data.event
})

// ** Update Event
export const updateCategoryBlog = createAsyncThunk('appCategoryBlog/updateEvent', async (event, { dispatch }) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/auth/categoryBlog/update`, event.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  event.callBackSubmit(response.data)
  await dispatch(fetchCategoryBlog())

  return response.data.event
})

// ** Delete Event
export const deleteCategoryBlog = createAsyncThunk('appCategoryBlog/deleteEvent', async (categoryBlogId, { dispatch }) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/auth/categoryBlog/delete`, {
    params: { categoryBlogId }
  })
  if (response.data.success) {
    toast.success('Category Blog deleted successfully', {
      duration: 2000
    })
  } else {
    toast.error(response.data.message, {
      duration: 2000
    })
  }
  await dispatch(fetchCategoryBlog())

  return response.data.event
})

export const categoryBlogSlice = createSlice({
  name: 'categoryBlog',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategoryBlog.fulfilled, (state, action) => {
      console.log('ád', action.payload)
      state.data = action.payload.data.items
      state.total = action.payload.data?.paginator?.itemCount
      state.params = action.payload.data.params
      state.allData = action.payload.data.items
    })
  }
})

// export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = categoryBlogSlice.actions

export default categoryBlogSlice.reducer
