import { useEffect, useState } from 'react';
import StudentNavbar from '../../components/StudentNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { getTopics } from '../../features/projectTopic/projectTopicSlice';
import { addProject } from '../../features/project/projectSlice';

const StudentDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const { projectTopics } = useSelector(state => state.projectTopic);
  const { profile } = useSelector(state => state.profile);
  const { project } = useSelector(state => state.project)

  const dispatch = useDispatch();

  const [selectedProjectTopic, setselectedProjectTopic] = useState(null);
 
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [githubLink, setgithubLink] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  const isProjectOverdue = (lastDate) => {
    return new Date(lastDate) < new Date();
  };


  const handleProjectSubmit = () => {
    dispatch(addProject({githubLink,description ,  projectId : selectedProjectTopic._id }))
  
    // 🟡 Send to backend here
    setShowSubmitForm(false);
    setgithubLink('');
    setDescription('');
    alert('Project submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <StudentNavbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!profile?.isComplete && (
          <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Please complete your profile first!</span>{' '}
                  <a href="/student/profile" className="underline hover:text-yellow-800">
                    Complete Profile
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-secondary-600 mt-2">Here are your current projects and assignments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectTopics.map((projectTopic) => {
            const isOverdue = isProjectOverdue(projectTopic.last_date);

            return (
              <div key={projectTopic.id} className="card hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-secondary-900">
                    {projectTopic.topic}
                  </h3>
                </div>

                <p className="text-secondary-600 mb-4">
                  <button
                    onClick={() => setselectedProjectTopic(projectTopic)}
                    className="text-blue-600 underline hover:text-blue-800 text-sm"
                  >
                    Click here for details
                  </button>
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Submission Date:</span>
                    <span className="text-secondary-700 font-medium">
                      {new Date(projectTopic.submission_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Last Date:</span>
                    <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-secondary-700'}`}>
                      {new Date(projectTopic.last_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

             {project.isSubmit ? (
              <button
                className="w-full text-sm mt-4 bg-gray-400 text-white py-2 rounded cursor-not-allowed"
                disabled
              >
                Project already submitted
              </button>
              ) : (
                <button
                  onClick={() => {
                    setselectedProjectTopic(projectTopic);
                    setShowSubmitForm(true);
                  }}
                  className="w-full btn-primary text-sm mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  Submit Project
                </button>
              )}

              </div>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {projectTopics.length}
            </div>
            <div className="text-secondary-600">Total Projects</div>
          </div>
        </div>
      </div>

      {/* 🔽 Modal for Details 🔽 */}
      {selectedProjectTopic && !showSubmitForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-secondary-900">{selectedProjectTopic.topic}</h2>
              <button
                onClick={() => setselectedProjectTopic(null)}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="text-secondary-700 whitespace-pre-wrap">
              {selectedProjectTopic.details}
            </div>
          </div>
        </div>
      )}

      {/* 🔽 Modal for Submit URL + Description 🔽 */}
      {showSubmitForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-secondary-900">
              Submit Project for "{selectedProjectTopic?.topic}"
            </h2>

            <input
              type="url"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter your project URL"
              value={githubLink}
              onChange={(e) => setgithubLink(e.target.value)}
            />

            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter a short description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-end gap-4">
            <button
  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
  onClick={() => {
    setShowSubmitForm(false);
    setselectedProjectTopic(null); // 👈 this hides the description/details
    setgithubLink('');
    setDescription('');
  }}
>
  Cancel
</button>

              <button
                onClick={handleProjectSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
