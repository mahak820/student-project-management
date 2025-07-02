import axios from "axios"
import {api} from "../../api"

const addProject = async (githubLink,description, _ptid , token) => {
    const formData ={githubLink,description}
    

  let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(`${api}/project/${_ptid}`,formData,options)

    return response.data
 
}
// ✅ 2. Get All Projects Submitted by the Logged-in Student
const getStudentProjects = async (token) => {
 
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${api}/project`, options);

  return response.data;
};
const getUserProjects = async(uid , token) =>{

   const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${api}/project/${uid}`, options);
 
  return response.data;
}
const deteleProjects = async(_pid , token) =>{

   const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${api}/project/${_pid}`, options);
//  console.log(response.data)
  return response.data;
}

//Get ALL projects of a user
const getAllProjects = async (uid , token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${api}/admin/projects/user/${uid}` , options)
  return response.data
}

//Get ALL projects of a user
const getProjectTopcis = async (token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${api}/admin/project_topic/` , options)
  return response.data
}

//Get ALL submitted projects 
const getSubmittedProjects = async (token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${api}/admin/projects` , options)
  return response.data
}

//ADD PROJECT TOPIC ADMIN
const addProjectTopic = async (formData , token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${api}/admin/project_topic` ,formData, options)
  return response.data
}

//UPODATE PROJECT TOPIC ADMIN
const updateProjectTopic = async (_ptid , formData , token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${api}/admin/project_topic/${_ptid}` ,formData, options)
  return response.data
  // console.log(response.data)
}

//DELEYE PROJECT TOPIC ADMIN
const deleteProjectTopic = async (_ptid , token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${api}/admin/project_topic/${_ptid}` , options)
  return response.data
  // console.log(response.data)
}

//GET ALL SUBMISSIONS ON A PROJECT TOPIC 
const getSubmissions = async (_ptid , token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${api}/admin/projects/${_ptid}` , options)
  return response.data
  // console.log(response.data)
}

//GET ALL SUBMISSIONS ON A PROJECT TOPIC 
const getSingleProjectTopic = async (_ptid , token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${api}/admin/project_topic/${_ptid}` , options)
  return response.data
  // console.log(response.data)
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



const projectService = {addAdminReview , getSingleProjectTopic , getSubmissions , getSubmittedProjects , deleteProjectTopic , updateProjectTopic , addProject,getStudentProjects , getAllProjects , getProjectTopcis , addProjectTopic , deteleProjects , getUserProjects}


export default projectService