import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../features/auth/authSlice'

const StudentNavbar = () => {
  const location = useLocation()
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }
  
  const navItems = [
    { path: '/student', label: 'Dashboard' },
    { path: '/student/projects', label: 'Projects' },
    { path: '/student/profile', label: 'Profile' },
  ]
  
  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-2xl border-b border-white/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-4">
          <div className="flex items-center">
            <Link 
              to="/student" 
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              ThinkBuild
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/60 hover:shadow-lg'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 border-l border-slate-200 pl-6 ml-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <p className="text-slate-700 font-medium text-sm">Welcome back</p>
                  <p className="text-slate-800 font-semibold text-sm">{user?.name}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-5 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-semibold text-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center group"
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