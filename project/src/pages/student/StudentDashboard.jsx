import { useEffect, useState } from 'react';
import StudentNavbar from '../../components/StudentNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { getTopics } from '../../features/projectTopic/projectTopicSlice';
import { addProject } from '../../features/project/projectSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const StudentDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const { projectTopics } = useSelector(state => state.projectTopic);
  const { profile } = useSelector(state => state.profile);
  const { project } = useSelector(state => state.project)

  const dispatch = useDispatch();
  const navigate = useNavigate()

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

  const handleProjectSubmit = async() => {
    await dispatch(addProject({githubLink,description ,  projectId : selectedProjectTopic._id }))
  
    // 🟡 Send to backend here
    setShowSubmitForm(false);
    setselectedProjectTopic(null);
    setgithubLink('');
    setDescription('');
    toast.success("Project submitted successfully")
    navigate('/student/projects')
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern - matching login page */}
      <StudentNavbar />
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_70%)]"></div>
      </div> */}


      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!profile?.isComplete && (
          <div className="mb-8 bg-white/80 backdrop-blur-xl border-l-4 border-amber-400 p-6 rounded-2xl shadow-xl border border-white/50">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <svg className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="inline-flex items-center px-3 py-1 bg-amber-100 rounded-full text-amber-700 text-sm font-medium mb-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  Action Required
                </div>
                <p className="text-slate-700 font-medium">
                  Please complete your profile to access all features
                </p>
                <a 
                  href="/student/profile" 
                  className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  Complete Profile Now
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Your Workspace
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-slate-600 text-lg">Here are your current projects and assignments</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectTopics.map((projectTopic) => {
            const isOverdue = isProjectOverdue(projectTopic.last_date);

            return (
              <div key={projectTopic.id} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 transform transition-all duration-300 hover:shadow-3xl hover:scale-105">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center px-3 py-1 bg-indigo-100 rounded-full text-indigo-700 text-xs font-medium mb-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                      Project Assignment
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">
                      {projectTopic.topic}
                    </h3>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    onClick={() => setselectedProjectTopic(projectTopic)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
                  >
                    View Project Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="bg-gray-50/80 rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm font-medium">Submission Date</span>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-slate-800 font-semibold text-sm">
                          {new Date(projectTopic.submission_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50/80 rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm font-medium">Deadline</span>
                      <div className="flex items-center">
                        <svg className={`w-4 h-4 mr-2 ${isOverdue ? 'text-red-500' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className={`font-semibold text-sm ${isOverdue ? 'text-red-600' : 'text-slate-800'}`}>
                          {new Date(projectTopic.last_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {project.isSubmit ? (
                  <button
                    className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl font-semibold text-sm cursor-not-allowed flex items-center justify-center"
                    disabled
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Project Submitted
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setselectedProjectTopic(projectTopic);
                      setShowSubmitForm(true);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                  >
                    Submit Project
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔽 Modal for Details 🔽 */}
      {selectedProjectTopic && !showSubmitForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-3xl border border-white/50">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Project Details
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedProjectTopic.topic}</h2>
              </div>
              <button
                onClick={() => setselectedProjectTopic(null)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bg-gray-50/80 rounded-2xl p-6">
              <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {selectedProjectTopic.details}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔽 Modal for Submit URL + Description 🔽 */}
      {showSubmitForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-md p-8 shadow-3xl border border-white/50">
            <div className="mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Submit Project
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Submit "{selectedProjectTopic?.topic}"
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Project URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your project URL (GitHub, etc.)"
                  value={githubLink}
                  onChange={(e) => setgithubLink(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Project Description
                </label>
                <textarea
                  className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Brief description of your project"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                onClick={() => {
                  setShowSubmitForm(false);
                  setselectedProjectTopic(null);
                  setgithubLink('');
                  setDescription('');
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleProjectSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
              >
                Submit Project
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;