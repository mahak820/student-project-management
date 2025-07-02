import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logoutUser } from '../features/auth/authSlice'

const StudentNavbar = () => {
  const location = useLocation()
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const handleLogout = async() => {
    await dispatch(logoutUser())
    navigate('/')
  }
  
  const navItems = [
    { path: '/student', label: 'Dashboard' },
    { path: '/student/projects', label: 'Projects' },
    { path: '/student/profile', label: 'Profile' },
  ]
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-2xl border-b border-white/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/student" 
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              ThinkBuild
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 xl:px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/60 hover:shadow-lg'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 border-l border-slate-200 pl-4 lg:pl-6 ml-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="hidden lg:block">
                  <p className="text-slate-700 font-medium text-sm">Welcome back</p>
                  <p className="text-slate-800 font-semibold text-sm">{user?.name}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-3 lg:px-5 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-semibold text-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center group"
              >
                <svg className="w-4 h-4 lg:mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-white/60 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-2 border-t border-slate-200/50">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-slate-200/50">
              <div className="px-4 py-2 text-slate-700 font-medium text-sm">
                Welcome back, {user?.name}
              </div>
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group"
              >
                <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default StudentNavbar