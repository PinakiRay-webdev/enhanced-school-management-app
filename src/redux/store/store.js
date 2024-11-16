import { configureStore } from '@reduxjs/toolkit'
import AddFormReducer  from '../slice/AddFormSlice'
import  UserReducer  from '../slice/UserSlice'
import  SideBarReducer  from '../slice/SideBarSlice'
export const store = configureStore({
  reducer: {
    addForm : AddFormReducer,
    users : UserReducer,
    sidebar : SideBarReducer
  },
})