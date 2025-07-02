import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "./profileservice";



const profileSlice = createSlice({
    name : "profile",
    initialState : {
       
        profile : {},
      
        isLoading : false ,
        isError : false ,
        isSuccess : false,
        message : ""
    },
    reducers : {},
    extraReducers : builder => {
        builder
        // add profile
        .addCase(addprofile.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                 // state.message =
        })
        .addCase(addprofile.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.profile = action.payload
        })
        .addCase(addprofile.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
         // add profile
        .addCase(updatedProfile.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                 // state.message =
        })
        .addCase(updatedProfile.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.profile = action.payload
        })
        .addCase(updatedProfile.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
        // get profile
        .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
       
     
    }
})
export default profileSlice.reducer
 

// get car
export const addprofile = createAsyncThunk("ADD/PROFILE", async(formData,thunkAPI)=>{
    
             let token = thunkAPI.getState().auth.user.token

    try{
        return await profileService.addProfile(formData,token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })

 export const getProfile = createAsyncThunk("GET/PROFILE", async (_, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token;
  try {
   
    return await profileService.getProfile(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
 export const updatedProfile = createAsyncThunk("POST/PROFILE", async (formData, thunkAPI) => {

   const token = thunkAPI.getState().auth.user.token;
     
  try {
   
    return await profileService.updatedprofile(formData,token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});



