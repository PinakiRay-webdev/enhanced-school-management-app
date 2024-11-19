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
export const CreateMentor = createAsyncThunk(
  "CreateMentor",
  async (newMentor) => {
    try {
      const response = await axios.post(BASE_URL_MENTOR, newMentor, {
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

//functions for delete student
export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async (studentID) => {
    try {
      await axios.delete(`${BASE_URL_STUDENT}/${studentID}`);
      return studentID;
    } catch (error) {
      console.log("Error : " + error.message);
    }
  }
);

//function for delete mentor
export const deleteMentor = createAsyncThunk(
  "deleteMento",
  async (mentorID) => {
    try {
      await axios.delete(`${BASE_URL_MENTOR}/${mentorID}`);
      return mentorID;
    } catch (error) {
      console.log("Error : " + error.message);
    }
  }
);

//function for edit Student
export const editStudent = createAsyncThunk(
  "editStudent",
  async (updatedStudent) => {
    try {
      const response = await axios.patch(
        `${BASE_URL_STUDENT}/${updatedStudent.id}`,
        updatedStudent,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error : "+error.message)
    }
  }
);

//function for edit mentors
export const editMentor = createAsyncThunk('editMentor' , async(updatedMentor) =>{
  try {
    const response  = await axios.patch(`${BASE_URL_MENTOR}/${updatedMentor.id}` , updatedMentor , {
      headers : {
        'Content-Type' : 'application-json'
      }
    })
    return response.data;
  } catch (error) {
    console.log('Error : '+error.message)
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
      .addCase(getStudents.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          console.log({ Error: action.error.message });
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
      .addCase(getMentors.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          console.log({ Error: action.error.message });
      });

    //handling create students data
    builder
      .addCase(createStudent.pending, (state) => {
        (state.isLoading = true), (state.isError = false);
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.students = [...state.students, action.payload]);
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
        (state.isLoading = false),
          (state.mentors = [...state.mentors, action.payload]);
        state.isError = false;
      })
      .addCase(CreateMentor.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          console.log({ Error: action.payload.message });
      });

    //handling delete student data
    builder
      .addCase(deleteStudent.pending, (state) => {
        (state.isLoading = true), (state.isError = false);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.students = state.students.filter(
            (e) => e.id !== action.payload
          ));
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          console.log({ Error: action.error.message });
      });

    //handling delete mentor data
    builder
      .addCase(deleteMentor.pending, (state) => {
        (state.isLoading = true), (state.isError = false);
      })
      .addCase(deleteMentor.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.mentors = state.mentors.filter(
            (e) => e.id !== action.payload
          ));
      })
      .addCase(deleteMentor.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          console.log({ Error: action.error.message });
      });
    
      //handling edit student
      builder
        .addCase(editStudent.pending , (state) =>{
          state.isLoading = true,
          state.isError = false
        })
        .addCase(editStudent.fulfilled , (state , action) =>{
          state.isLoading = false;
          const index = state.students.findIndex((e) => e.id === action.payload);
          if(index !== -1){
            state.students[index] = action.payload
          }
        })
        .addCase(editStudent.rejected , (state , action) => {
          state.isLoading = false,
          state.isError = true,
          console.log('Error : '+action.error.message)
        });

        //handling edit mentor
      builder
        .addCase(editMentor.pending , (state) =>{
          state.isLoading = true,
          state.isError = false
        })
        .addCase(editMentor.fulfilled , (state , action) =>{
          state.isLoading = false;
          const index = state.mentors.findIndex((e) => e.id === mentorID)
          if(index !== -1){
            state.mentors[index] = action.payload;
          }
        })
        .addCase(editMentor.rejected , (state , action) =>{
          state.isLoading = false,
          state.isError = true,
          consple.log('Error : '+action.error.message)
        });
  },
});

export default UserSlice.reducer;
