import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddFormOpen : false
}

export const AddFormSlice = createSlice({
    name : "addForm",
    initialState,
    reducers: {
        toggleAddForm : (state) =>{
            state.isAddFormOpen = (!state.isAddFormOpen)
        }
    }
})

export const {toggleAddForm} = AddFormSlice.actions;

export default AddFormSlice.reducer