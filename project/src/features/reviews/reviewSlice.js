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
        // get reviews
         .addCase(getreviews.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                 // state.message =
        })
        .addCase(getreviews.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
           state.reviews =  action.payload
        })
        .addCase(getreviews.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
        // get all reviews (admin)
         .addCase(getAllReviewsAdmin.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                 // state.message =
        })
        .addCase(getAllReviewsAdmin.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
           state.reviews =  action.payload
        })
        .addCase(getAllReviewsAdmin.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
       
     
    }
})
export default reviewSlice.reducer
 

// add review
export const addreviews = createAsyncThunk("ADD/REVIEW", async({ payload, projectTopicId},thunkAPI)=>{
   
             let token = thunkAPI.getState().auth.user.token
           
    try{
        return await reviewService.addReview(payload,projectTopicId ,token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })
 // get review
export const getreviews = createAsyncThunk("GET/REVIEW", async(_,thunkAPI)=>{

             let token = thunkAPI.getState().auth.user.token
          
    try{
        return await reviewService.getReviews(token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })

 // get review
export const getAllReviewsAdmin = createAsyncThunk("GET/ALL_REVIEWS", async(_,thunkAPI)=>{

             let token = thunkAPI.getState().auth.user.token
          
    try{
        return await reviewService.getAllReviews(token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })


