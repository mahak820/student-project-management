import axios from "axios"

const register = async(formData) =>{

     const response = await axios.post("/api/auth/register",formData)
     localStorage.setItem("user",JSON.stringify(response.data))
     return response.data
}
const login = async (formData) => {
  try {
    const response = await axios.post("/api/auth/login", formData)
    localStorage.setItem("user", JSON.stringify(response.data))
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Login Error:", error)
  }
}

const logout = async () => {
  localStorage.removeItem("user")
}


const authService = {register , login , logout}
export default authService