import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "./projectService";



const projectSlice = createSlice({
    name : "project",
    initialState : {
        project : {} ,
        projects :[],
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

 

