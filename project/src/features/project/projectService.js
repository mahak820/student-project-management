import axios from "axios"

const addProject = async (githubLink,description, _ptid , token) => {
    const formData ={githubLink,description}
    

  let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(`/api/project/${_ptid}`,formData,options)

    return response.data
 
}
// ✅ 2. Get All Projects Submitted by the Logged-in Student
const getStudentProjects = async (token) => {
 
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/project`, options);

  return response.data;
};

//Get ALL projects of a user
const getAllProjects = async (uid , token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/admin/projects/${uid}` , options)
  return response.data
}

//Get ALL projects of a user
const getProjectTopcis = async (token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/admin/project_topic/` , options)
  return response.data
}

//Get ALL submitted projects 
const getSubmittedProjects = async (token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/admin/projects` , options)
  return response.data
}

//ADD PROJECT TOPIC ADMIN
const addProjectTopic = async (formData , token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`/api/admin/project_topic` ,formData, options)
  return response.data
}

//UPODATE PROJECT TOPIC ADMIN
const updateProjectTopic = async (_ptid , formData , token) => {

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`/api/admin/project_topic/${_ptid}` ,formData, options)
  return response.data
  // console.log(response.data)
}




const projectService = {updateProjectTopic , addProject,getStudentProjects , getAllProjects , getProjectTopcis , addProjectTopic}
export default projectService