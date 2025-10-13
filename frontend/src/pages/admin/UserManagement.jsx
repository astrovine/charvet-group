import { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout'
import { AuthContext } from '../../context/AuthContext'
import api from '../../utils/api'

export default function UserManagement() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (user?.is_superadmin) {
      fetchUsers()
    }
  }, [user])

  // Show loading while authentication is being checked
  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-2 border-gray-700 border-t-gold-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-400 font-light tracking-wider">LOADING...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Redirect if not superadmin
  if (!user?.is_superadmin) {
    return <Navigate to="/dashboard" replace />
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      await api.post('/users/create', formData)
      setIsModalOpen(false)
      setFormData({ name: '', email: '', password: '' })
      fetchUsers()
    } catch (error) {
      alert(error.response?.data?.detail || 'Failed to create user')
    }
  }

  const handleGrantSuperadmin = async (userId) => {
    if (window.confirm('Grant superadmin privileges to this user?')) {
      try {
        await api.post(`/grant-superadmin/${userId}`)
        fetchUsers()
      } catch (error) {
        alert(error.response?.data?.detail || 'Failed to grant superadmin')
      }
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-2 border-gray-700 border-t-gold-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-400 font-light tracking-wider">LOADING USERS</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-end border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-5xl font-light text-white tracking-tight">User Management</h1>
            <p className="text-gray-500 mt-3 text-sm tracking-wider">System users and permissions</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-300 text-xs tracking-widest"
          >
            ADD USER
          </button>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">NAME</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">EMAIL</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">ROLE</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">STATUS</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">CREATED</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">LAST LOGIN</th>
                  <th className="px-6 py-4 text-right text-xs text-gray-500 tracking-widest">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((userItem) => (
                  <tr key={userItem.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                          <span className="text-xs text-gold-500 font-light">
                            {userItem.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-light text-white">{userItem.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-light">{userItem.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {userItem.is_superadmin ? (
                        <span className="px-2 py-1 text-xs bg-gold-500/10 border border-gold-500/20 text-gold-500 tracking-wider">
                          SUPERADMIN
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-gray-800 border border-gray-700 text-gray-400 tracking-wider">
                          {userItem.role?.toUpperCase() || 'ADMIN'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {userItem.is_active ? (
                        <span className="px-2 py-1 text-xs bg-green-500/10 border border-green-500/20 text-green-500 tracking-wider">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-red-500/10 border border-red-500/20 text-red-500 tracking-wider">
                          INACTIVE
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-light">
                      {new Date(userItem.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-light">
                      {userItem.last_login ? new Date(userItem.last_login).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                      {!userItem.is_superadmin && userItem.id !== user.id && (
                        <button
                          onClick={() => handleGrantSuperadmin(userItem.id)}
                          className="text-gray-400 hover:text-gold-500 transition-colors tracking-wider"
                        >
                          PROMOTE
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 max-w-md w-full">
            <div className="p-8 border-b border-gray-800">
              <h2 className="text-2xl font-light text-white tracking-wide">NEW USER</h2>
            </div>

            <form onSubmit={handleCreateUser} className="p-8 space-y-6">
              <div>
                <label className="block text-xs text-gray-500 tracking-widest mb-2">FULL NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 tracking-widest mb-2">EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 tracking-widest mb-2">PASSWORD</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setFormData({ name: '', email: '', password: '' })
                  }}
                  className="px-6 py-2.5 bg-transparent border border-gray-700 text-xs text-gray-400 hover:text-white transition-colors tracking-widest"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 text-black text-xs tracking-widest transition-all"
                >
                  CREATE USER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
