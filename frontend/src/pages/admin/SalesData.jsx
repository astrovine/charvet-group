import { useState, useEffect, useContext } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { AuthContext } from '../../context/AuthContext'
import api from '../../utils/api'

export default function SalesData() {
  const { user } = useContext(AuthContext)
  const [salesData, setSalesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [currentEntry, setCurrentEntry] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [formData, setFormData] = useState({
    date: '',
    customer_name: '',
    location: '',
    phone_no: '',
    imperial_crown: 0,
    cranberry: 0,
    orange: 0,
    mango: 0,
    black_stallion: 0,
    sales_rep: ''
  })

  useEffect(() => {
    fetchSalesData()
  }, [])

  const fetchSalesData = async () => {
    try {
      const response = await api.get('/sales/')
      setSalesData(response.data)
    } catch (error) {
      console.error('Error fetching sales data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClick = () => {
    setModalMode('create')
    setFormData({
      date: new Date().toISOString().split('T')[0],
      customer_name: '',
      location: '',
      phone_no: '',
      imperial_crown: 0,
      cranberry: 0,
      orange: 0,
      mango: 0,
      black_stallion: 0,
      sales_rep: ''
    })
    setIsModalOpen(true)
  }

  const handleEditClick = (entry) => {
    setModalMode('edit')
    setCurrentEntry(entry)
    setFormData({
      date: entry.date.split('T')[0],
      customer_name: entry.customer_name,
      location: entry.location,
      phone_no: entry.phone_no || '',
      imperial_crown: entry.imperial_crown,
      cranberry: entry.cranberry,
      orange: entry.orange,
      mango: entry.mango,
      black_stallion: entry.black_stallion,
      sales_rep: entry.sales_rep
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (modalMode === 'create') {
        await api.post('/sales/', formData)
      } else {
        await api.put(`/sales/${currentEntry.id}`, formData)
      }
      setIsModalOpen(false)
      fetchSalesData()
    } catch (error) {
      alert(error.response?.data?.detail || 'Operation failed')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.delete(`/sales/${id}`)
        fetchSalesData()
      } catch (error) {
        alert(error.response?.data?.detail || 'Delete failed')
      }
    }
  }

  const filteredData = salesData.filter(entry =>
    entry.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.sales_rep.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-2 border-gray-700 border-t-gold-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-400 font-light tracking-wider">LOADING DATA</p>
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
            <h1 className="text-5xl font-light text-white tracking-tight">Sales Data</h1>
            <p className="text-gray-500 mt-3 text-sm tracking-wider">Complete transaction records</p>
          </div>
          {user?.is_superadmin && (
            <button
              onClick={handleCreateClick}
              className="px-6 py-2.5 bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-300 text-xs tracking-widest"
            >
              ADD ENTRY
            </button>
          )}
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-4">
          <input
            type="text"
            placeholder="SEARCH BY CUSTOMER, LOCATION, OR REP"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 text-xs tracking-widest focus:outline-none focus:border-gold-500 transition-colors"
          />
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">DATE</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">CUSTOMER</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">LOCATION</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">SALES REP</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 tracking-widest">UNITS</th>
                  {user?.is_superadmin && (
                    <th className="px-6 py-4 text-right text-xs text-gray-500 tracking-widest">ACTIONS</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paginatedData.map((entry) => {
                  const totalUnits = entry.imperial_crown + entry.cranberry + entry.orange + entry.mango + entry.black_stallion

                  // Safely format the date
                  let formattedDate = 'N/A'
                  try {
                    if (entry.date) {
                      const dateObj = new Date(entry.date)
                      if (!isNaN(dateObj.getTime())) {
                        formattedDate = dateObj.toLocaleDateString()
                      }
                    }
                  } catch (error) {
                    console.error('Error formatting date:', error)
                  }

                  return (
                    <tr key={entry.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-light">
                        {formattedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-light">{entry.customer_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-light">{entry.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-light">{entry.sales_rep}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gold-500 font-light">
                        {totalUnits.toFixed(0)}
                      </td>
                      {user?.is_superadmin && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-xs space-x-4">
                          <button
                            onClick={() => handleEditClick(entry)}
                            className="text-gray-400 hover:text-white transition-colors tracking-wider"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="text-gray-600 hover:text-red-400 transition-colors tracking-wider"
                          >
                            DELETE
                          </button>
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-800 px-6 py-4 flex items-center justify-between">
            <div className="text-xs text-gray-500 tracking-wider">
              {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} OF {filteredData.length}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-transparent border border-gray-800 text-xs text-gray-400 hover:border-gold-500 hover:text-gold-500 transition-all tracking-wider disabled:opacity-30 disabled:cursor-not-allowed"
              >
                PREVIOUS
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-transparent border border-gray-800 text-xs text-gray-400 hover:border-gold-500 hover:text-gold-500 transition-all tracking-wider disabled:opacity-30 disabled:cursor-not-allowed"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-gray-800">
              <h2 className="text-2xl font-light text-white tracking-wide">
                {modalMode === 'create' ? 'NEW SALE' : 'EDIT SALE'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-gray-500 tracking-widest mb-2">DATE</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-800 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 tracking-widest mb-2">CUSTOMER NAME</label>
                  <input
                    type="text"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-800 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 tracking-widest mb-2">LOCATION</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-800 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 tracking-widest mb-2">PHONE NUMBER</label>
                  <input
                    type="text"
                    value={formData.phone_no}
                    onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-gray-800 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 tracking-widest mb-2">SALES REP</label>
                  <input
                    type="text"
                    value={formData.sales_rep}
                    onChange={(e) => setFormData({ ...formData, sales_rep: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-800 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-xs text-gray-500 tracking-widest mb-6">PRODUCT QUANTITIES</h3>
                <div className="grid grid-cols-2 gap-6">
                  {['imperial_crown', 'cranberry', 'orange', 'mango', 'black_stallion'].map((product) => (
                    <div key={product}>
                      <label className="block text-xs text-gray-500 tracking-widest mb-2">
                        {product.replace('_', ' ').toUpperCase()}
                      </label>
                      <input
                        type="number"
                        value={formData[product]}
                        onChange={(e) => setFormData({ ...formData, [product]: parseFloat(e.target.value) || 0 })}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 bg-transparent border border-gray-700 text-xs text-gray-400 hover:text-white transition-colors tracking-widest"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 text-black text-xs tracking-widest transition-all"
                >
                  {modalMode === 'create' ? 'CREATE' : 'UPDATE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
