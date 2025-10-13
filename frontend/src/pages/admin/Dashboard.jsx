import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../utils/api'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#D4AF37', '#C0C0C0', '#CD7F32', '#E5E4E2', '#FFD700']

export default function Dashboard() {
  const [overview, setOverview] = useState(null)
  const [dailySales, setDailySales] = useState([])
  const [repPerformance, setRepPerformance] = useState([])
  const [locationPerformance, setLocationPerformance] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setError(null)
      const [overviewRes, dailyRes, repRes, locationRes] = await Promise.all([
        api.get('/sales/overview'),
        api.get('/sales/daily'),
        api.get('/sales/performances'),
        api.get('/sales/locations')
      ])

      setOverview(overviewRes.data)
      setDailySales(dailyRes.data.daily_sales?.slice(-14) || [])
      setRepPerformance(repRes.data.rep_performance?.slice(0, 5) || [])
      setLocationPerformance(locationRes.data.location_performance?.slice(0, 5) || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError(error.response?.data?.detail || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-2 border-gray-700 border-t-gold-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-400 font-light tracking-wider">LOADING ANALYTICS</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-1 h-24 bg-red-500 mx-auto"></div>
            <p className="text-red-400 font-light tracking-wide">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="px-8 py-3 bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-gray-900 transition-all duration-300 text-sm tracking-widest"
            >
              RETRY
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const productData = overview?.product_totals ? Object.entries(overview.product_totals).map(([name, value]) => ({
    name: name.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    value: parseFloat(value.toFixed(0))
  })) : []

  return (
    <DashboardLayout>
      <div className="space-y-12">
        <div className="flex justify-between items-end border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-5xl font-light text-white tracking-tight">Analytics</h1>
            <p className="text-gray-500 mt-3 text-sm tracking-wider">Real-time performance metrics</p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-2.5 bg-transparent border border-gray-700 text-gray-400 hover:border-gold-500 hover:text-gold-500 transition-all duration-300 text-xs tracking-widest"
          >
            REFRESH
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="group">
            <div className="h-32 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-gold-500/30 transition-all duration-500 p-6">
              <p className="text-xs text-gray-500 tracking-widest mb-4">TOTAL RECORDS</p>
              <p className="text-4xl font-light text-white">{overview?.total_sales_records?.toLocaleString() || 0}</p>
            </div>
          </div>

          <div className="group">
            <div className="h-32 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-gold-500/30 transition-all duration-500 p-6">
              <p className="text-xs text-gray-500 tracking-widest mb-4">UNITS SOLD</p>
              <p className="text-4xl font-light text-white">
                {overview?.total_units_sold?.toLocaleString(undefined, {maximumFractionDigits: 0}) || 0}
              </p>
            </div>
          </div>

          <div className="group">
            <div className="h-32 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-gold-500/30 transition-all duration-500 p-6">
              <p className="text-xs text-gray-500 tracking-widest mb-4">CUSTOMERS</p>
              <p className="text-4xl font-light text-white">{overview?.unique_customers || 0}</p>
            </div>
          </div>

          <div className="group">
            <div className="h-32 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-gold-500/30 transition-all duration-500 p-6">
              <p className="text-xs text-gray-500 tracking-widest mb-4">LOCATIONS</p>
              <p className="text-4xl font-light text-white">{overview?.unique_locations || 0}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8">
            <h2 className="text-sm text-gray-400 tracking-widest mb-8">SALES TREND / 14 DAYS</h2>
            {dailySales.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    style={{ fontSize: '10px' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: '10px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total_sales"
                    stroke="#D4AF37"
                    strokeWidth={1.5}
                    dot={false}
                    name="Sales"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-600 text-sm tracking-wider">NO DATA AVAILABLE</p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8">
            <h2 className="text-sm text-gray-400 tracking-widest mb-8">PRODUCT DISTRIBUTION</h2>
            {productData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    style={{ fontSize: '11px' }}
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-600 text-sm tracking-wider">NO DATA AVAILABLE</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8">
            <h2 className="text-sm text-gray-400 tracking-widest mb-8">TOP PERFORMERS</h2>
            {repPerformance.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={repPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="sales_rep" stroke="#6b7280" style={{ fontSize: '10px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '10px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="total_units" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-600 text-sm tracking-wider">NO DATA AVAILABLE</p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8">
            <h2 className="text-sm text-gray-400 tracking-widest mb-8">TOP LOCATIONS</h2>
            {locationPerformance.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={locationPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis type="number" stroke="#6b7280" style={{ fontSize: '10px' }} />
                  <YAxis dataKey="location" type="category" stroke="#6b7280" width={100} style={{ fontSize: '10px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="total_units" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-600 text-sm tracking-wider">NO DATA AVAILABLE</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8">
          <h2 className="text-sm text-gray-400 tracking-widest mb-8">DETAILED METRICS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xs text-gray-600 tracking-widest mb-6">PRODUCT BREAKDOWN</h3>
              <div className="space-y-4">
                {productData.map((product, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span className="text-sm text-gray-400 font-light">{product.name}</span>
                    <span className="text-sm text-white font-light">{product.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs text-gray-600 tracking-widest mb-6">SALES REPRESENTATIVES</h3>
              <div className="space-y-4">
                {repPerformance.slice(0, 5).map((rep, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span className="text-sm text-gray-400 font-light">{rep.sales_rep}</span>
                    <span className="text-sm text-white font-light">{rep.total_units.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs text-gray-600 tracking-widest mb-6">KEY INDICATORS</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-sm text-gray-400 font-light">Avg Transaction</span>
                  <span className="text-sm text-white font-light">
                    {overview?.avg_units_per_transaction?.toFixed(1) || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-sm text-gray-400 font-light">Total Transactions</span>
                  <span className="text-sm text-white font-light">{overview?.total_sales_records || 0}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-sm text-gray-400 font-light">Active Reps</span>
                  <span className="text-sm text-white font-light">{overview?.unique_sales_reps || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
