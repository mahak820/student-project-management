import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { mockUsers, mockSubmissions, mockProjects } from '../../data/mockData'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllUsersAdmin } from '../../features/auth/authSlice'
import { getAllProjectsOfUser } from '../../features/project/projectSlice'

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [reviewModal, setReviewModal] = useState(false)
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' })
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  const dispatch = useDispatch()

  const {users , user} = useSelector(state => state.auth)
  const {projects , isLoading , isError} = useSelector(state => state.project)

  useEffect( () => {
    dispatch(getAllUsersAdmin())
  } , [dispatch])

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    // In real app, this would submit the review via API
    
    setReviewModal(false)
    setReviewData({ rating: 5, comment: '' })
    alert('Review submitted successfully!')
  }

  const handleClick = async(user) => {
    setSelectedUser(user)
    await dispatch(getAllProjectsOfUser(user._id))
  }

  return (
    <div className="flex flex-row min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      
      
      <div className='flex w-0 lg:w-72 bg-red-200'>
        <Sidebar/>
      </div>
      
      
      <div className="flex-1 lg:ml-0 transition-all duration-300">
        <div className="py-6 px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">👥</span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Users Management
                </h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">
                  View and manage all registered students with detailed insights
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:gap-8 xl:grid-cols-3">
            {/* Users List */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-fit sticky top-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 relative overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white text-lg">👨‍🎓</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">All Students</h2>
                        <p className="text-blue-100 text-sm">Total: {users?.length} students</p>
                      </div>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                </div>
                
                <div className="p-6 max-h-96 lg:max-h-[70vh] overflow-y-auto space-y-3 custom-scrollbar">
                  {users.map((user, index) => (
                    <div
                      key={user._id}
                      onClick={() => handleClick(user)}
                      className={`group p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                        selectedUser?._id === user._id
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg shadow-blue-200'
                          : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
                            selectedUser?._id === user._id 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-110'
                              : 'bg-gradient-to-r from-gray-400 to-gray-500 group-hover:from-blue-400 group-hover:to-purple-400'
                          }`}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                              {user.name}
                            </h3>
                            <p className="text-sm text-gray-600 truncate max-w-[150px]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <div className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${
                            user.profileComplete
                              ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                              : 'bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200'
                          }`}>
                            {user.profileComplete ? '✅ Complete' : '⚠️ Incomplete'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="xl:col-span-2">
              {selectedUser ? (
                <div className="space-y-6">
                  {/* User Profile Card */}
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 lg:px-8 py-6 relative overflow-hidden">
                      <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0 relative z-10">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white text-2xl font-bold">
                              {selectedUser.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white">
                              {selectedUser.name}
                            </h2>
                            <p className="text-indigo-100">{selectedUser.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-indigo-100 mb-2">
                            📅 Member since: {new Date(selectedUser.createdAt).toLocaleDateString()}
                          </div>
                          <div className={`inline-flex items-center space-x-2 text-xs px-4 py-2 rounded-full font-medium backdrop-blur-sm ${
                            selectedUser.profileComplete
                              ? 'bg-green-500/20 text-green-100 border border-green-400/30'
                              : 'bg-yellow-500/20 text-yellow-100 border border-yellow-400/30'
                          }`}>
                            <span>{selectedUser.profileComplete ? '✅' : '⚠️'}</span>
                            <span>Profile {selectedUser.profileComplete ? 'Complete' : 'Incomplete'}</span>
                          </div>
                        </div>
                      </div>
                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/10 rounded-full"></div>
                    </div>

                    <div className="p-6 lg:p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">📱</span>
                            </div>
                            <h3 className="font-bold text-gray-900">Contact Information</h3>
                          </div>
                          <div className="space-y-3">
                            {[
                              { label: 'Phone', value: selectedUser.phone || 'Not provided', icon: '📞' },
                              { label: 'Role', value: 'Student', icon: '🎓' }
                            ].map((item, index) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                <span className="text-gray-600 flex items-center space-x-2">
                                  <span>{item.icon}</span>
                                  <span className="font-medium">{item.label}:</span>
                                </span>
                                <span className="text-gray-900 font-semibold">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">📊</span>
                            </div>
                            <h3 className="font-bold text-gray-900">Activity Summary</h3>
                          </div>
                          <div className="space-y-3">
                            {[
                              { label: 'Projects Submitted', value: projects?.length || 0, icon: '📝' },
                              { label: 'Last Login', value: '2 days ago', icon: '🕒' }
                            ].map((item, index) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                <span className="text-gray-600 flex items-center space-x-2">
                                  <span>{item.icon}</span>
                                  <span className="font-medium">{item.label}:</span>
                                </span>
                                <span className="text-gray-900 font-semibold">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Projects Card */}
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 lg:px-8 py-6 relative overflow-hidden">
                      <div className="flex items-center space-x-4 relative z-10">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white text-xl">📚</span>
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold text-white">
                            Submitted Projects ({projects?.length || 0})
                          </h3>
                          <p className="text-emerald-100 text-sm">Track student progress and submissions</p>
                        </div>
                      </div>
                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                    </div>
                    
                    <div className="p-6 lg:p-8">
                      {projects?.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                          {projects?.map((project, index) => (
                            <div key={project._id} className="group border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50 hover:to-emerald-50">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-white text-sm font-bold">📄</span>
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                                      {project.projectTopic?.topic}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                      📅 Submitted: {new Date(project.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              {project.githubLink && (
                                <div className="mb-4">
                                  <a 
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg transition-all duration-300 group/link"
                                  >
                                    <span>🔗</span>
                                    <span>View on GitHub</span>
                                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">📝</span>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h4>
                          <p className="text-gray-600">This student hasn't submitted any projects yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="text-center py-16 lg:py-24">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-6xl">👤</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Select a Student
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Choose a student from the list to view their detailed profile, activity, and project submissions
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden transform animate-slideUp">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">
                  📝 Review Project
                </h3>
                <p className="text-purple-100 text-sm">
                  {selectedSubmission?.project?.title}
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-lg">⭐</span>
                    <span>Rating (1-5 stars)</span>
                  </label>
                  <select
                    value={reviewData.rating}
                    onChange={(e) => setReviewData({...reviewData, rating: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-gray-50 focus:bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ Good</option>
                    <option value={3}>⭐⭐⭐ Average</option>
                    <option value={2}>⭐⭐ Below Average</option>
                    <option value={1}>⭐ Poor</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-lg">💬</span>
                    <span>Feedback Comment</span>
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Provide detailed feedback to help the student improve..."
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setReviewModal(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>✨</span>
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </div>
  )
}

export default AdminUsers