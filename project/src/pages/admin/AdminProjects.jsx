import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProjectTopic, getAllProjectTopcis, updateProjectTopic } from '../../features/project/projectSlice'
import { useNavigate } from 'react-router-dom'

// Move Modal component outside to prevent recreation on every render
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

// Move ConfirmDialog component outside to prevent recreation on every render
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

const AdminProjects = () => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [selectedDescription, setSelectedDescription] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {allTopics} = useSelector(state => state.project)
  
  const [formData, setFormData] = useState({
    topic: '',
    details: '',
    submission_date: '',
    last_date: ''
  })

  useEffect(() => {
    dispatch(getAllProjectTopcis())
  } , [dispatch])

  const handleViewDescription = (description) => {
    setSelectedDescription(description)
    setShowDescriptionModal(true)
  }

  const handleEdit = (project) => {
    setFormData({
      topic: project.topic || '',
      details: project.details || '',
      submission_date: project.submission_date?.slice(0, 10) || '',
      last_date: project.last_date?.slice(0, 10) || ''
    })
    setEditingProject(project)
    setTimeout(() => setShowEditModal(true), 0)
  }

  const handleUpdate = () => {
    dispatch(updateProjectTopic({ptid : editingProject._id , formData}))
    setShowEditModal(false)
    setEditingProject(null)
    setFormData({ topic: '', details: '', submission_date: '', last_date: '' })
  }

  const handleDeleteClick = (project) => {
    setProjectToDelete(project)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    let ptid = projectToDelete._id
    dispatch(deleteProjectTopic(ptid))
    setShowDeleteConfirm(false)
    setProjectToDelete(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
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
                <span className="text-white text-xl font-bold">📚</span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Projects Management
                </h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">
                  Manage project topics and monitor submissions
                </p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="mb-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                      {allTopics?.length || 0}
                    </div>
                    <div className="text-gray-600 font-medium">Total Active Projects</div>
                  </div>
                </div>
                
                {/* Decorative Element */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {allTopics?.map((project, index) => (
              <div 
                key={project._id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 relative overflow-hidden">
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <span className="text-white text-sm">📝</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-100 transition-colors duration-300 truncate">
                          {project?.topic}
                        </h3>
                        <p className="text-blue-100 text-xs">Project Topic</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 flex-shrink-0 ml-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="group/btn p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm"
                        title="Edit Project"
                      >
                        <svg className="w-4 h-4 transform group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(project)}
                        className="group/btn p-2 text-white hover:bg-red-500/30 rounded-lg transition-all duration-300 backdrop-blur-sm"
                        title="Delete Project"
                      >
                        <svg className="w-4 h-4 transform group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-white/10 rounded-full"></div>
                </div>

                {/* Project Content */}
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Description Section */}
                    <div className="group/desc">
                      <button
                        onClick={() => handleViewDescription(project?.details)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group-hover/desc:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300 text-sm"
                      >
                        <span>📄</span>
                        <span>View Description</span>
                        <svg className="w-3 h-3 transform group-hover/desc:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Dates Grid */}
                    <div className="space-y-3">
                      <div className="group/date  p-3 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-md flex items-center justify-center">
                            <span className="text-white text-xs">📅</span>
                          </div>
                          <span className="text-green-700 font-medium text-xs">Submission</span>
                        </div>
                        <p className="text-sm font-bold text-green-800">
                          {new Date(project?.submission_date).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="group/date  to-pink-100 p-3 rounded-xl border border-red-200 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-md flex items-center justify-center">
                            <span className="text-white text-xs">⏰</span>
                          </div>
                          <span className="text-red-700 font-medium text-xs">Last Date</span>
                        </div>
                        <p className="text-sm font-bold text-red-800">
                          {new Date(project?.last_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* View Submissions Button */}
                    <button 
                      onClick={() => navigate(`/admin/projects/${project._id}`)} 
                      className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700  text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group/btn text-sm"
                    >
                      <span className="group-hover/btn:animate-bounce">👀</span>
                      <span>View Submissions</span>
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {(!allTopics || allTopics.length === 0) && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No Projects Yet</h3>
              <p className="text-gray-500">Create your first project to get started</p>
            </div>
          )}

          {/* Description Modal */}
          <Modal
            isOpen={showDescriptionModal}
            onClose={() => setShowDescriptionModal(false)}
            title="Project Description"
          >
            <div className="prose max-w-none">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-gray-700 leading-relaxed text-base">{selectedDescription}</p>
              </div>
            </div>
          </Modal>

          {/* Edit Modal */}
          <Modal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            title="Edit Project"
          >
            <div className="space-y-6">
              <div className="group/field">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <span className="text-lg">📝</span>
                  <span>Project Title</span>
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 focus:bg-white group-hover/field:border-gray-300"
                  required
                />
              </div>
              
              <div className="group/field">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <span className="text-lg">📄</span>
                  <span>Description</span>
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 focus:bg-white resize-none group-hover/field:border-gray-300"
                  required
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="group/field">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-lg">📅</span>
                    <span>Submission Date</span>
                  </label>
                  <input
                    type="date"
                    name="submission_date"
                    value={formData.submission_date}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 focus:bg-white group-hover/field:border-gray-300"
                    required
                  />
                </div>
                
                <div className="group/field">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-lg">⏰</span>
                    <span>Last Date</span>
                  </label>
                  <input
                    type="date"
                    name="last_date"
                    value={formData.last_date}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 focus:bg-white group-hover/field:border-gray-300"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end pt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Update Project
                </button>
              </div>
            </div>
          </Modal>

          {/* Delete Confirmation Dialog */}
          <ConfirmDialog
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={confirmDelete}
            title="Delete Project"
            message={`Are you sure you want to delete "${projectToDelete?.topic}"? This action cannot be undone.`}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminProjects