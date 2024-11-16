import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen : false,
}

export const SideBarSlice = createSlice({
    name : 'sidebar',
    initialState , 
    reducers : ({
        toggleSideBar : (state) =>{
            state.isOpen = (!state.isOpen)
        }
    })
})

export const {toggleSideBar} = SideBarSlice.actions;
export default SideBarSlice.reducer