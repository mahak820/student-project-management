import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { mockProjects, mockSubmissions } from '../../data/mockData'

const AdminProjects = () => {
  const [activeTab, setActiveTab] = useState('topics') // topics, submissions
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    submissionDate: '',
    lastDate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProject) {
      // Update existing project
      console.log('Project updated:', formData)
      alert('Project updated successfully!')
    } else {
      // Create new project
      console.log('New project created:', formData)
      alert('Project created successfully!')
    }
    
    setFormData({ title: '', description: '', submissionDate: '', lastDate: '' })
    setEditingProject(null)
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      submissionDate: project.submissionDate.split('T')[0],
      lastDate: project.lastDate.split('T')[0]
    })
  }

  const handleDelete = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      console.log('Project deleted:', projectId)
      alert('Project deleted successfully!')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const assignRanking = (submissionId, ranking) => {
    console.log('Ranking assigned:', submissionId, ranking)
    alert(`Ranking ${ranking} assigned successfully!`)
  }

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 font-medium rounded-lg transition-colors ${
        activeTab === id
          ? 'bg-primary-600 text-white'
          : 'bg-white text-secondary-600 hover:bg-primary-50'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="flex min-h-screen bg-secondary-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="py-8 px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900">Projects Management</h1>
            <p className="text-secondary-600 mt-2">
              Create and manage project topics and submissions
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <TabButton id="topics" label="Project Topics" />
            <TabButton id="submissions" label="Submissions & Rankings" />
          </div>

          {activeTab === 'topics' ? (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Create/Edit Project Form */}
              <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                  {editingProject ? 'Edit Project Topic' : 'Create New Project Topic'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Submission Date
                      </label>
                      <input
                        type="date"
                        name="submissionDate"
                        value={formData.submissionDate}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Last Date
                      </label>
                      <input
                        type="date"
                        name="lastDate"
                        value={formData.lastDate}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary">
                      {editingProject ? 'Update Project' : 'Create Project'}
                    </button>
                    {editingProject && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(null)
                          setFormData({ title: '', description: '', submissionDate: '', lastDate: '' })
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Project Topics List */}
              <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                  Existing Project Topics ({mockProjects.length})
                </h2>
                
                <div className="space-y-4">
                  {mockProjects.map((project) => (
                    <div key={project.id} className="border border-secondary-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-secondary-900">
                          {project.title}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-secondary-500">Submission:</span>
                          <span className="text-secondary-700 ml-1">
                            {new Date(project.submissionDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-secondary-500">Last Date:</span>
                          <span className="text-secondary-700 ml-1">
                            {new Date(project.lastDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Submissions & Rankings Tab */
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                  Project Submissions & Rankings
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {mockSubmissions.map((submission) => {
                    const project = mockProjects.find(p => p.id === submission.projectId)
                    return (
                      <div key={submission.id} className="border border-secondary-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-secondary-900">
                            {project?.title}
                          </h3>
                          {submission.ranking && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              submission.ranking === '1st' ? 'bg-yellow-100 text-yellow-700' :
                              submission.ranking === '2nd' ? 'bg-gray-100 text-gray-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {submission.ranking} Place
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span className="text-secondary-500">Student ID:</span>
                            <span className="text-secondary-700">{submission.studentId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-secondary-500">Submitted:</span>
                            <span className="text-secondary-700">
                              {new Date(submission.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          {submission.rating && (
                            <div className="flex justify-between">
                              <span className="text-secondary-500">Rating:</span>
                              <span className="text-secondary-700">
                                ⭐ {submission.rating}/5
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {submission.githubUrl && (
                          <div className="mb-4">
                            <a 
                              href={submission.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 text-sm"
                            >
                              View on GitHub →
                            </a>
                          </div>
                        )}
                        
                        <div className="flex gap-1">
                          <button
                            onClick={() => assignRanking(submission.id, '1st')}
                            className="flex-1 text-xs py-2 px-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                          >
                            1st
                          </button>
                          <button
                            onClick={() => assignRanking(submission.id, '2nd')}
                            className="flex-1 text-xs py-2 px-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          >
                            2nd
                          </button>
                          <button
                            onClick={() => assignRanking(submission.id, '3rd')}
                            className="flex-1 text-xs py-2 px-2 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                          >
                            3rd
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminProjects