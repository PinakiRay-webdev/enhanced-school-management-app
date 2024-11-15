import { configureStore } from '@reduxjs/toolkit'
import AddFormReducer  from '../slice/AddFormSlice'
import  UserReducer  from '../slice/UserSlice'
export const store = configureStore({
  reducer: {
    addForm : AddFormReducer,
    users : UserReducer
  },
})