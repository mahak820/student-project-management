import axios from "axios"


const addReview = async(payload,projectTopicId,token) =>{
    console.log(projectTopicId)
 let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(`/api/review/${projectTopicId}`,payload,options)
   console.log(response.data)
    return response.data
 

}

const reviewService = {addReview}
export default reviewService