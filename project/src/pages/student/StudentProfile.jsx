import { useEffect, useState } from 'react'
import StudentNavbar from '../../components/StudentNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { addprofile, updatedProfile, getProfile } from '../../features/profile/profileSlice'
import { getProjects, userDeleteProjects } from '../../features/project/projectSlice'

const StudentProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { profile } = useSelector(state => state.profile)
  const { userProjects, isLoading, error } = useSelector(state => state.project)


  let uid = user.id

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    collage: profile?.collage || '',
    course: '',
    year: '',
    experience: '',
    github: '',
    linkedin: ''
  })

  useEffect(() => {
    dispatch(getProfile())
    dispatch(getProjects(uid ))
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

  const handleUpdate = (formData) => {
    dispatch(updatedProfile(formData))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(userDeleteProjects(id))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_70%)]"></div>
      </div>

      <StudentNavbar />

      <div className="relative z-10 max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Profile Management
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">My Profile</h1>
          <p className="text-slate-600 text-lg">
            Manage your personal information and view your project history
          </p>
        </div>

        {/* Profile Form */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              {/* Personal Info */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl"
                      required />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl"
                      required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">College Name</label>
                  <input type="text" name="collage" value={formData.collage} onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl"
                    placeholder="Your College Name" required />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Course / Degree</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl"
                      placeholder="B.Tech" required />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Current Year</label>
                    <input type="text" name="year" value={formData.year} onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl"
                      placeholder="2nd" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Experience</label>
                  <textarea name="experience" value={formData.experience} onChange={handleChange}
                    rows={4} className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl"
                    placeholder="Tell us about yourself..." />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">GitHub Profile</label>
                    <input type="url" name="github" value={formData.github} onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl"
                      placeholder="https://github.com/username" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">LinkedIn Profile</label>
                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl"
                      placeholder="https://linkedin.com/in/username" />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  {profile?.isComplete ? (
                    <button type="button"
                      className="px-8 py-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700"
                      onClick={() => handleUpdate(formData)}>
                      Update Profile
                    </button>
                  ) : (
                    <button type="submit"
                      className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700">
                      Submit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* My Projects Section */}
            <div className="mt-16 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">My Projects</h2>

              {isLoading ? (
                <p className="text-slate-500">Loading projects...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : userProjects.length === 0 ? (
                <p className="text-slate-500">No projects found.</p>
              ) : (
                <div className="space-y-4">
                  {userProjects.map(project => (
                    <div key={project._id} className="bg-gray-50 p-4 rounded-xl flex justify-between items-center shadow">
                      <div>
                        <h3 className="text-lg font-semibold">{project.projectTopic.topic}</h3>
                        <p className="text-sm mt-4 text-slate-500 font-semibold">description: {project.description || 'N/A'}</p>
                         <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-primary-600 text-sm text-decoration: underline
                         hover:text-primary-700">
                            View Code
                         </a>                      </div>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">Profile Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50/80 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm font-medium">Member Since:</span>
                    <span className="text-slate-800 font-semibold text-sm">
                      {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50/80 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm font-medium">Profile Status:</span>
                    <span className={`text-sm font-semibold ${profile?.isComplete ? 'text-green-600' : 'text-amber-600'}`}>
                      {profile?.isComplete ? 'Complete' : 'Incomplete'}
                    </span>
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

export default StudentProfile
