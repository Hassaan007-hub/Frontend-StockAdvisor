import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import { useStockHistory } from '../../hooks/useStockData'
import { isNegativeChange } from '../../utils/formatters'
import LoadingSpinner from '../shared/LoadingSpinner'

export default function TrendChart({ data }) {
  const { history, isLoading, isError } = useStockHistory(data?.ticker)
  if (!data) return null

  const isUptrend = data.trend_signal === 'Uptrend'
  const lineColor = isUptrend ? '#22c55e' : '#ef4444'

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[#f1f1f1]">{data.ticker} — 1 Year Trend</h3>
          <p className="text-xs text-[#666666] mt-0.5">
            Support: ${data.support_level} &nbsp;|&nbsp; Resistance: ${data.resistance_level}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          isUptrend
            ? 'bg-[#0d1f0d] text-[#22c55e] border border-[#166534]/40'
            : 'bg-[#1f0d0d] text-[#ef4444] border border-[#991b1b]/40'
        }`}>
          {data.trend_signal}
        </span>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        {[
          { label: '1M', value: data.change_1month },
          { label: '3M', value: data.change_3month },
          { label: '6M', value: data.change_6month },
          { label: '1Y', value: data.change_1year },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#111111] rounded-lg px-3 py-1.5 text-center">
            <p className="text-xs text-[#666666]">{label}</p>
            <p className={`text-sm font-semibold ${isNegativeChange(value) ? 'text-[#ef4444]' : 'text-[#22c55e]'}`}>
              {value && /\d/.test(value) ? value : 'N/A'}
            </p>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <LoadingSpinner label="Loading chart..." />
        </div>
      ) : isError || history.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-sm text-[#666666]">
          Chart data unavailable
        </div>
      ) : (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#666666' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#666666' }}
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
                tickFormatter={v => `$${v}`}
                width={55}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: '1px solid #2a2a2a',
                  backgroundColor: '#1a1a1a',
                  color: '#f1f1f1',
                }}
                formatter={v => [`$${Number(v).toFixed(2)}`, 'Close']}
              />
              {data.support_level && (
                <ReferenceLine y={data.support_level} stroke="#444444" strokeDasharray="4 4"
                  label={{ value: 'Support', fontSize: 9, fill: '#666666' }} />
              )}
              {data.resistance_level && (
                <ReferenceLine y={data.resistance_level} stroke="#444444" strokeDasharray="4 4"
                  label={{ value: 'Resist', fontSize: 9, fill: '#666666' }} />
              )}
              <Line type="monotone" dataKey="close" stroke={lineColor} strokeWidth={2} dot={false}
                activeDot={{ r: 4, fill: lineColor }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="text-xs text-[#666666] mt-3">
        Volatility: {data.daily_volatility} &nbsp;|&nbsp;
        50-day MA: ${data.ma_50day} &nbsp;|&nbsp;
        200-day MA: {data.ma_200day}
      </p>
    </div>
  )
}
