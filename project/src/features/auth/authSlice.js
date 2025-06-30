import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";


const authSlice = createSlice({
    name : "auth",
    initialState : {
        user :JSON.parse(localStorage.getItem("user")) || null ,
        newUser : null ,
        users : [],
        // json parse , string ko object me convert karti hai
        //  like If stored = "{"name":"Mahak","email":"mahak@example.com"}"
// After parse = { name: "Mahak", email: "mahak@example.com" }
        isLoading : false,
        isSuccess : false,
        isError : false ,
        message :""
    },
    reducers :{},
    extraReducers : builder =>{
        builder
        .addCase(registerUser.pending, (state,action) =>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
              } )
        .addCase(registerUser.fulfilled, (state,action) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
           state.user = action.payload

              } )
        .addCase(registerUser.rejected, (state,action) =>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.payload
              } )
              //LOGIN USER
              .addCase(loginUser.pending, (state,action) =>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
              } )
        .addCase(loginUser.fulfilled, (state,action) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
              } )
        .addCase(loginUser.rejected, (state,action) =>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.payload
              } )
        //LOGOUT USER
        .addCase(logoutUser.fulfilled, (state) =>{
            state.user = null
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
              } )
        //GET ALL USERS ADMIN
        .addCase(getAllUsersAdmin.pending, (state,action) =>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
              } )
        .addCase(getAllUsersAdmin.fulfilled, (state,action) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload
              } )
        .addCase(getAllUsersAdmin.rejected, (state,action) =>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.payload
              } )
              //Register userregisterUserAdmin)
        .addCase(registerUserAdmin.pending, (state,action) =>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
            state.newUser = null
              } )
        .addCase(registerUserAdmin.fulfilled, (state,action) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.newUser = action.payload
              } )
        .addCase(registerUserAdmin.rejected, (state,action) =>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.payload
            state.newUser = null
              } )

    }
    
})

export default authSlice.reducer


// register 
 export const registerUser = createAsyncThunk("REGISTER/USER" , async(formData,thunkAPI) =>{
     try{
      return await authService.register(formData)
     } catch(error){
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
     }
})

// login
 export const loginUser = createAsyncThunk("LOGIN/USER" , async(formData,thunkAPI) =>{
     try{
      return await authService.login(formData)
     } catch(error){
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
     }
})

 export const logoutUser = createAsyncThunk("LOGOUT/USER" , async(formData,thunkAPI) =>{
     try{
      return await authService.logout()
     } catch(error){
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
     }
})

//GET ALL ADMIN USERS
export const getAllUsersAdmin = createAsyncThunk("GET/ALLUSERS" , async(_,thunkAPI) =>{

  let token = thunkAPI.getState().auth.user.token

     try{
      return await authService.allUsers(token)
     } catch(error){
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
     }
})

// register User admin 
 export const registerUserAdmin = createAsyncThunk("REGISTER/USER_ADMIN" , async(formData,thunkAPI) =>{
     try{
      return await authService.adminRegister(formData)
     } catch(error){
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
     }
})