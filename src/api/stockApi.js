import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Attach API key to every request automatically
axios.interceptors.request.use(config => {
  const key = import.meta.env.VITE_API_KEY
  if (key) config.headers['X-API-Key'] = key
  return config
})

export const sendMessage = async (message, sessionId = 'default') => {
  const response = await axios.post(`${BASE_URL}/chat`, {
    message,
    session_id: sessionId,
  })
  return response.data
  // Returns: { response: string, tool_used: string|null, data: object|null }
}

export const getQuickStock = async (ticker) => {
  const response = await axios.get(`${BASE_URL}/stock/${ticker.toUpperCase()}/quick`)
  return response.data
}

export const getStockHistory = async (ticker) => {
  const response = await axios.get(`${BASE_URL}/stock/${ticker.toUpperCase()}/history`)
  return response.data
  // Returns: [{ date: "Mar 25", close: 213.5 }, ...]
}

export const getStockDashboard = async (ticker) => {
  const response = await axios.get(`${BASE_URL}/stock/${ticker.toUpperCase()}/dashboard`)
  return response.data
  // Returns: { stock_summary, signal, trend }
}

export const getStockCompare = async (tickers) => {
  const response = await axios.get(`${BASE_URL}/stock/compare`, {
    params: { tickers: tickers.join(',') },
  })
  return response.data
  // Returns: { stocks: [...] }
}

export const getMarketOverview = async () => {
  const response = await axios.get(`${BASE_URL}/market/overview`)
  return response.data
  // Returns: { indices: [{ticker, name, price, change_pct}], stocks: [{ticker, price, change_pct}] }
}
