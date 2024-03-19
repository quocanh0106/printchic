// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Events
export const fetchProduct = createAsyncThunk('product/fetchProduct', async query => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/product/list`, {
    params: query
  })

  return response.data
})

// ** Get Info Events
export const fetchInfoProduct = createAsyncThunk('appproduct/fetchInfoEvents', async query => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/product/info`, {
    params: query
  })

  return response.data
})

// ** Add Event
export const addProduct = createAsyncThunk('product/addProduct', async (event, { dispatch }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/product/create`, event.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  event.callBackSubmit(response.data)
  await dispatch(fetchProduct())

  return response.data.event
})

// ** Update Event
export const updateProduct = createAsyncThunk('product/updateProduct', async (event, { dispatch }) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/auth/product/update`, event.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  event.callBackSubmit(response.data)
  await dispatch(fetchProduct())

  return response.data.event
})

// ** Delete Event
export const deleteProduct = createAsyncThunk('appCalendar/deleteEvent', async (productId, { dispatch }) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/auth/product/delete`, {
    params: { productId }
  })
  if (response.data.success) {
    toast.success('Product deleted successfully', {
      duration: 2000
    })
  } else {
    toast.error(response.data.message, {
      duration: 2000
    })
  }
  await dispatch(fetchProduct())
  
  return response.data.event
})

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    infoProduct: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.data = action.payload.data.items
      state.total = action.payload.data?.paginator?.itemCount
      state.params = action.payload.data.params
      state.allData = action.payload.data.items
    }),
    builder.addCase(fetchInfoProduct.fulfilled, (state, action) => {
      state.infoProduct = action.payload.data
    })
  }
})

// export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = productSlice.actions

export default productSlice.reducer
