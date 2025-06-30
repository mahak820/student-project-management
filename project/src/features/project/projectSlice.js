import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "./projectService";



const projectSlice = createSlice({
    name : "project",
    initialState : {
        project : {} ,
        projects :[],
        allTopics : [] ,
        projectTopics : {} ,
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
        //GET ALL PROJECTS OF A USER (ADMIN)
        .addCase(getAllProjectsOfUser.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                
        })
        .addCase(getAllProjectsOfUser.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.projects = action.payload
        })
        .addCase(getAllProjectsOfUser.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
         //GET ALL PROJECTS TOPICS (ADMIN)
        .addCase(getAllProjectTopcis.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                
        })
        .addCase(getAllProjectTopcis.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.allTopics = action.payload
        })
        .addCase(getAllProjectTopcis.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
         //GET ALL SUBMITTED PROJECTS (ADMIN)
        .addCase(getAllSubmittedProjects.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                
        })
        .addCase(getAllSubmittedProjects.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.projects = action.payload
        })
        .addCase(getAllSubmittedProjects.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
        //ADD PROJECT TOPICS (ADMIN)
        .addCase(addProjectTopic.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                
        })
        .addCase(addProjectTopic.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.projectTopics = action.payload
        })
        .addCase(addProjectTopic.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
         //UPDATE PROJECT TOPICS (ADMIN)
        .addCase(updateProjectTopic.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                
        })
        .addCase(updateProjectTopic.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.allTopics = state.allTopics.map(project => project._id === action.payload._id ? action.payload : project)
        })
        .addCase(updateProjectTopic.rejected ,(state,action)=>{
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

//GET ALL PROJECTS OF A USER

export const getAllProjectsOfUser = createAsyncThunk(
  "GET/USER_PROJECTS",
  async (uid, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
 
    try {
      return await projectService.getAllProjects(uid , token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//GET ALL PROJECTSTOPICS

export const getAllProjectTopcis = createAsyncThunk(
  "GET/PROJECT_TOPICS",
  async (_ ,  thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
 
    try {
      return await projectService.getProjectTopcis(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//GET ALL SUBMITTED PORJECTS

export const getAllSubmittedProjects = createAsyncThunk(
  "GET/SUBMITTED_PROJECTS",
  async (_ ,  thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
 
    try {
      return await projectService.getProjectTopcis(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// add project topic ADMIN
export const addProjectTopic = createAsyncThunk("ADD/PROJECT_TOPIC", async(projectFormData,thunkAPI)=>{
             let token = thunkAPI.getState().auth.user.token

    try{
 return await projectService.addProjectTopic(projectFormData, token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })

 // update  project topic ADMIN
export const updateProjectTopic = createAsyncThunk("UPDATE/PROJECT_TOPIC", async({ptid , formData},thunkAPI)=>{
             let token = thunkAPI.getState().auth.user.token

    try{
 return await projectService.updateProjectTopic(ptid , formData, token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })
