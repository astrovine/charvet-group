import { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function DashboardLayout({ children }) {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Overview', path: '/dashboard' },
    { name: 'Sales Data', path: '/dashboard/sales' },
    { name: 'Users', path: '/dashboard/users', superAdminOnly: true },
    { name: 'Upload', path: '/dashboard/upload', superAdminOnly: true },
  ]

  const filteredNavigation = navigation.filter(
    item => !item.superAdminOnly || user?.is_superadmin
  )

  return (
    <div className="min-h-screen bg-dim-950">
      <nav className="border-b border-dim-800 bg-dim-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center space-x-8 md:space-x-16">
              <Link to="/" className="text-xl md:text-2xl font-display font-semibold text-white tracking-tight">
                 SellWell
              </Link>

              {/* Desktop Navigation - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-1">
                {filteredNavigation.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 rounded-lg ${
                        isActive
                          ? 'text-white bg-dim-800'
                          : 'text-dim-400 hover:text-dim-100 hover:bg-dim-800/50'
                      }`}
                    >
                      {item.name.toUpperCase()}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Right Side - User Info & Menu Button */}
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* User Info - Hidden on mobile */}
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-dim-400 mt-0.5">{user?.email}</p>
              </div>

              {/* Admin Badge */}
              {user?.is_superadmin && (
                <div className="hidden sm:block px-3 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full">
                  <span className="text-xs text-gold-400 font-medium tracking-wider">SUPERADMIN</span>
                </div>
              )}

              {/* Desktop Logout */}
              <button
                onClick={logout}
                className="hidden md:block px-4 py-2 text-xs font-medium text-dim-400 hover:text-white transition-colors tracking-wide"
              >
                LOGOUT
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-dim-400 hover:text-white transition-colors rounded-lg hover:bg-dim-800"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-dim-800 py-4">
              {/* User Info on Mobile */}
              <div className="px-4 py-3 border-b border-dim-800 mb-2">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-dim-400 mt-1">{user?.email}</p>
                {user?.is_superadmin && (
                  <span className="inline-block mt-3 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-xs text-gold-400 font-medium tracking-wider rounded-full">
                    SUPERADMIN
                  </span>
                )}
              </div>

              {/* Navigation Links */}
              <div className="px-2 space-y-1">
                {filteredNavigation.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium tracking-wide transition-all rounded-lg ${
                        isActive
                          ? 'text-white bg-dim-800 border-l-2 border-gold-500'
                          : 'text-dim-400 hover:text-dim-100 hover:bg-dim-800/50'
                      }`}
                    >
                      {item.name.toUpperCase()}
                    </Link>
                  )
                })}
              </div>

              {/* Logout Button */}
              <div className="px-2 mt-4 pt-4 border-t border-dim-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    logout()
                  }}
                  className="w-full px-4 py-3 text-sm font-medium text-dim-400 hover:text-white hover:bg-dim-800/50 transition-all tracking-wide text-left rounded-lg"
                >
                  LOGOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}
