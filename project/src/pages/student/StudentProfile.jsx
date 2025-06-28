// ✅ StudentProfile.jsx
import { useEffect, useState } from 'react'
import StudentNavbar from '../../components/StudentNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { addprofile, updatedProfile } from '../../features/profile/profileSlice'
import { getProfile } from '../../features/profile/profileSlice'

const StudentProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { profile } = useSelector(state => state.profile)
    console.log(profile)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    collage:  profile?.collage || '',
    course: '',
    year: '',
    experience: '',
    github: '',
    linkedin: ''
  })

  useEffect(() => {
    dispatch(getProfile())
    console.log("object")
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        collage: profile.collage || '',
        course: profile.course || '',
        year: profile.year || '',
        experience: profile.experience || '',
        github: profile.github || '',
        linkedin: profile.linkedin || ''
      }))
    }
  }, [profile])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addprofile(formData))
    alert('Profile updated successfully!')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = (formData) =>{
 dispatch(updatedProfile(formData))
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <StudentNavbar />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">My Profile</h1>
          <p className="text-secondary-600 mt-2">
            Manage your personal information and view your project history
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                Personal Information
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
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
                </div>
               

                    <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                   Collage Name
                  </label>
                  <input
               
                    type="text"
                    name="collage"
                    value={formData.collage}
                    onChange={handleChange}
                    className="input-field"
                       placeholder='Jawahar Lal Nehru Collage pune'
                    required
                  />
                  
              </div>
              </div>

              {/* end */}
                  <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Course / Degree
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="input-field"
                      placeholder='B.Tech'
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                       Currect Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      placeholder='2 nd'
                      value={formData.year}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Experience
                  </label>
                 
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    rows={4}
                    className="input-field"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                {/*  <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="input-field"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div> */}

              

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                 
                 <div className="flex justify-end">
                {profile?.isComplete ? (
                  <button type="button" className="btn-secondary" onClick={() =>{handleUpdate(formData)}}>
                    Update Profile
                  </button>
                ) : (
                  <button type="submit" className="btn-primary">
                    Submit Profile
                  </button>
                )}
              </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Profile Summary */}
          {/* <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Profile Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-500">Member Since:</span>
                  <span className="text-secondary-700">
                    {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">Projects Completed:</span>
                  <span className="text-secondary-700">{completedProjects.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-500">Profile Status:</span>
                  <span className={`${user?.profileComplete ? 'text-green-600' : 'text-yellow-600'}`}>
                    {user?.profileComplete ? 'Complete' : 'Incomplete'}
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {completedProjects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-secondary-700 font-medium">
                        {project.title}
                      </p>
                      <p className="text-xs text-secondary-500">
                        Submitted {new Date(project.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* Completed Projects */}
        {/* {completedProjects.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              My Completed Projects
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedProjects.map((project) => (
                <div key={project.id} className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-secondary-900">
                      {project.title}
                    </h3>
                    {project.rating && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm text-secondary-600 ml-1">
                          {project.rating}/5
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="text-xs text-secondary-500 mb-3">
                    Submitted: {new Date(project.submittedAt).toLocaleDateString()}
                  </div>
                  
                  {project.feedback && (
                    <div className="mt-3 p-3 bg-secondary-50 rounded-lg">
                      <p className="text-sm text-secondary-700">
                        <span className="font-medium">Feedback:</span> {project.feedback}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default StudentProfile