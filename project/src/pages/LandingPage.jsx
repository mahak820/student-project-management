import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <span className={`text-3xl font-bold transition-all duration-300 ${
              isScrolled ? 'text-slate-800' : 'text-slate-800'
            }`}>
              Think<span className="text-blue-600">Build</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Features', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-white/20'
                }`}
              >
                {item}
              </a>
            ))}
            <a 
              href="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const FloatingCard = ({ children, delay = 0, className = "" }) => {
  return (
    <div 
      className={`transform transition-all duration-700 ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
      `}</style>
      {children}
    </div>
  );
};

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(user && user.isAdmin){
      navigate('/admin')
    }

    if(user){
      navigate('/student')
    }
  } , [user])

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_25%,rgba(59,130,246,0.03)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.03)_75%)] bg-[length:60px_60px]"></div>
        </div>

        {/* Left Side Floating Elements */}
        <div className="absolute left-0 top-0 h-full w-1/4 hidden lg:block">
          <FloatingCard delay={0} className="absolute top-20 left-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">Centralized Platform <br /> for Real Projects</div>
                 
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={1} className="absolute top-60 left-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-green-600">A+</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">Great work!</div>
                  <div className="text-xs text-slate-500">New feedback</div>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={2} className="absolute bottom-40 left-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-xs text-slate-600">Organized Code Submission</div>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Right Side Floating Elements */}
        <div className="absolute right-0 top-0 h-full w-1/4 hidden lg:block">
          <FloatingCard delay={0.5} className="absolute top-32 right-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-slate-800">Team Project</div>
                <div className="text-xs text-slate-500">Performance Analytics for Admins</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={1.5} className="absolute top-80 right-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">Due Tomorrow</div>
                  <div className="text-xs text-slate-500">Blog App</div>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={2.5} className="absolute bottom-32 right-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-purple-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-xs font-semibold text-slate-800">12+ Collaborators</div>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Badge */}
            {/* <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-8 animate-pulse">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              🎉 Now serving 10,000+ students worldwide
            </div> */}

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-800 mb-6 leading-none">
              Think<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Build</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-600 mb-4 font-light">
              The future of student project management
            </p>
            
            <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Collaborate seamlessly, submit with confidence, and track your academic journey with our comprehensive platform designed for modern education.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href="/register" 
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Start Free Today
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="#features" 
                className="group bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2-7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col items-center">
              <p className="text-sm text-slate-400 mb-4">Trusted by students from</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="text-lg font-bold text-slate-600">Medi-Caps</div>
                <div className="text-lg font-bold text-slate-600">IIT</div>
                <div className="text-lg font-bold text-slate-600">IIM</div>
                <div className="text-lg font-bold text-slate-600">Stanford</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              ✨ Features that make a difference
            </div>
            <h2 className="text-5xl font-bold text-slate-800 mb-6">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From project submission to peer collaboration, we've built comprehensive tools that adapt to your academic workflow
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                ),
                title: "Smart Collaboration",
                description: "Work together with classmates in real-time. Share ideas, give feedback, and build amazing projects as a team.",
                color: "blue"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Seamless Submission",
                description: "Submit your projects with drag-and-drop simplicity. Auto-save drafts, version control, and instant confirmation.",
                color: "indigo"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Progress Analytics",
                description: "Track your academic performance with detailed insights. See your improvement over time and identify areas to focus on.",
                color: "purple"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Smart Deadlines",
                description: "Never miss another deadline. Get intelligent reminders, calendar integration, and priority-based task management.",
                color: "green"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "Instant Feedback",
                description: "Get detailed feedback from instructors and peers. Comment threads, suggestion modes, and rating systems built-in.",
                color: "orange"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Mobile Ready",
                description: "Access your projects anywhere. Our mobile app keeps you connected and productive whether you're on campus or on the go.",
                color: "pink"
              }
            ].map((feature, index) => {
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
                indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200",
                purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
                green: "bg-green-100 text-green-600 group-hover:bg-green-200",
                orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
                pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-200"
              };

              return (
                <div 
                  key={index}
                  className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${colorClasses[feature.color]}`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05),transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to transform your academic journey?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join over 10,000 students who are already using ThinkBuild to manage their projects more effectively and achieve better grades.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register" 
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-blue-50"
            >
              Start Free - No Credit Card Required
            </a>
            <a 
              href="#demo" 
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Think<span className="text-blue-600">Build</span>
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Empowering the next generation of students to think bigger, build better, and achieve more.
            </p>
            
            <div className="border-t border-gray-200 pt-8">
              <p className="text-slate-500 text-sm">
                © 2025 ThinkBuild. Made with ❤️ for students everywhere.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;