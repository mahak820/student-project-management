import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import { mockSubmissions, mockProjects, mockUsers } from '../../data/mockData'
import { useEffect } from 'react'
import { getAllReviewsAdmin } from '../../features/reviews/reviewSlice'

const AdminReviews = () => {

  const {reviews} = useSelector(state => state.review)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllReviewsAdmin())
  } , [])
  

  // Get all reviews (submissions with feedback)
  const reviewedSubmissions = mockSubmissions
    .filter(submission => submission.feedback)
    .map(submission => {
      const project = mockProjects.find(p => p.id === submission.projectId)
      const student = mockUsers.find(u => u.id === submission.studentId)
      return { ...submission, project, student }
    })

  const averageRating = reviews?.length > 0 
    ? (reviews.reduce((sum, sub) => sum + (sub.rating || 0), 0) / reviews?.length).toFixed(1)
    : 0

  return (
    <div className="flex flex-row min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
     
      
      <div className='flex w-0 lg:w-72 bg-red-200'>
        <Sidebar/>
      </div>
      
      
      <div className="flex-1  lg:ml-0 transition-all duration-300">
        <div className="py-6 px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">⭐</span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Reviews Management
                </h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">
                  View and analyze all project reviews from students
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { 
                value: reviews?.length, 
                label: 'Total Reviews', 
                color: 'from-purple-500 to-purple-600', 
                icon: '📊',
                bgColor: 'from-purple-50 to-purple-100',
                shadowColor: 'shadow-purple-200'
              },
              { 
                value: averageRating, 
                label: 'Average Rating', 
                color: 'from-yellow-500 to-orange-500', 
                icon: '⭐',
                bgColor: 'from-yellow-50 to-orange-100',
                shadowColor: 'shadow-orange-200'
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`relative group bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl ${stat.shadowColor} transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform duration-300`}>
                      <span className="text-white text-2xl lg:text-3xl">{stat.icon}</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm lg:text-base font-medium group-hover:text-gray-700 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Reviews List */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
              <span className="text-2xl">📝</span>
              <span>All Reviews ({reviews?.length})</span>
            </h2>
            <p className="text-gray-600 text-sm">Individual project reviews and ratings</p>
          </div>

          {reviews?.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-lg">📋</span>
                  <h3 className="text-white text-lg font-bold">Reviews List</h3>
                </div>
              </div>

              {/* Reviews List */}
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {reviews.map((review, index) => (
                  <div 
                    key={review._id} 
                    className="p-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      {/* Left Section - Project Info & Rating */}
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          {/* Rating Badge */}
                          <div className="flex-shrink-0">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl px-3 py-2 shadow-md">
                              <div className="flex items-center space-x-1">
                                <span className="text-white text-sm">⭐</span>
                                <span className="text-white font-bold text-sm">
                                  {review?.rating}/5
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Project Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors duration-300">
                              {review.projectTopic?.topic}
                            </h4>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <span className="text-sm">👤</span>
                                <span>Author: <span className="font-medium text-gray-700">{review?.project?.user?.name}</span></span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-sm">👤</span>
                                <span>Comment By: <span className="font-medium text-gray-700">{review?.user?.name}</span></span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-sm">🗓️</span>
                                <span>  <span className="font-medium text-gray-700">{new Date(review.createdAt).toLocaleDateString()}</span></span>
                              </div>
                            </div>
                            
                            {/* Review Comment */}
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm">💬</span>
                                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Review Comment</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Section - Action Buttons */}
                      <div className="flex space-x-3 lg:ml-6">
                        {review.project.githubLink && (
                          <a 
                            href={review.project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 group/btn"
                          >
                            <span className="text-sm group-hover/btn:animate-bounce">🔗</span>
                            <span>View Project</span>
                          </a>
                        )}
                        
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 text-lg">
                Reviews will appear here once students start submitting feedback
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminReviews