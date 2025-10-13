import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/users/me')
      setUser(response.data)
      console.log('User fetched:', response.data) // Debug log
    } catch (error) {
      console.error('Error fetching user:', error)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    console.log('Login attempt with:', { username, password: '***' }) // Debug log
    const formData = new URLSearchParams()
    formData.append('username', username)
    formData.append('password', password)

    console.log('FormData contents:', formData.toString()) // Debug log

    const response = await api.post('/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log('Login response:', response.data) // Debug log

    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token)
      await fetchCurrentUser()
      navigate('/dashboard')
      return response.data
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
