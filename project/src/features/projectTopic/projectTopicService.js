import axios from "axios"
import {api} from "../../api"
const getTopic = async (token) => {

  let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`${api}/projectTopic`,options)
   
    return response.data
 
}


const projectTopicService = {getTopic}
export default projectTopicService