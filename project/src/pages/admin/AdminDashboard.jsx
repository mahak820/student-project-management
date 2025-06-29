import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../features/auth/authSlice'

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const dispatch = useDispatch()
    const {projects} = useSelector(state =>state.project)
      const  {users } = useSelector(state => state.auth);
       const { review } = useSelector(state => state.review);

    useEffect (() =>{
 console.log(users)
    },[])
  const handleSubmit = (e) => {
    e.preventDefault()
     dispatch(registerUser(formData))
    // In real app, this would create a new user via API
    console.log('New user created:', formData)
    setFormData({ name: '', email: '', phone: '', password: '' })
    alert('User created successfully!')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
                {students.length}
              </div>
              <div className="text-secondary-600">Total Students</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                5
              </div>
              <div className="text-secondary-600">Active Projects</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                12
              </div>
              <div className="text-secondary-600">Submissions</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                8
              </div>
              <div className="text-secondary-600">Reviews</div>
            </div>
          </div>

          {/* Add New User Form */}
          <div className="grid lg:grid-cols-2 gap-8">
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

            {/* Recent Activity */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-secondary-900">
                      New project submitted
                    </p>
                    <p className="text-xs text-secondary-500">
                      John Doe submitted "E-commerce Website" - 2 hours ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-secondary-900">
                      New user registered
                    </p>
                    <p className="text-xs text-secondary-500">
                      Jane Smith joined the platform - 5 hours ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-secondary-900">
                      Review posted
                    </p>
                    <p className="text-xs text-secondary-500">
                      Mike Johnson reviewed "Mobile App UI" - 1 day ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-secondary-900">
                      New project created
                    </p>
                    <p className="text-xs text-secondary-500">
                      Admin created "Database Design Project" - 2 days ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard