import axios from "axios"

const addProfile = async (formData,token) => {
  let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post("/api/user_profile",formData,options)

    return response.data
 
}

// get 
const getProfile = async (token) => {
    console.log(token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get("/api/user_profile", config);
  console.log(response.data)
  return response.data;
};

// update profile 
const updatedprofile = async (formData,token) => {
    console.log(token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put("/api/user_profile", formData,config);
  console.log(response.data)
  return response.data;
};


const profileService = {addProfile,getProfile,updatedprofile}
export default profileService