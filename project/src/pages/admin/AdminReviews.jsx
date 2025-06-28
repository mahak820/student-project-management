import Sidebar from '../../components/Sidebar'
import { mockSubmissions, mockProjects, mockUsers } from '../../data/mockData'

const AdminReviews = () => {
  // Get all reviews (submissions with feedback)
  const reviewedSubmissions = mockSubmissions
    .filter(submission => submission.feedback)
    .map(submission => {
      const project = mockProjects.find(p => p.id === submission.projectId)
      const student = mockUsers.find(u => u.id === submission.studentId)
      return { ...submission, project, student }
    })

  const averageRating = reviewedSubmissions.length > 0 
    ? (reviewedSubmissions.reduce((sum, sub) => sum + (sub.rating || 0), 0) / reviewedSubmissions.length).toFixed(1)
    : 0

  const ratingDistribution = {
    5: reviewedSubmissions.filter(s => s.rating === 5).length,
    4: reviewedSubmissions.filter(s => s.rating === 4).length,
    3: reviewedSubmissions.filter(s => s.rating === 3).length,
    2: reviewedSubmissions.filter(s => s.rating === 2).length,
    1: reviewedSubmissions.filter(s => s.rating === 1).length,
  }

  return (
    <div className="flex min-h-screen bg-secondary-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="py-8 px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900">Reviews Management</h1>
            <p className="text-secondary-600 mt-2">
              View and analyze all project reviews
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {reviewedSubmissions.length}
              </div>
              <div className="text-secondary-600">Total Reviews</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {averageRating}
              </div>
              <div className="text-secondary-600">Average Rating</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {ratingDistribution[5] + ratingDistribution[4]}
              </div>
              <div className="text-secondary-600">Positive (4-5★)</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {mockSubmissions.length - reviewedSubmissions.length}
              </div>
              <div className="text-secondary-600">Pending Reviews</div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Rating Distribution */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                Rating Distribution
              </h2>
              
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-16">
                      <span className="text-sm font-medium text-secondary-700">{rating}</span>
                      <span className="text-yellow-400 ml-1">⭐</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-secondary-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 rounded-full h-2 transition-all duration-300"
                          style={{ 
                            width: reviewedSubmissions.length > 0 
                              ? `${(ratingDistribution[rating] / reviewedSubmissions.length) * 100}%` 
                              : '0%' 
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-secondary-600 w-8">
                      {ratingDistribution[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                  All Reviews ({reviewedSubmissions.length})
                </h2>
                
                {reviewedSubmissions.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {reviewedSubmissions.map((review) => (
                      <div key={review.id} className="border border-secondary-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-secondary-900">
                              {review.project?.title}
                            </h3>
                            <p className="text-sm text-secondary-600">
                              by {review.student?.name}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-sm text-secondary-700 ml-1 font-medium">
                              {review.rating}/5
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-secondary-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-secondary-700">
                            {review.feedback}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-secondary-500">
                          <span>Submitted: {new Date(review.submittedAt).toLocaleDateString()}</span>
                          {review.githubUrl && (
                            <a 
                              href={review.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700"
                            >
                              View Project →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-secondary-600">No reviews available yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project Performance */}
          <div className="mt-8">
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                Project Performance
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockProjects.map((project) => {
                  const projectReviews = reviewedSubmissions.filter(r => r.projectId === project.id)
                  const avgRating = projectReviews.length > 0
                    ? (projectReviews.reduce((sum, r) => sum + r.rating, 0) / projectReviews.length).toFixed(1)
                    : 'N/A'
                  
                  return (
                    <div key={project.id} className="border border-secondary-200 rounded-lg p-4">
                      <h3 className="font-semibold text-secondary-900 mb-2">
                        {project.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary-500">Submissions:</span>
                          <span className="text-secondary-700">
                            {mockSubmissions.filter(s => s.projectId === project.id).length}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-secondary-500">Reviews:</span>
                          <span className="text-secondary-700">{projectReviews.length}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-secondary-500">Avg Rating:</span>
                          <span className="text-secondary-700">
                            {avgRating !== 'N/A' && '⭐'} {avgRating}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReviews