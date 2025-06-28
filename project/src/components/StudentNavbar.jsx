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
    <nav className="bg-white shadow-sm border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/student" className="text-2xl font-bold text-primary-800">
              ThinkBuild
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-secondary-600 hover:text-primary-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 border-l border-secondary-200 pl-4">
              <span className="text-secondary-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm"
              >
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