import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Homepage from './pages/Homepage'
import Products from './pages/Products'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/admin/Dashboard'
import SalesData from './pages/admin/SalesData'
import UserManagement from './pages/admin/UserManagement'
import UploadData from './pages/admin/UploadData'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/sales" element={<ProtectedRoute><SalesData /></ProtectedRoute>} />
          <Route path="/dashboard/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          <Route path="/dashboard/upload" element={<ProtectedRoute><UploadData /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
