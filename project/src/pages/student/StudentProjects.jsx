import { useEffect, useState } from 'react';
import StudentNavbar from '../../components/StudentNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentProjects } from '../../features/project/projectSlice';
import { addreviews, getreviews } from '../../features/reviews/reviewSlice';

const StudentProjects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  const dispatch = useDispatch();
  const { projects } = useSelector(state => state.project);
  const { user } = useSelector(state => state.auth);
  const { reviews } = useSelector(state => state.review);

  useEffect(() => {
    dispatch(getStudentProjects());
    dispatch(getreviews());
  }, [dispatch]);

 


  const TabButton = ({ id, label, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 font-medium rounded-lg transition-colors ${
        activeTab === id
          ? 'bg-primary-600 text-white'
          : 'bg-white text-secondary-600 hover:bg-primary-50'
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

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const payload = { ...reviewData };
    const projectTopicId = selectedProject.projectTopic?._id;

    dispatch(addreviews({ payload, projectTopicId }));

    setReviewModal(false);
    setSelectedProject(null);
    setReviewData({ rating: 5, comment: '' });
    alert('Review submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <StudentNavbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Projects</h1>
          <p className="text-secondary-600 mt-2">View submitted projects and give reviews</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton id="all" label="All Projects" count={projects.length} />
            
          <TabButton id="reviewed" label="All reviews" count={reviews.length} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project._id} className="card hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg border">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {project.projectTopic?.topic || 'Untitled'}
                </h3>
              </div>

              <div className="mb-2 text-sm text-secondary-600">
                <span className="font-medium">Student:</span> {project.user?.name}
              </div>
              <div className="mb-4 text-sm text-secondary-600">
                <span className="font-medium">GitHub:</span>{' '}
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  View Code
                </a>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 btn-secondary text-sm"
                >
                  View Details
                </button>
                {project.user._id !== user._id && !project.reviewed && (
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setReviewModal(true);
                    }}
                    className="flex-1 btn-primary text-sm"
                  >
                    Give Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No projects found</h3>
            <p className="text-secondary-600">Projects will appear here once students submit their work.</p>
          </div>
        )}

        {/* REVIEW DISPLAY SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">All Reviews</h2>

          {reviews.length === 0 ? (
            <p className="text-secondary-600">No reviews available yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...reviews].reverse().map((review) => {
                const matchedProject = projects.find(
                  proj => proj.projectTopic?._id === review.projectTopic?._id
                );

                return (
                  <div key={review._id} className="border p-4 rounded-lg shadow-sm bg-white">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      {review.projectTopic?.topic || 'Unknown Topic'}
                    </h3>
                    <p className="text-sm text-secondary-700 mb-1">
                      <span className="font-medium">Student (project owner):</span> {matchedProject?.user?.name || 'Anonymous'}
                    </p>
                    <p className="text-sm text-secondary-700 mb-1">
                      <span className="font-medium">Student (gave the review):</span> {review.user?.name || 'Anonymous'}
                    </p>
                    <p className="text-sm text-secondary-700 mb-1">
                      <span className="font-medium">Rating:</span> {'⭐'.repeat(review.rating)}
                    </p>
                    <p className="text-sm text-secondary-700 mb-2">
                      <span className="font-medium">Comment:</span> {review.comment}
                    </p>
                    <p className="text-xs text-secondary-500">
                      <span className="font-medium">Date:</span> {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedProject && !reviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              {selectedProject.projectTopic?.topic}
            </h3>
            <p className="mb-4 text-sm text-secondary-700">
              <span className="font-medium">Student:</span> {selectedProject.user?.name}
            </p>
            <p className="mb-4 text-sm text-secondary-700">
              <span className="font-medium">Description:</span> {selectedProject.description}
            </p>
            <div className="flex justify-end">
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mr-2"
              >
                View Code
              </a>
              <button onClick={() => setSelectedProject(null)} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Review Project: {selectedProject?.projectTopic?.topic}
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Rating (1-5 stars)
                </label>
                <select
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
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
                  Comment
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  rows={4}
                  className="input-field"
                  placeholder="Share your feedback..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setReviewModal(false);
                    setSelectedProject(null);
                  }}
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
  );
};

export default StudentProjects;
