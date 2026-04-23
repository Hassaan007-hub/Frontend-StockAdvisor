import StockCard from './StockCard'
import BuySellSignal from './BuySellSignal'
import TrendChart from './TrendChart'
import RiskGauge from './RiskGauge'
import MultiComparePanel from './MultiComparePanel'
import MarketOverview from './MarketOverview'
import Disclaimer from '../shared/Disclaimer'

export default function DashboardPanel({ dashboardData, compareData, dashboardError }) {
  if (dashboardData) {
    return (
      <div className="p-6 space-y-4 bg-[#0a0a0a] min-h-full">
        <StockCard data={dashboardData.stock_summary} />
        <BuySellSignal data={dashboardData.signal} />
        <RiskGauge score={dashboardData.signal?.score} />
        <TrendChart data={dashboardData.trend} />
        <Disclaimer />
      </div>
    )
  }

  if (compareData) {
    return <MultiComparePanel stocks={compareData.stocks} />
  }

  if (dashboardError) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8 bg-[#0a0a0a]">
        <div>
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-base font-semibold text-[#f1f1f1] mb-2">Dashboard Unavailable</h2>
          <p className="text-[#666] text-sm max-w-xs leading-relaxed">{dashboardError}</p>
        </div>
      </div>
    )
  }

  return <MarketOverview />
}
