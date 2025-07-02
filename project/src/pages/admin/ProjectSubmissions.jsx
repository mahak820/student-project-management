import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import { addAdminReview, getAllSubmissionOnTopic, getSingleProjectTopic } from '../../features/project/projectSlice'
import {toast} from 'react-toastify'

// Modal Component
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-100">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

// Confirm Dialog Component
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl border border-gray-100">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

const ProjectSubmissions = () => {
  const { _ptid } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {projects , isLoading , isError , projectTopics} = useSelector(state => state.project)

  useEffect(() => {
    dispatch(getAllSubmissionOnTopic(_ptid))
    dispatch(getSingleProjectTopic(_ptid))
  } , [dispatch])

  
  // State management
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState(null)
  
  const [reviewForm, setReviewForm] = useState({
    comment: '',
    rank: ''
  })

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const handleAddReview = (submission) => {
    setSelectedSubmission(submission)
    setReviewForm({ comment: '', rank: '' })
    setIsEditMode(false)
    setShowReviewModal(true)
  }

  const handleEditReview = (submission) => {
    setSelectedSubmission(submission)
    setReviewForm({
      comment: submission.adminReview,
      rank: submission.rank.toString()
    })
    setIsEditMode(true)
    setShowReviewModal(true)
  }

  const handleDeleteReview = (submission) => {
    setReviewToDelete(submission)
    setShowDeleteConfirm(true)
  }

  const handleSubmitReview = async() => {
    const formData = {
      projectId: selectedSubmission._id,
      comment: reviewForm.comment,
      rank: parseInt(reviewForm.rank)
    }

    await dispatch(addAdminReview(formData))

    if(isEditMode){
      toast.success("Review Updated")
    }
    else{
      toast.success("Review Added")
    }

    setIsEditMode(false)
    setShowReviewModal(false)
    setSelectedSubmission(null)
    setReviewForm({ comment: '', rank: '' })
  }

  const confirmDeleteReview = () => {
    setShowDeleteConfirm(false)
    setReviewToDelete(null)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'text-yellow-700 bg-gradient-to-r from-yellow-300 to-orange-400'
      case 2: return 'text-gray-700 bg-gradient-to-r from-gray-400 to-gray-500'
      case 3: return 'text-white bg-gradient-to-r from-orange-400 to-red-400'
      default: return 'text-blue-700 bg-gradient-to-r from-blue-400 to-indigo-400'
    }
  }

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return '🏆'
    }
  }

  return (
    <div className="flex flex-row min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      
      
      <div className='flex w-0 lg:w-72 bg-red-200'>
        <Sidebar/>
      </div>
      
      
      <div className="flex-1 lg:ml-0 transition-all duration-300">
        <div className="py-4 px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button & Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center group-hover:bg-blue-50 transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-medium">Back to Projects</span>
            </button>
          </div>

          {/* Project Details Card */}
          <div className="mb-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white mb-1">
                  Title : {projectTopics.topic}
                </h2>
                <p className="text-blue-100 text-sm">
                 Description :  {projectTopics.details}
                </p>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className=" p-3 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">📅</span>
                      </div>
                      <span className="text-green-700 font-bold">Submission Date</span>
                    </div>
                    <p className="text-green-800 font-bold">
                      {new Date(projectTopics.submission_date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className=" to-pink-100 p-3 rounded-xl border border-red-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">⏰</span>
                      </div>
                      <span className="text-red-700 font-bold">Last Date</span>
                    </div>
                    <p className="text-red-800 font-bold">
                      {new Date(projectTopics.last_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="mb-6 md:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">📝</span>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {projects?.length || 0}
                  </div>
                  <div className="text-gray-600 font-medium text-sm">Total Submissions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Submissions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((submission, index) => (
              <div 
                key={submission._id} 
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden"
              >
                {/* Submission Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 to-indigo-600 px-4 py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">👨‍💻</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          {submission.user.name}
                        </h3>
                        <p className="text-indigo-100 text-xs">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {submission.rank && (
                      <div className={`px-2 py-1 rounded-lg text-white font-bold text-xs ${getRankColor(submission.rank)}`}>
                        <span>{getRankIcon(submission.rank)}</span>
                        <span className="ml-1">{submission.rank}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submission Content */}
                <div className="p-4">
                  {/* GitHub Link */}
                  <a 
                    href={submission.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-300 border border-blue-200 text-sm mb-3 w-full justify-center"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <span>GitHub</span>
                  </a>
                  
                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {submission.adminReview ? (
                      <button
                        onClick={() => handleEditReview(submission)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-orange-500 hover:bg-orange-400 text-orange-600 hover:text-black font-semibold rounded-lg text-sm transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit Review</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddReview(submission)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg text-sm transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Review</span>
                      </button>
                    )}
                  </div>

                  {/* Review Display */}
                  {submission.adminReview && (
                    <div className="mt-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs">💬</span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm">Admin Review</h4>
                      </div>
                      <p className="text-gray-700 text-xs leading-relaxed">{truncateText(submission.adminReview, 80)}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Submissions Yet</h3>
              <p className="text-gray-500">Students haven't submitted their projects yet.</p>
            </div>
          )}

          {/* Review Modal */}
          <Modal
            isOpen={showReviewModal}
            onClose={() => setShowReviewModal(false)}
            title={isEditMode ? "Edit Review & Rank" : "Add Review & Rank"}
          >
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">👨‍💻</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">Reviewing submission by</span>
                    <p className="font-bold text-gray-900 text-sm">{selectedSubmission?.user?.name}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <span>🏆</span>
                  <span>Rank</span>
                </label>
                <select
                  name="rank"
                  value={reviewForm.rank}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 text-sm"
                  required
                >
                  <option value="">Select Rank</option>
                  <option value="1">🥇 1st Place</option>
                  <option value="2">🥈 2nd Place</option>
                  <option value="3">🥉 3rd Place</option>
                  <option value="4">🏆 4th Place</option>
                  <option value="5">🏆 5th Place</option>
                </select>
              </div>
              
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <span>💬</span>
                  <span>Review Comment</span>
                </label>
                <textarea
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleFormChange}
                  rows="4"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 resize-none text-sm"
                  placeholder="Enter your detailed review comments..."
                  required
                />
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm disabled:opacity-50"
                  disabled={!reviewForm.comment || !reviewForm.rank}
                >
                  {isEditMode ? 'Update Review' : 'Submit Review'}
                </button>
              </div>
            </div>
          </Modal>

          {/* Delete Confirmation Dialog */}
          <ConfirmDialog
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={confirmDeleteReview}
            title="Delete Review"
            message={`Are you sure you want to delete the review for ${reviewToDelete?.user?.name}? This action cannot be undone.`}
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectSubmissions