import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "./projectService";



const projectSlice = createSlice({
    name : "project",
    initialState : {
        project : {} ,
        projects :[],
        userProjects :[],
        isLoading : false ,
        isError : false ,
        isSuccess : false,
        message : ""
    },
    reducers : {},
    extraReducers : builder => {
        builder
        // add project
        .addCase(addProject.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                
        })
        .addCase(addProject.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.projects.push(action.payload); 
        })
        .addCase(addProject.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
         // GET topics
        .addCase(getStudentProjects.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                 // state.message =
        })
        .addCase(getStudentProjects.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.projects = action.payload
        })
        .addCase(getStudentProjects.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
         // GET topics
        .addCase(getProjects.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                 // state.message =
        })
        .addCase(getProjects.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.userProjects = action.payload
        })
        .addCase(getProjects.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
         // GET topics
        .addCase(userDeleteProjects.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                 // state.message =
        })
        .addCase(userDeleteProjects.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.userProjects = state.userProjects.filter(project => project._id !== action.payload.id )     
          })
        .addCase(userDeleteProjects.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
       
       
     
    }
})
export default projectSlice.reducer
 

// add project
export const addProject = createAsyncThunk("ADD/PROJECT", async({githubLink,description , projectId},thunkAPI)=>{
             let token = thunkAPI.getState().auth.user.token

    try{
 return await projectService.addProject(githubLink,description, projectId , token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })

 export const getStudentProjects = createAsyncThunk(
  "GET/STUDENT_PROJECTS",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
 
    try {
      return await projectService.getStudentProjects(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get a single user projects 
 export const getProjects = createAsyncThunk("GET/PROJECTS",async (uid, thunkAPI) => {
  console.log(uid)
    const token = thunkAPI.getState().auth.user.token;
 
    try {
      return await projectService.getUserProjects(uid,token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// delete a single user projects 
 export const userDeleteProjects = createAsyncThunk("DELETE/PROJECTS",async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
 
    try {
      return await projectService.deteleProjects(id,token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


 

