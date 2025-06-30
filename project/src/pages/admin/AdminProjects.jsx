import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjectTopcis, updateProjectTopic } from '../../features/project/projectSlice'

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "Build a fully functional e-commerce website using React and Node.js. The website should include user authentication, product catalog, shopping cart functionality, payment integration, and admin dashboard. Students should implement responsive design, proper state management, and follow best practices for security and performance. The project should demonstrate understanding of full-stack development concepts including database design, API development, and frontend-backend integration.",
    submissionDate: "2025-01-15",
    lastDate: "2025-02-28"
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Create a cross-platform mobile application using React Native or Flutter. The app should solve a real-world problem and include features like user registration, data persistence, API integration, and push notifications. Students must focus on creating an intuitive user interface and smooth user experience.",
    submissionDate: "2025-01-20",
    lastDate: "2025-03-15"
  },
  {
    id: 3,
    title: "AI/ML Project",
    description: "Develop a machine learning project that demonstrates understanding of AI concepts. This could include image recognition, natural language processing, predictive analytics, or recommendation systems.",
    submissionDate: "2025-02-01",
    lastDate: "2025-03-30"
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description: "Create an interactive dashboard for data visualization using tools like D3.js, Chart.js, or similar libraries. The dashboard should present complex data in an easily understandable format.",
    submissionDate: "2025-01-25",
    lastDate: "2025-03-10"
  }
]

// Move Modal component outside to prevent recreation on every render
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-6">
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

const AdminProjects = () => {
  const [projects, setProjects] = useState(mockProjects)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [selectedDescription, setSelectedDescription] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)

  const dispatch = useDispatch()

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
    setProjects(projects.filter(p => p.id !== projectToDelete.id))
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
    <div className='flex min-h-screen bg-secondary-50'>
      <Sidebar/>
      <div className="flex-1 ml-64 min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
            <p className="text-gray-600 mt-2">
              Manage project topics
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6">
            {allTopics?.map((project) => (
              <div key={project._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{project?.topic}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="Edit Project"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(project)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        title="Delete Project"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      {/* <p className="text-gray-600 text-sm mb-2">
                        {truncateText(project?.details)}
                      </p> */}
                      <button
                        onClick={() => handleViewDescription(project?.details)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Description
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Submission Date:</span>
                        <p className="font-medium">{new Date(project?.submission_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Date:</span>
                        <p className="font-medium">{new Date(project?.last_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    View Submissions
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Description Modal */}
          <Modal
            isOpen={showDescriptionModal}
            onClose={() => setShowDescriptionModal(false)}
            title="Project Description"
          >
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{selectedDescription}</p>
            </div>
          </Modal>

          {/* Edit Modal */}
          <Modal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            title="Edit Project"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows="6"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
                  <input
                      type="date"
                      name="submission_date"
                      value={formData.submission_date}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Date</label>
                  <input
                    type="date"
                    name="last_date"
                    value={formData.last_date}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
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
            message={`Are you sure you want to delete "${projectToDelete?.title}"? This action cannot be undone.`}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminProjects