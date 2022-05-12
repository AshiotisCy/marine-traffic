import { configureStore } from '@reduxjs/toolkit'
import vesselSlice from './reducers/vesselSlice'

export const store = configureStore({
  reducer: {
    vessel: vesselSlice,

  },
})