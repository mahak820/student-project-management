
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
  const { project } = useSelector(state => state.project);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleProjectSubmit = async () => {
    if(githubLink && description){
          await dispatch(addProject({ githubLink, description, projectId: selectedProjectTopic._id }));
          toast.success("Project submitted successfully");
          navigate('/student/projects');

    } else{
      toast.error("Please fill all details")
    }


    setShowSubmitForm(false);
    setselectedProjectTopic(null);
    setgithubLink('');
    setDescription('');
  };

  const getDaysRemaining = (lastDate) => {
    const today = new Date();
    const deadline = new Date(lastDate);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      <StudentNavbar />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-200/15 to-pink-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Particles */}
        
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-6 sm:px-10 lg:px-12">
        {/* Enhanced Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 backdrop-blur-sm rounded-full text-blue-700 text-sm font-semibold mb-6 shadow-lg border border-white/50">
            <div className="flex space-x-1 mr-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping delay-75"></span>
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping delay-150"></span>
            </div>
            Your Creative Workspace
          </div>
          
          <div className="relative">
            <h1 className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 mb-4 tracking-tight leading-tight">
              Welcome back,
            </h1>
            <h2 className="text-5xl text-center py-2 lg:text-6xl text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 mb-6 tracking-tight">
              {user?.name}! 
              <span className="inline-block ml-3 animate-bounce">👨‍💻</span>
            </h2>
            <div className="absolute -top-4 -right-4 text-6xl opacity-10 animate-spin-slow">✨</div>
          </div>
          
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Transform your ideas into reality with our streamlined project management platform
          </p>
          
          {/* Stats Bar */}
          <div className="flex justify-center mt-8">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{projectTopics.length}</div>
                  <div className="text-sm text-slate-600">Active Projects</div>
                </div>
                
                
                <div className="w-px h-8 bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {projectTopics.filter(p => isProjectOverdue(p.last_date)).length}
                  </div>
                  <div className="text-sm text-slate-600">Overdue</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Project Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectTopics.map((projectTopic, index) => {
            const isOverdue = isProjectOverdue(projectTopic.last_date);
            const daysRemaining = getDaysRemaining(projectTopic.last_date);

            return (
              <div
                key={projectTopic.id}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60 transition-all duration-100 transform hover:-translate-y-3 hover:shadow-3xl hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                {/* Status Badge */}
                <div className={`absolute -top-4 -right-4 px-4 py-2 rounded-2xl text-xs font-bold shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300 ${
                  isOverdue 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                    : daysRemaining <= 3 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                }`}>
                  {isOverdue ? '⚠️ Overdue' : daysRemaining <= 3 ? '⏰ Due Soon' : '✨ Active'}
                </div>

                {/* Project Icon */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {projectTopic.topic.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                    📋
                  </div>
                </div>

                {/* Project Title */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-indigo-700 transition-colors duration-300">
                    {projectTopic.topic}
                  </h3>
                  <button
                    onClick={() => setselectedProjectTopic(projectTopic)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Progress Indicator */}
              

                {/* Date Information */}
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-xl">
                    <span className="text-slate-600 font-medium">📅 Submission:</span>
                    <span className="font-bold text-slate-900">
                      {new Date(projectTopic.submission_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-xl">
                    <span className="text-slate-600 font-medium">⏰ Deadline:</span>
                    <span className={`font-bold ${isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                      {new Date(projectTopic.last_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* Days Remaining Indicator */}
                  <div className="text-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      isOverdue 
                        ? 'bg-red-100 text-red-700' 
                        : daysRemaining <= 3 
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}>
                      {isOverdue 
                        ? `${Math.abs(daysRemaining)} days overdue` 
                        : `${daysRemaining} days remaining`
                      }
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  {project.isSubmit ? (
                    <button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-bold cursor-not-allowed flex items-center justify-center shadow-lg"
                      disabled
                    >
                      <span className="mr-2">✅</span>
                      Project Submitted
                      <div className="ml-2 flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-ping delay-75"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-ping delay-150"></div>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setselectedProjectTopic(projectTopic);
                        setShowSubmitForm(true);
                      }}
                      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"></div>
                      <span className="relative flex items-center">
                        <span className="mr-2 text-xl">🚀</span>
                        Submit Project
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>

                {/* Decorative Corner Elements */}
               
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {projectTopics.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6 opacity-20">📚</div>
            <h3 className="text-2xl font-bold text-slate-700 mb-4">No Projects Available</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Your assigned projects will appear here. Check back soon for new assignments!
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Project Details Modal */}
      {selectedProjectTopic && !showSubmitForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-3xl border border-white/60 animate-scale-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-8 border-b border-white/50 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-bold mb-4">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping"></span>
                    Project Overview
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mb-2">{selectedProjectTopic.topic}</h2>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Active Project
                    </span>
                    <span>•</span>
                    <span>Due: {new Date(selectedProjectTopic.last_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setselectedProjectTopic(null)}
                  className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-2xl flex items-center justify-center transition-all duration-200 hover:rotate-90"
                >
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="bg-gradient-to-br from-slate-50/80 to-blue-50/50 rounded-2xl p-8 border border-white/50">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-sm mr-3">📝</span>
                  Project Requirements
                </h3>
                <div className="text-slate-700 whitespace-pre-wrap leading-relaxed text-base">
                  {selectedProjectTopic.details}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Submit Form Modal */}
      {showSubmitForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl w-full max-w-lg shadow-3xl border border-white/60 animate-scale-in">
            {/* Modal Header */}
            <div className="p-8 border-b border-white/50">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-bold mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></span>
                Submit Your Work
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">
                Submit "{selectedProjectTopic?.topic}"
              </h2>
              <p className="text-slate-600">Share your amazing work with us!</p>
            </div>
      
            {/* Form Content */}
            <div className="p-8 space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs mr-3">🔗</span>
                  Project URL
                </label>
                <input
                  type="url"
                  className="w-full px-6 py-4 bg-slate-50/80 border-2 border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-slate-300"
                  placeholder="https://github.com/username/project-name"
                  value={githubLink}
                  onChange={(e) => setgithubLink(e.target.value)}
                  required
                />
              </div>
      
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xs mr-3">📄</span>
                  Project Description
                </label>
                <textarea
                  required
                  className="w-full px-6 py-4 bg-slate-50/80 border-2 border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 resize-none"
                  placeholder="Tell us about your project, technologies used, challenges faced..."
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
      
            {/* Modal Footer */}
            <div className="p-8 border-t border-white/50">
              <div className="flex gap-4">
                <button
                  className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all duration-200 hover:scale-105"
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
                  className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center">
                    <span className="mr-2">🚀</span>
                    Submit Project
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
