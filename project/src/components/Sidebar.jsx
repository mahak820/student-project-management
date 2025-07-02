import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'

const Sidebar = () => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '🏠' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/projects', label: 'Projects', icon: '📁' },
    { path: '/admin/reviews', label: 'Reviews', icon: '📊' },
  ]

  const {user} = useSelector(state => state.auth)
  const handleLogout = async() => {
    // Add your logout logic here
    await dispatch(logoutUser())
    navigate("/login")
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
          <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
        </div>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen bg-gradient-to-b from-white to-gray-50 shadow-xl border-r border-gray-200 z-50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-72'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <Link 
            to="/admin" 
            className={`block text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ${isCollapsed ? 'text-center' : ''}`}
          >
            {isCollapsed ? 'TB' : 'ThinkBuild Admin'}
          </Link>
          
          {/* Collapse Button - Desktop only */}
          {/* <button
            onClick={toggleSidebar}
            className="hidden lg:block absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 group"
          >
            <span className={`block w-3 h-3 mx-auto transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
              ←
            </span>
          </button> */}
          
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-100">
          <div className={`flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
              AD
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className={`text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="ml-4 font-medium transition-all duration-300">
                    {item.label}
                  </span>
                )}
                {!isCollapsed && isActive && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          {/* Help/Support */}
          <div className={`flex items-center px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
            <span className="text-xl">❓</span>
            {!isCollapsed && <span className="ml-4 font-medium">Help & Support</span>}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center px-4 py-3 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 
              rounded-xl transition-all duration-300 transform hover:scale-105 group shadow-sm hover:shadow-md
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <span className="text-xl group-hover:animate-bounce">🚪</span>
            {!isCollapsed && <span className="ml-4 font-medium">Logout</span>}
          </button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
      </div>

      {/* Main content margin adjustment */}
      <div className={`lg:ml-${isCollapsed ? '20' : '72'} transition-all duration-300`}></div>
    </>
  )
}

export default Sidebar