import {configureStore} from "@reduxjs/toolkit"
import auth from  "./auth/authSlice"
import projectTopic from "./projectTopic/projectTopicSlice"
import project from "./project/projectSlice"
import profile from "./profile/profileSlice"
import review from "./reviews/reviewSlice"
import rank from "./rank/rankSlice"
const store = configureStore({
    reducer :{auth,projectTopic,project,profile,review,rank}
})
 
export default store


