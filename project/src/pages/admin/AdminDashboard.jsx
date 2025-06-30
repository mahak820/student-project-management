import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAdmin, registerUser, registerUserAdmin } from '../../features/auth/authSlice'
import { addProjectTopic, getAllProjectTopcis, getAllSubmittedProjects } from '../../features/project/projectSlice'
import { getAllReviewsAdmin } from '../../features/reviews/reviewSlice'
import {toast} from 'react-toastify'

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const [projectFormData, setProjectFormData] = useState({
    topic: '',
    details: '',
    submission_date: '',
    last_date: ''
  })

  const dispatch = useDispatch()
    const {projects} = useSelector(state =>state.project)
      const  {users , isError , message , isLoading , newUser} = useSelector(state => state.auth);
       const { reviews } = useSelector(state => state.review);
    const {allTopics} = useSelector(state => state.project)

const fetchAllDetails = async() => {
  await dispatch(getAllProjectTopcis())
  await dispatch(getAllUsersAdmin())
  await dispatch(getAllSubmittedProjects())
  await dispatch(getAllReviewsAdmin())
}

  useEffect(() => {
    fetchAllDetails()
  } , [dispatch , isError , message])

  const handleSubmit = async(e) => {
    e.preventDefault()
     const response = await dispatch(registerUserAdmin(formData))
     
    if(response.error){
      toast.error("User already exists")
    }
    else{
      toast.success("User Registered Successfully")
    }
    setFormData({
      name : '' , 
      email : '' , 
      password : '' , 
      phone : ''
    })
   
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleProjectSubmit = async(e) => {
    e.preventDefault()
    // Add your project creation logic here
    console.log('Project Form Data:', projectFormData)
    dispatch(addProjectTopic( projectFormData))
    
    toast.success("Project Created Successfully")
    
    setProjectFormData({
      topic: '',
      details: '',
      submission_date: '',
      last_date: ''
    })
  }

  const handleProjectChange = (e) => {
    setProjectFormData({
      ...projectFormData,
      [e.target.name]: e.target.value
    })
  }

  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  const students = users.filter(user => user.role === 'student')

  return (
    <div className="flex min-h-screen bg-secondary-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="py-8 px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
            <p className="text-secondary-600 mt-2">
              Manage users and oversee the platform
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {users?.length}
              </div>
              <div className="text-secondary-600">Total Students</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {allTopics?.length}
              </div>
              <div className="text-secondary-600">Active Projects</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {projects?.length}
              </div>
              <div className="text-secondary-600">Submissions</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {reviews?.length}
              </div>
              <div className="text-secondary-600">Reviews</div>
            </div>
          </div>

          {/* Add New User Form & Create New Project Form */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add New Student Form */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                Add New Student
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <button type="submit" className="w-full btn-primary">
                  Create Student Account
                </button>
              </form>
            </div>

            {/* Create New Project Form */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                Create New Project
              </h2>
              
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={projectFormData.topic}
                    onChange={handleProjectChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="details"
                    value={projectFormData.details}
                    onChange={handleProjectChange}
                    className="input-field"
                    rows="4"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Submission Date
                  </label>
                  <input
                    type="date"
                    name="submission_date"
                    value={projectFormData.submission_date}
                    onChange={handleProjectChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Last Date
                  </label>
                  <input
                    type="date"
                    name="last_date"
                    value={projectFormData.last_date}
                    onChange={handleProjectChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <button type="submit" className="w-full btn-primary">
                  Create Project
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard