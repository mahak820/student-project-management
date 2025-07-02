import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/auth/authSlice'
import {toast} from 'react-toastify'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, message, isError} = useSelector(state => state.auth)

  // useeffect hook 
  useEffect(() => {
    if(user){
      navigate("/student")
    }
    if(isError && message){
      toast.error(message)
    }
  }, [user, message, isError])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (formData.password.length < 5) {
      setError('Password must be at least 5 characters')
      return
    }

    dispatch(registerUser(formData))
    
    // Create new user (in real app, this would be an API call)
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: 'student',
      profileComplete: false,
      createdAt: new Date().toISOString()
    }

    login(newUser)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Pattern - matching login page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_25%,rgba(59,130,246,0.03)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.03)_75%)] bg-[length:60px_60px]"></div>
      </div>

      {/* Floating Elements - Left Side */}
      <div className="absolute left-0 top-0 h-full w-1/4 hidden lg:block">
        <div className="absolute top-20 left-8 transform animate-pulse">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800">Join Community</div>
                <div className="text-xs text-slate-500">Create your account</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-40 left-6" style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5K+</div>
              <div className="text-xs text-slate-600">Active Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - Right Side */}
      <div className="absolute right-0 top-0 h-full w-1/4 hidden lg:block">
        <div className="absolute top-32 right-8" style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '0.5s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="text-sm font-semibold text-slate-800">Learning Path</div>
              <div className="text-xs text-slate-500">Personalized journey</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-10" style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '2s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-800">Free to Start</div>
                <div className="text-xs text-slate-500">No hidden fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Register Content */}
      <div className="relative z-10 max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <span className="text-4xl font-black text-slate-800">
              Think<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Build</span>
            </span>
          </Link>
          
          <div className="mt-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Start your learning journey today
            </div>
            
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Create your account
            </h2>
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 transform transition-all duration-300 hover:shadow-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-3">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  Create Your Account
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Additional Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-xs text-slate-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Free Account
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure & Private
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Instant Access
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Back to Home Link */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Add the floating animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
      `}</style>
    </div>
  )
}

export default Register