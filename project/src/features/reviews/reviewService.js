import axios from "axios"


const addReview = async(payload,projectTopicId,token) =>{
 let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(`/api/review/${projectTopicId}`,payload,options)
    return response.data
 

}
const getReviews = async(token) =>{
 
 let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`/api/review`,options)

    return response.data
 

}

const reviewService = {addReview, getReviews}
export default reviewService