import axios from "axios"
import {api} from '../../api'


const addReview = async(payload,projectTopicId , token) =>{
 let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(`${api}/review/${projectTopicId}`,payload ,options)
    return response.data
 

}
const getReviews = async(token) =>{
 
 let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`${api}/review`,options)

    return response.data

}

//get all reviews ADMIN
const getAllReviews = async(token) =>{
 
 let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`${api}/admin/reviews`,options)

    return response.data

}

//ADD ADMIN REVIEW & RANK
const addAdminReview = async(formData , token) =>{
 
 let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(`${api}/admin/review`,formData , options)

    return response.data

}


const reviewService = {addReview, getReviews , getAllReviews , addAdminReview}
export default reviewService