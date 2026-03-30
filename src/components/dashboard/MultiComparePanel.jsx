import CompareTable from './CompareTable'
import CompareLineChart from './CompareLineChart'
import CompareBarChart from './CompareBarChart'
import Disclaimer from '../shared/Disclaimer'

export default function MultiComparePanel({ stocks }) {
  if (!stocks || stocks.length < 2) return null
  const tickers = stocks.map(s => s.ticker)

  return (
    <div className="p-6 space-y-4 bg-[#0a0a0a] min-h-full">
      <CompareTable stocks={stocks} />
      <CompareLineChart tickers={tickers} />
      <CompareBarChart stocks={stocks} />
      <Disclaimer />
    </div>
  )
}
