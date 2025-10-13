import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../utils/api'

export default function Signup() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })

      if (response.data) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950">
      {/* Ambient background effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gold-500/10 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-500/10 to-transparent blur-3xl"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-12">
          <Link to="/" className="inline-block group">
            <span className="text-4xl font-display font-bold text-white tracking-tight group-hover:text-gold-400 transition-colors">
               SellWell
            </span>
          </Link>
          <h2 className="mt-8 text-3xl font-sans font-light text-white">
            Create Your <span className="font-normal">Account</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-400 font-light">
            Join the team to access the dashboard
          </p>
        </div>

        {/* Glassmorphic Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {success ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 mx-auto flex items-center justify-center">
                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl text-white font-light mb-2">
                  Account <span className="font-normal">Created</span>
                </h3>
                <p className="text-sm text-zinc-400">Redirecting to login...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-gold-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-gold-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-gold-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-gold-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gold-500 hover:bg-gold-600 text-slate-900 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-gold-500/20 hover:scale-[1.02]"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-sm text-zinc-400">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-500 font-light">
            By creating an account, you agree to access company data responsibly
          </p>
        </div>
      </div>
    </div>
  )
}
