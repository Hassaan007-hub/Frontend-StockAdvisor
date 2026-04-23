import CompareTable from './CompareTable'
import CompareLineChart from './CompareLineChart'
import CompareBarChart from './CompareBarChart'
import Disclaimer from '../shared/Disclaimer'

export default function MultiComparePanel({ stocks }) {
  if (!stocks || stocks.length < 2) return null

  const failedTickers = stocks.filter(s => s.error).map(s => s.ticker)
  const validStocks = stocks.filter(s => !s.error)
  const tickers = stocks.map(s => s.ticker)

  return (
    <div className="p-6 space-y-4 bg-[#0a0a0a] min-h-full">
      {failedTickers.length > 0 && (
        <div className="rounded-xl border border-yellow-900/50 bg-yellow-950/20 px-4 py-3 text-sm text-yellow-400">
          Could not load data for <span className="font-semibold">{failedTickers.join(', ')}</span> — Yahoo Finance is temporarily rate-limiting. Price history still shown below. Try again in a minute.
        </div>
      )}
      {validStocks.length >= 2 && <CompareTable stocks={validStocks} />}
      <CompareLineChart tickers={tickers} />
      {validStocks.length >= 2 && <CompareBarChart stocks={validStocks} />}
      <Disclaimer />
    </div>
  )
}
