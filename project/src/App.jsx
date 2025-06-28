import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentProfile from './pages/student/StudentProfile'
import StudentProjects from './pages/student/StudentProjects'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminProjects from './pages/admin/AdminProjects'
import AdminReviews from './pages/admin/AdminReviews'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Student Routes */}
            <Route path="/student" element={
                <StudentDashboard />
            } />
            <Route path="/student/profile" element={
                <StudentProfile />
            } />
            <Route path="/student/projects" element={
                <StudentProjects />
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
                <AdminDashboard />
            } />
            <Route path="/admin/users" element={
                <AdminUsers />
            } />
            <Route path="/admin/projects" element={
                <AdminProjects />
            } />
            <Route path="/admin/reviews" element={
                <AdminReviews />
            } />
          </Routes>
      </Router>
  )
}

export default App