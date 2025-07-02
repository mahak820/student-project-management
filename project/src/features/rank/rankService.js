import axios from "axios";
import {api} from "../../api"

const rank = async( _ptid,token) =>{

   const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${api}/rank/${_ptid}`, options);
//  console.log(response.data)
  return response.data;
}


const rankService = {rank}
export default rankService