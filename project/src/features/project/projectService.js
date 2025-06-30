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


const projectService = {addProject,getStudentProjects}
export default projectService