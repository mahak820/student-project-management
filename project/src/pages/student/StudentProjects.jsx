
import { useEffect, useState } from 'react';
import StudentNavbar from '../../components/StudentNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentProjects } from '../../features/project/projectSlice';
import { addreviews, getreviews } from '../../features/reviews/reviewSlice';
// Import rank function - adjust path as needed
import { Rank } from '../../features/rank/rankSlice'; // Please adjust this import
import { getTopics } from '../../features/projectTopic/projectTopicSlice';

const StudentProjects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  const dispatch = useDispatch();
  const { projects } = useSelector(state => state.project);
  const { user } = useSelector(state => state.auth);
  const { reviews } = useSelector(state => state.review);
  const { ranks } = useSelector(state => state.rank); // Add rank state
  const { projectTopics } = useSelector(state => state.projectTopic)

  useEffect(() => {
    dispatch(getStudentProjects());
    dispatch(getreviews());
    dispatch(getTopics())
  }, [dispatch]);

  const TabButton = ({ id, label, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
        activeTab === id
          ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-xl'
          : 'bg-white/90 backdrop-blur-xl text-slate-700 hover:bg-white hover:shadow-xl border border-white/50'
      }`}
    >
      {label} ({count})
    </button>
  );

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'submitted') return project.user._id === user._id;
    if (activeTab === 'reviewed') return !project.reviewed && project.user._id !== user._id;
    return true;
  });

  const filteredContent = () => {
    if (activeTab === 'projects') return projects;
    if (activeTab === 'reviews') return reviews;
    if (activeTab === 'ranks') return ranks || [];
    return projects; // default to all projects
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const projectTopicId = selectedProject.projectTopic?._id;
    const projectId = selectedProject._id;
    const payload = { ...reviewData, projectId };

    dispatch(addreviews({ payload, projectTopicId }));

    setReviewModal(false);
    setSelectedProject(null);
    setReviewData({ rating: 5, comment: '' });
    
    // Create a nice toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-fade-in';
    toast.textContent = 'Review submitted successfully! ✅';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Process ranks data for display
  const rankData = ranks ? ranks.reduce((acc, rank) => {
    const existingTopic = acc.find(item => item.topicId === rank.topicId);
    if (existingTopic) {
      existingTopic.ranks.push(rank);
    } else {
      acc.push({
        topicId: rank.topicId,
        topicName: rank.topicName,
        ranks: [rank]
      });
    }
    return acc;
  }, []) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Floating background elements */}
      

      <StudentNavbar />

      <div className="relative z-10 max-w-7xl mx-auto py-10 px-6 sm:px-10 lg:px-12">
        <div className="mb-10 text-center animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-ping"></span>
            Project Management Hub
          </div>
          <h1 className="text-5xl font-extrabold text-slate-800 mb-2 tracking-tight">
            Student <span className="text-indigo-600">Projects</span> 🚀
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore projects, share reviews, and track rankings in your academic journey
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10 animate-scale-in">
          <TabButton id="all" label="All Projects" count={projects.length} />
          <TabButton id="reviews" label="All Reviews" count={reviews.length} />
          <TabButton id="ranks" label="Rankings" count={ranks?.length || 0} />
        </div>

        {/* Projects Tab */}
        {(activeTab === 'all' || activeTab === 'projects') && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {filteredProjects.map((project, index) => (
              <div 
                key={project._id} 
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-3xl border border-white/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-4xl group relative"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Project
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-700 transition-colors duration-300">
                    {project?.projectTopic?.topic || 'Untitled'}
                  </h3>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p><span className="font-semibold text-slate-800">Student:</span> {project.user?.name}</p>
                    
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-2 text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">GitHub:</span>{' '}
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">
                      View Code
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    👁️ View Details
                  </button>
                  {project?.user?._id !== user?._id && !project?.reviewed && (
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setReviewModal(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      ⭐ Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="animate-fade-in">
            {reviews.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 animate-float">⭐</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No reviews found</h3>
                <p className="text-slate-600 text-lg">Reviews will appear here once students provide feedback.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...reviews].reverse().map((review, index) => {
                  const matchedProject = projects.find(
                    proj => proj.projectTopic?._id === review.projectTopic?._id
                  );

                  return (
                    <div 
                      key={review._id} 
                      className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-3xl border border-white/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-4xl relative"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Review
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-4">
                        {review.projectTopic?.topic || 'Unknown Topic'}
                      </h3>
                      
                      <div className="space-y-3 text-sm">
                        <p className="text-slate-600">
                          <span className="font-semibold text-slate-800">Project Owner:</span> {matchedProject?.user?.name || 'Anonymous'}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-semibold text-slate-800">Reviewer:</span> {review.user?.name || 'Anonymous'}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">Rating:</span>
                          <div className="flex">
                            {Array.from({length: 5}, (_, i) => (
                              <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                          <p className="text-slate-700 italic">"{review.comment}"</p>
                        </div>
                        <p className="text-xs text-slate-500">
                          📅 {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Rankings Tab */}
        {activeTab === 'ranks' && (
          <div className="space-y-12 animate-fade-in">
            {!ranks || ranks.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 animate-float">🏆</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No rankings found</h3>
                <p className="text-slate-600 text-lg">Rankings will appear here once projects are evaluated.</p>
              </div>
            ) : (
              rankData.map((item, topicIndex) => (
                <div key={item.topicId} className="animate-scale-in" style={{animationDelay: `${topicIndex * 0.2}s`}}>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full text-purple-700 text-sm font-bold mb-4">
                      📘 Topic Ranking
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">
                      {item.topicName}
                    </h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {item.ranks.map((rank, index) => (
                      <div 
                        key={index} 
                        className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-3xl border border-white/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-4xl relative overflow-hidden"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl">
                          #{rank.position}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-indigo-600 font-bold text-lg">
                                {rank.name?.charAt(0) || 'A'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800">{rank.name || 'Anonymous'}</h4>
                              <p className="text-sm text-slate-600">Rank #{rank.position}</p>
                            </div>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-slate-700 text-sm leading-relaxed">
                              {rank.description}
                            </p>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <a 
                              href={rank.githubLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1 transition-colors duration-200"
                            >
                              💻 View Code
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>

                            <div className="flex items-center gap-1">
                              {rank.position <= 3 && (
                                <span className="text-2xl">
                                  {rank.position === 1 && '🥇'}
                                  {rank.position === 2 && '🥈'}
                                  {rank.position === 3 && '🥉'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Empty state for projects */}
        {(activeTab === 'all' || activeTab === 'projects') && filteredProjects.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-8xl mb-6 animate-float">📝</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No projects found</h3>
            <p className="text-slate-600 text-lg">Projects will appear here once students submit their work.</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedProject && !reviewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-4xl border border-white/50 animate-scale-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Project Details
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {selectedProject.projectTopic?.topic}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50/80 rounded-2xl p-6">
                <h4 className="font-semibold text-slate-800 mb-2">Student</h4>
                <p className="text-slate-600">{selectedProject.user?.name}</p>
              </div>
              
              <div className="bg-gray-50/80 rounded-2xl p-6">
                <h4 className="font-semibold text-slate-800 mb-2">Description</h4>
                <p className="text-slate-600">{selectedProject.description}</p>
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-sky-600 text-white py-3 rounded-2xl font-semibold text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  💻 View Code
                </a>
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-md p-8 shadow-4xl border border-white/50 animate-scale-in">
            <div className="mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Submit Review
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Review "{selectedProject?.projectTopic?.topic}"
              </h3>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Rating (1-5 stars)
                </label>
                <select
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Good</option>
                  <option value={3}>⭐⭐⭐ Average</option>
                  <option value={2}>⭐⭐ Below Average</option>
                  <option value={1}>⭐ Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Comment
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Share your feedback..."
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setReviewModal(false);
                    setSelectedProject(null);
                  }}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  Submit Review
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProjects;
