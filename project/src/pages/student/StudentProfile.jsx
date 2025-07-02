
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

  let uid = user?.id
  
  useEffect(() => {
    dispatch(getProfile())
    dispatch(getProjects(uid))
  }, [dispatch])
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    collage: profile?.collage || '',
    course: profile?.course || '',
    year: profile?.year || '',
    experience: profile?.experience || '',
    github: profile?.github ||   '',
    linkedin: profile?.linkedin || ''
  })


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

  // Helper function to truncate description
  const truncateDescription = (text, wordLimit = 75) => {
    if (!text) return ''
    const words = text.split(' ')
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ') + '...'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-200/25 to-blue-200/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      <StudentNavbar />

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100/80 to-blue-100/80 backdrop-blur-sm rounded-full text-purple-700 text-sm font-semibold mb-6 shadow-lg border border-white/50">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
            Profile Management Dashboard
          </div>
          <h1 className="text-5xl py-2 lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 mb-4 tracking-tight leading-tight">
            My Profile
          </h1>
          
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Profile Form - Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Personal Information Card */}
            <div className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-4xl transition-all duration-500 animate-scale-in">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">Personal Information</h2>
                  <p className="text-slate-600 mt-1">Keep your profile up to date</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300 text-slate-700 font-medium"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300 text-slate-700 font-medium"
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">College Name</label>
                  <input 
                    type="text" 
                    name="collage" 
                    value={formData.collage} 
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300 text-slate-700 font-medium"
                    placeholder="Your College Name" 
                    required 
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Course / Degree</label>
                    <input 
                      type="text" 
                      name="course" 
                      value={formData.course} 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300 text-slate-700 font-medium"
                      placeholder="B.Tech, BCA, etc." 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Current Year</label>
                    <input 
                      type="text" 
                      name="year" 
                      value={formData.year} 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300 text-slate-700 font-medium"
                      placeholder="1st, 2nd, 3rd, etc." 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Experience & Skills</label>
                  <textarea 
                    name="experience" 
                    value={formData.experience} 
                    onChange={handleChange}
                    rows={5} 
                    className="w-full px-5 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300 text-slate-700 font-medium resize-none"
                    placeholder="Tell us about your experience, skills, achievements..." 
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">GitHub Profile</label>
                    <input 
                      type="url" 
                      name="github" 
                      value={formData.github} 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300 text-slate-700 font-medium"
                      placeholder="https://github.com/username" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">LinkedIn Profile</label>
                    <input 
                      type="url" 
                      name="linkedin" 
                      value={formData.linkedin} 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300 text-slate-700 font-medium"
                      placeholder="https://linkedin.com/in/username" 
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-8">
                  {profile?.isComplete ? (
                    <button 
                      type="button"
                      className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
                      onClick={() => handleUpdate(formData)}
                    >
                      🔄 Update Profile
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                      ✨ Submit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* My Projects Section */}
            <div className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-4xl transition-all duration-500 animate-scale-in">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">My Projects</h2>
                    <p className="text-slate-600 mt-1">Showcase of your amazing work</p>
                  </div>
                </div>
                <div className="hidden sm:block px-4 py-2 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-full">
                  <span className="text-sm font-semibold text-slate-700">
                    {userProjects?.length || 0} Projects
                  </span>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <span className="ml-4 text-slate-600 font-medium">Loading your amazing projects...</span>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">⚠️</div>
                  <p className="text-red-600 font-semibold text-lg">{error}</p>
                </div>
              ) : userProjects.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">🚀</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">No Projects Yet</h3>
                  <p className="text-slate-600 text-lg">Time to create something amazing! Your projects will appear here.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {userProjects.map((project, index) => (
                    <div 
                      key={project._id} 
                      className="group bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2"></div>
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                              {project?.projectTopic?.topic || 'Untitled Project'}
                            </h3>
                          </div>
                          
                          <div className="bg-slate-100/80 rounded-xl p-4 mb-4">
                            <p className="text-sm font-semibold text-slate-600 mb-2">📝 Description:</p>
                            <p className="text-slate-700 leading-relaxed">
                              {truncateDescription(project.description)}
                            </p>
                          </div>

                          <div className="bg-slate-100/80 rounded-xl p-4 mb-4">
                            <p className="text-sm font-semibold text-slate-600 mb-2">📝 Admin Review:</p>
                            <p className="text-slate-700 leading-relaxed">
                              {truncateDescription(project.adminReview)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <a 
                              href={project.githubLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-semibold rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              View Code
                            </a>

                            <button
                              onClick={() => handleDelete(project._id)}
                              className="p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg group-hover:shadow-xl"
                              title="Delete Project"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Summary Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 animate-scale-in">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-2xl flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Profile Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-2xl p-4 border border-gray-200/50">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm font-semibold">Member Since:</span>
                    <span className="text-slate-800 font-bold text-sm">
                      {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50/80 to-purple-50/80 rounded-2xl p-4 border border-gray-200/50">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm font-semibold">Profile Status:</span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      profile?.isComplete 
                        ? 'text-green-700 bg-green-100' 
                        : 'text-amber-700 bg-amber-100'
                    }`}>
                      {profile?.isComplete ? '✅ Complete' : '⏳ Incomplete'}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50/80 to-indigo-50/80 rounded-2xl p-4 border border-gray-200/50">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm font-semibold">Total Projects:</span>
                    <span className="text-slate-800 font-bold text-lg">
                      {userProjects?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 animate-scale-in">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">{userProjects?.length || 0}</div>
                  <div className="text-sm text-slate-600 font-medium">Projects Created</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <div className="text-2xl font-bold text-purple-600">
                    {profile?.isComplete ? '100%' : '50%'}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Profile Complete</div>
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
