import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout'
import { AuthContext } from '../../context/AuthContext'
import api from '../../utils/api'

export default function UploadData() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls'))) {
      setFile(selectedFile)
      setError(null)
    } else {
      setFile(null)
      setError('Please select a valid Excel file (.xlsx or .xls)')
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setUploading(true)
    setMessage(null)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post('/sales/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setMessage(response.data.message || 'File uploaded successfully!')
      setFile(null)
      // Reset file input
      document.getElementById('file-upload').value = ''
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-end border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-5xl font-light text-white tracking-tight">Upload Data</h1>
            <p className="text-gray-500 mt-3 text-sm tracking-wider">Import sales data from Excel files</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8">
            <h2 className="text-sm text-gray-400 tracking-widest mb-8">UPLOAD FILE</h2>

            <form onSubmit={handleUpload} className="space-y-8">
              <div className="border border-gray-800 p-12 text-center hover:border-gold-500/30 transition-all duration-300">
                <div className="w-16 h-16 border border-gray-700 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="px-6 py-2.5 bg-transparent border border-gray-700 text-gray-400 hover:border-gold-500 hover:text-gold-500 transition-all duration-300 text-xs tracking-widest inline-block">
                      CHOOSE FILE
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="mt-4 text-xs text-gray-600 tracking-wider">EXCEL FILES ONLY (.XLSX, .XLS)</p>
                </div>
                {file && (
                  <div className="mt-6 text-xs text-gray-400">
                    SELECTED: <span className="text-white font-light">{file.name}</span>
                  </div>
                )}
              </div>

              {message && (
                <div className="border border-green-500/20 bg-green-500/10 p-4">
                  <p className="text-xs text-green-500 tracking-wider">{message}</p>
                </div>
              )}

              {error && (
                <div className="border border-red-500/20 bg-red-500/10 p-4">
                  <p className="text-xs text-red-500 tracking-wider">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!file || uploading}
                className="w-full px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black text-xs tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {uploading ? 'UPLOADING...' : 'UPLOAD FILE'}
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8">
            <h2 className="text-sm text-gray-400 tracking-widest mb-8">FILE REQUIREMENTS</h2>

            <div className="space-y-8 text-xs text-gray-400">
              <div>
                <h3 className="text-xs text-gray-500 tracking-widest mb-4">REQUIRED COLUMNS</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['date', 'customer_name', 'location', 'phone_no', 'sales_rep', 'imperial_crown', 'cranberry', 'orange', 'mango', 'black_stallion'].map((col) => (
                    <div key={col} className="text-gray-500 font-light">{col}</div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-xs text-gray-500 tracking-widest mb-4">IMPORTANT NOTES</h3>
                <ul className="space-y-2 text-gray-500 font-light">
                  <li>Date format: YYYY-MM-DD</li>
                  <li>Product quantities must be numeric</li>
                  <li>All fields required except phone_no</li>
                  <li>Duplicates will be updated</li>
                  <li>Remove empty rows before upload</li>
                </ul>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-xs text-gray-500 tracking-widest mb-4">EXAMPLE FORMAT</h3>
                <div className="bg-black border border-gray-800 p-4 text-xs font-mono overflow-x-auto">
                  <div className="whitespace-nowrap">
                    <span className="text-gray-600">date</span> | <span className="text-gray-600">customer</span> | <span className="text-gray-600">location</span>
                  </div>
                  <div className="whitespace-nowrap text-gray-500 mt-2">
                    2024-01-15 | Store A | Downtown
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-1 h-12 bg-gold-500 flex-shrink-0"></div>
            <div>
              <h3 className="text-xs text-gray-400 tracking-widest mb-3">TIPS FOR SUCCESS</h3>
              <ul className="space-y-2 text-xs text-gray-500 font-light">
                <li>Verify column headers match exactly</li>
                <li>Check date formats before uploading</li>
                <li>Remove any empty rows or columns</li>
                <li>Review error messages for specific issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
