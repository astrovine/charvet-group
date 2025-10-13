import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-dim-900/95 backdrop-blur-xl border-b border-dim-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-semibold text-white tracking-tight">
               SellWell
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-dim-300 hover:text-white transition-colors rounded-lg hover:bg-dim-800/50"
            >
              HOME
            </Link>
            <Link
              to="/products"
              className="px-4 py-2 text-sm font-medium text-dim-300 hover:text-white transition-colors rounded-lg hover:bg-dim-800/50"
            >
              PRODUCTS
            </Link>
            <Link
              to="/login"
              className="ml-4 btn btn-primary"
            >
              LOGIN
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-dim-800/50 transition-colors"
            aria-label="Toggle menu"
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

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dim-800">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-dim-300 hover:text-white transition-colors rounded-lg hover:bg-dim-800/50"
              >
                HOME
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-dim-300 hover:text-white transition-colors rounded-lg hover:bg-dim-800/50"
              >
                PRODUCTS
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-2 btn btn-primary text-center"
              >
                LOGIN
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
