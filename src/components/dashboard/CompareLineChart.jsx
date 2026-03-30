import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useMultiStockHistory } from '../../hooks/useStockData'
import { COMPARE_COLORS } from '../../utils/compareColors'
import LoadingSpinner from '../shared/LoadingSpinner'

export default function CompareLineChart({ tickers }) {
  const histories = useMultiStockHistory(tickers)
  const isLoading = histories.some(h => h.isLoading)

  // Align by index — all histories use the same monthly intervals from yFinance
  const maxLen = Math.max(...histories.map(h => h.history.length), 0)
  const baseHistory = histories.find(h => h.history.length === maxLen)?.history || []

  const data = baseHistory.map((point, i) => {
    const entry = { date: point.date }
    histories.forEach(h => {
      entry[h.ticker] = h.history[i]?.close ?? null
    })
    return entry
  })

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-5">
      <h3 className="font-semibold text-[#f1f1f1] text-sm mb-4">Price History</h3>
      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <LoadingSpinner label="Loading charts..." />
        </div>
      ) : (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#666666' }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: '#666666' }} tickLine={false} axisLine={false}
                domain={['auto', 'auto']} tickFormatter={v => `$${v}`} width={55}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #2a2a2a', backgroundColor: '#1a1a1a', color: '#f1f1f1' }}
                formatter={(v, name) => [v != null ? `$${Number(v).toFixed(2)}` : 'N/A', name]}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: '#999999' }} />
              {tickers.map((ticker, i) => (
                <Line
                  key={ticker}
                  type="monotone"
                  dataKey={ticker}
                  stroke={COMPARE_COLORS[i]}
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                  activeDot={{ r: 4, fill: COMPARE_COLORS[i] }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
