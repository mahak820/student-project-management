import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/admin', label: 'Home', icon: '🏠' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/projects', label: 'Projects', icon: '📁' },
    { path: '/admin/reviews', label: 'Reviews', icon: '📊' },
  ]

  return (
    <div className="bg-white shadow-sm h-screen w-64 fixed left-0 top-0 border-r border-secondary-200">
      <div className="p-6">
        <Link to="/admin" className="text-2xl font-bold text-primary-800">
          ThinkBuild Admin
        </Link>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors ${
              location.pathname === item.path ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600' : ''
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar