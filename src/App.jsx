import { useState } from 'react'
import ChatPanel from './components/chat/ChatPanel'
import DashboardPanel from './components/dashboard/DashboardPanel'
import { getStockDashboard } from './api/stockApi'

const DEV_NAME     = import.meta.env.VITE_Developer_Name     || ''
const DEV_EMAIL    = import.meta.env.VITE_Developer_Email    || ''
const DEV_LINKEDIN = import.meta.env.VITE_Developer_LinkedIn || ''

function Footer() {
  return (
    <div className="w-full border-t border-[#1e1e1e] bg-[#0a0a0a] px-6 py-2 flex items-center justify-center gap-2 flex-shrink-0">
      <span className="text-[11px] text-[#555]">Built by</span>
      <span className="text-[11px] font-semibold text-[#d4d4d4]">{DEV_NAME}</span>
      {DEV_EMAIL && <>
        <span className="text-[#333]">·</span>
        <a href={`mailto:${DEV_EMAIL}`}
           className="text-[11px] text-[#888] hover:text-[#8b5cf6] transition-colors">
          {DEV_EMAIL}
        </a>
      </>}
      {DEV_LINKEDIN && <>
        <span className="text-[#333]">·</span>
        <a href={DEV_LINKEDIN} target="_blank" rel="noopener noreferrer"
           className="text-[11px] text-[#888] hover:text-[#8b5cf6] transition-colors">
          LinkedIn
        </a>
      </>}
    </div>
  )
}

const STOCK_TOOLS = new Set(['buy_sell_signal', 'analyze_stock', 'trend_outlook'])

export default function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const [compareData, setCompareData] = useState(null)

  const handleToolResult = async (tool, data) => {
    if (tool === 'compare_stocks' && data?.stocks) {
      setDashboardData(null)
      setCompareData({ stocks: data.stocks })
    } else if (STOCK_TOOLS.has(tool) && data?.ticker) {
      setCompareData(null)
      try {
        const result = await getStockDashboard(data.ticker)
        setDashboardData(result)
      } catch {
        setDashboardData(null)
      }
    } else {
      setDashboardData(null)
      setCompareData(null)
    }
  }

  const handleShowMarket = () => {
    setDashboardData(null)
    setCompareData(null)
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left: Chat — 40% on desktop */}
        <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-[#2a2a2a] flex flex-col overflow-hidden">
          <ChatPanel onToolResult={handleToolResult} onShowMarket={handleShowMarket} />
        </div>

        {/* Right: Dashboard — 60% on desktop */}
        <div className="w-full md:w-3/5 overflow-y-auto">
          <DashboardPanel dashboardData={dashboardData} compareData={compareData} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
