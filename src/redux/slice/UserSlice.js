import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  students: [],
  mentors: [],
  isError: false,
};

const BASE_URL_MENTOR = "http://localhost:3000/mentors";
const BASE_URL_STUDENT = "http://localhost:3000/students";

//function for get students
export const getStudents = createAsyncThunk("getStudents", async () => {
    const response = await axios.get(BASE_URL_STUDENT);
    return response.data;
});

//function for get mentors
export const getMentors = createAsyncThunk("getMentors", async () => {
  const response = await axios.get(BASE_URL_MENTOR);
  return response.data;
});

//function for create students
export const createStudent = createAsyncThunk(
  "createStudent",
  async (newStudent) => {
    try {
      const response = await axios.post(BASE_URL_STUDENT, newStudent, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.log("Error : " + error.message);
    }
  }
);

//function for create mentors
export const CreateMentor = createAsyncThunk('CreateMentor' , async(newMentor) =>{
  try {
    const response = await axios.post(BASE_URL_MENTOR , newMentor , {
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.log("Error : "+error.message)
  }
})

export const UserSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //handling get students data
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected , (state , action) =>{
        state.isLoading =  false,
        state.isError = true,
        console.log({Error : action.error.message});
        
      });

      //handling get mentors data
      builder
      .addCase(getMentors.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getMentors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mentors = action.payload;
      })
      .addCase(getMentors.rejected , (state , action) =>{
        state.isLoading =  false,
        state.isError = true,
        console.log({Error : action.error.message});
        
      })

      //handling create students data
    builder
      .addCase(createStudent.pending, (state) => {
        (state.isLoading = true), (state.isError = false);
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.isLoading = false,
          state.students = [...state.students , action.payload]
        state.isError = false;
      })
      .addCase(createStudent.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          console.log({ Error: action.payload.message });
      });

      //handling create mentors data
      builder
      .addCase(CreateMentor.pending, (state) => {
        (state.isLoading = true), (state.isError = false);
      })
      .addCase(CreateMentor.fulfilled, (state, action) => {
        state.isLoading = false,
          state.mentors = [...state.mentors , action.payload]
        state.isError = false;
      })
      .addCase(CreateMentor.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          console.log({ Error: action.payload.message });
      });
  },
});

export default UserSlice.reducer;
