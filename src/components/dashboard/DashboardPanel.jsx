import StockCard from './StockCard'
import BuySellSignal from './BuySellSignal'
import TrendChart from './TrendChart'
import RiskGauge from './RiskGauge'
import MultiComparePanel from './MultiComparePanel'
import MarketOverview from './MarketOverview'
import Disclaimer from '../shared/Disclaimer'

export default function DashboardPanel({ dashboardData, compareData }) {
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

  return <MarketOverview />
}
