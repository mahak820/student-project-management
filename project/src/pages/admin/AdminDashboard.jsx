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
  } , [dispatch , isError , message ])

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

    fetchAllDetails()
   
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
    await dispatch(addProjectTopic( projectFormData))
    
    toast.success("Project Created Successfully")

    fetchAllDetails()
    
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
    <div className="flex flex-row  min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      
      <div className='flex w-0 lg:w-72'>
        <Sidebar/>
      </div>
      
      <div className=" ml-0 flex-1 lg:ml transition-all duration-300">
        <div className="py-6 px-4 sm:px-6 lg:px-8 relative ">
          {/* Header Section */}
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">🏠</span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">
                  Manage users and oversee the platform with powerful tools
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {[
              { 
                value: users?.length, 
                label: 'Total Students', 
                color: 'from-blue-500 to-blue-600', 
                icon: '👨‍🎓',
                bgColor: 'from-blue-50 to-blue-100',
                shadowColor: 'shadow-blue-200'
              },
              { 
                value: allTopics?.length, 
                label: 'Active Projects', 
                color: 'from-green-500 to-green-600', 
                icon: '📚',
                bgColor: 'from-green-50 to-green-100',
                shadowColor: 'shadow-green-200'
              },
              { 
                value: projects?.length, 
                label: 'Submissions', 
                color: 'from-yellow-500 to-orange-500', 
                icon: '📝',
                bgColor: 'from-yellow-50 to-orange-100',
                shadowColor: 'shadow-orange-200'
              },
              { 
                value: reviews?.length, 
                label: 'Reviews', 
                color: 'from-purple-500 to-indigo-500', 
                icon: '⭐',
                bgColor: 'from-purple-50 to-indigo-100',
                shadowColor: 'shadow-purple-200'
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`relative group bg-white rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl ${stat.shadowColor} transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform duration-300`}>
                      <span className="text-white text-lg lg:text-xl">{stat.icon}</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600 text-xs lg:text-sm font-medium group-hover:text-gray-700 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Forms Section */}
          <div className="grid xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Add New Student Form */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 lg:px-8 py-6 relative overflow-hidden">
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-xl">👨‍🎓</span>
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-white">Add New Student</h2>
                    <p className="text-blue-100 text-sm">Create a new student account</p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
              
              <div className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', icon: '👤' },
                    { name: 'email', label: 'Email Address', type: 'email', icon: '📧' },
                    { name: 'phone', label: 'Phone Number', type: 'tel', icon: '📱' },
                    { name: 'password', label: 'Password', type: 'password', icon: '🔒' }
                  ].map((field) => (
                    <div key={field.name} className="group/field">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                        <span className="text-lg">{field.icon}</span>
                        <span>{field.label}</span>
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 focus:bg-white group-hover/field:border-gray-300"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-focus-within/field:from-blue-500/5 group-focus-within/field:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                    disabled={isLoading}
                  >
                    <span className="text-lg group-hover/btn:animate-bounce">✨</span>
                    <span>{isLoading ? 'Creating...' : 'Create Student Account'}</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Create New Project Form */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 lg:px-8 py-6 relative overflow-hidden">
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-xl">🚀</span>
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-white">Create New Project</h2>
                    <p className="text-green-100 text-sm">Add a new project topic</p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
              
              <div className="p-6 lg:p-8">
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div className="group/field">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                      <span className="text-lg">📝</span>
                      <span>Project Title</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="topic"
                        value={projectFormData.topic}
                        onChange={handleProjectChange}
                        className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white group-hover/field:border-gray-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="group/field">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                      <span className="text-lg">📄</span>
                      <span>Description</span>
                    </label>
                    <div className="relative">
                      <textarea
                        name="details"
                        value={projectFormData.details}
                        onChange={handleProjectChange}
                        className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white resize-none group-hover/field:border-gray-300"
                        rows="4"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="group/field">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                        <span className="text-lg">📅</span>
                        <span>Submission Date</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="submission_date"
                          value={projectFormData.submission_date}
                          onChange={handleProjectChange}
                          className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white group-hover/field:border-gray-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="group/field">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                        <span className="text-lg">⏰</span>
                        <span>Last Date</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="last_date"
                          value={projectFormData.last_date}
                          onChange={handleProjectChange}
                          className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white group-hover/field:border-gray-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                  >
                    <span className="text-lg group-hover/btn:animate-bounce">🎯</span>
                    <span>Create Project</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard