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

  const students = mockUsers.filter(user => user.role === 'student')
  const dispatch = useDispatch()

  const {users} = useSelector(state => state.auth)
  const {projects , isLoading , isError} = useSelector(state => state.project)

  useEffect( () => {
    dispatch(getAllUsersAdmin())
  } , [dispatch])


  const getUserSubmissions = (userId) => {
    return mockSubmissions.filter(s => s.studentId === userId).map(submission => {
      const project = mockProjects.find(p => p.id === submission.projectId)
      return { ...submission, project }
    })
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    // In real app, this would submit the review via API
    console.log('Review submitted:', reviewData)
    setReviewModal(false)
    setReviewData({ rating: 5, comment: '' })
    alert('Review submitted successfully!')
  }

  const handleClick = async(user) => {

    setSelectedUser(user)
    
    await dispatch(getAllProjectsOfUser(user._id))

  }

  return (
    <div className="flex min-h-screen bg-secondary-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="py-8 px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900">Users Management</h1>
            <p className="text-secondary-600 mt-2">
              View and manage all registered users
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Users List */}
            <div className="lg:col-span-1">
              <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  All Students ({users?.length})
                </h2>
                
                <div className="space-y-3">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => handleClick(user)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedUser?._id === user._id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-secondary-200 hover:border-secondary-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-secondary-900">
                            {user.name}
                          </h3>
                          <p className="text-sm text-secondary-600">
                            {user.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            user.profileComplete
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.profileComplete ? 'Complete' : 'Incomplete'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="lg:col-span-2">
              {selectedUser ? (
                <div className="space-y-6">
                  {/* User Profile */}
                  <div className="card">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-secondary-900">
                          {selectedUser.name}
                        </h2>
                        <p className="text-secondary-600">{selectedUser.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-secondary-500 mb-1">
                          Member since: {new Date(selectedUser.createdAt).toLocaleDateString()}
                        </div>
                        <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                          selectedUser.profileComplete
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          Profile {selectedUser.profileComplete ? 'Complete' : 'Incomplete'}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-secondary-900 mb-3">Contact Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-secondary-500">Phone:</span>
                            <span className="text-secondary-700">{selectedUser.phone || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-secondary-500">Role:</span>
                            <span className="text-secondary-700 capitalize">Student</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-secondary-900 mb-3">Activity Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-secondary-500">Projects Submitted:</span>
                            <span className="text-secondary-700">{projects?.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-secondary-500">Last Login:</span>
                            <span className="text-secondary-700">2 days ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Projects */}
                  <div className="card">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                      Submitted Projects ({projects?.length})
                    </h3>
                    
                    {projects?.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {projects?.map((project) => (
                          <div key={project._id} className="border border-secondary-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-medium text-secondary-900">
                                {project.projectTopic?.topic}
                              </h4>
                              {/* {project.rating && (
                                <div className="flex items-center">
                                  <span className="text-yellow-400">⭐</span>
                                  <span className="text-sm text-secondary-600 ml-1">
                                    {project.rating}/5
                                  </span>
                                </div>
                              )} */}
                            </div>
                            
                            <p className="text-sm text-secondary-600 mb-3">
                              Submitted: {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                            
                            {project.githubLink && (
                              <div className="mb-3">
                                <a 
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-600 hover:text-primary-700 text-sm"
                                >
                                  View on GitHub →
                                </a>
                              </div>
                            )}
                            
                            {/* {submission.feedback ? (
                              <div className="p-3 bg-secondary-50 rounded-lg mb-3">
                                <p className="text-sm text-secondary-700">
                                  <span className="font-medium">Feedback:</span> {submission.feedback}
                                </p>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedSubmission(submission)
                                  setReviewModal(true)
                                }}
                                className="btn-primary text-sm w-full"
                              >
                                Give Review
                              </button>
                            )} */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-3">📝</div>
                        <p className="text-secondary-600">No projects submitted yet</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="card text-center py-12">
                  <div className="text-6xl mb-4">👤</div>
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">
                    Select a User
                  </h3>
                  <p className="text-secondary-600">
                    Choose a user from the list to view their profile and projects
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Review Project: {selectedSubmission?.project?.title}
            </h3>
            
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Rating (1-5 stars)
                </label>
                <select
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({...reviewData, rating: parseInt(e.target.value)})}
                  className="input-field"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Good</option>
                  <option value={3}>⭐⭐⭐ Average</option>
                  <option value={2}>⭐⭐ Below Average</option>
                  <option value={1}>⭐ Poor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Feedback Comment
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  rows={4}
                  className="input-field"
                  placeholder="Provide detailed feedback..."
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setReviewModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers