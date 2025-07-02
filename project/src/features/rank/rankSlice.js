import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rankService from "./rankService";



const rankSlice = createSlice({
    name : "rank",
    initialState : {
        ranks : []
        ,
      
        isLoading : false ,
        isError : false ,
        isSuccess : false,
        message : ""
    },
    reducers : {},
    extraReducers : builder => {
        builder
        // GET topics
        // .addCase(getTopics.pending ,(state,action)=>{
        //         state.isLoading = true
        //         state.isError = false
        //         state.isSuccess = false
        //          // state.message =
        // })
        // .addCase(getTopics.fulfilled ,(state,action)=>{
        //     state.isLoading = false
        //     state.isError = false
        //     state.isSuccess = true
        //     state.projectTopics = action.payload
        // })
        // .addCase(getTopics.rejected ,(state,action)=>{
        //     state.isLoading = false
        //     state.isError = true
        //     state.isSuccess = false
        //     state.message = action.message
        // })
       
     
    }
})
export default rankSlice.reducer
 

// get car
export const Rank = createAsyncThunk("FETCH/RANK", async(_,thunkAPI)=>{
    
             let token = thunkAPI.getState().auth.user.token
            
    try{
        return await rankService.rank(token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })


