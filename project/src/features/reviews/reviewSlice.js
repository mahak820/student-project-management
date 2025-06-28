import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "./reviewService";



const reviewSlice = createSlice({
    name : "review",
    initialState : {
        reviews : [] ,
        review :{},
        isLoading : false ,
        isError : false ,
        isSuccess : false,
        message : ""
    },
    reducers : {},
    extraReducers : builder => {
        builder
        // // add review
        .addCase(addreviews.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                 // state.message =
        })
        .addCase(addreviews.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
           state.reviews = [...state.reviews, action.payload]
        })
        .addCase(addreviews.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
       
     
    }
})
export default reviewSlice.reducer
 

// add review
export const addreviews = createAsyncThunk("ADD/REVIEW", async({ payload, projectTopicId },thunkAPI)=>{
    console.log(projectTopicId)
             let token = thunkAPI.getState().auth.user.token
            //  console.log(token)
    try{
        return await reviewService.addReview(payload,projectTopicId,token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })


