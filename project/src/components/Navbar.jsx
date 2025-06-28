import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../features/auth/authSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async() => {
     dispatch(logoutUser())
    
  }

  return (
    <nav className="bg-white shadow-sm border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="Logo flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary-800">ThinkBuild</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link to="/#about" className="text-secondary-600 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link to="/#help" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Help
            </Link>
            <Link to="/#contact" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Contact
            </Link>
             */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-secondary-700">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-secondary-600 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary-600 hover:text-secondary-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-secondary-200">
            <Link to="/#about" className="block px-3 py-2 text-secondary-600 hover:text-primary-600">About</Link>
            <Link to="/#help" className="block px-3 py-2 text-secondary-600 hover:text-primary-600">Help</Link>
            <Link to="/#contact" className="block px-3 py-2 text-secondary-600 hover:text-primary-600">Contact</Link>
            {user ? (
              <>
                <span className="block px-3 py-2 text-secondary-700">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-secondary-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-secondary-600">Login</Link>
                <Link to="/register" className="block px-3 py-2 text-primary-600 font-medium">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar