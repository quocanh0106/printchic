// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import categoryProduct from 'src/store/apps/categoryProduct'
import permissions from 'src/store/apps/permissions'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    categoryProduct,
    permissions
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
