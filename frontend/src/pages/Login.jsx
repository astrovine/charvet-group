import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(formData.email, formData.password)
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950">
      {/* Ambient background effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gold-500/10 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-500/10 to-transparent blur-3xl"></div>

      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560847638-c5a5a7f8d82e?w=1920')] bg-cover bg-center opacity-10"></div>

        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <Link to="/" className="mb-12 group">
            <span className="text-3xl font-display font-bold tracking-tight group-hover:text-gold-400 transition-colors"> SellWell</span>
          </Link>

          <div className="space-y-6 max-w-md">
            <h1 className="text-5xl font-sans font-light leading-tight">
              Welcome to <span className="font-normal text-gold-400">Excellence</span>
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed font-light">
              Access your partner dashboard to manage orders, view analytics, and grow your business with  SellWell.
            </p>

            <div className="pt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-zinc-300 font-light">Real-time sales analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-zinc-300 font-light">Inventory management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-zinc-300 font-light">Performance tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-display font-bold text-white"> SellWell</span>
            </Link>
          </div>

          {/* Glassmorphic Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="space-y-2 mb-8">
              <h2 className="text-4xl font-sans font-light text-white">Partner <span className="font-normal">Login</span></h2>
              <p className="text-zinc-400 font-light">Enter your credentials to access your dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-gold-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-gold-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-zinc-600 bg-white/5 text-gold-500 focus:ring-gold-500/50" />
                  <span className="ml-2 text-zinc-400">Remember me</span>
                </label>
                <a href="#" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gold-500 hover:bg-gold-600 text-slate-900 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-gold-500/20 hover:scale-[1.02]"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-sm text-zinc-400">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
