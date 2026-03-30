import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { COMPARE_COLORS } from '../../utils/compareColors'

const METRICS = [
  { key: 'pe_ratio',       label: 'P/E Ratio',        toValue: v => v != null ? +v.toFixed(1)           : 0 },
  { key: 'revenue_growth', label: 'Revenue Growth %',  toValue: v => v != null ? +(v * 100).toFixed(1)   : 0 },
  { key: 'profit_margin',  label: 'Profit Margin %',   toValue: v => v != null ? +(v * 100).toFixed(1)   : 0 },
]

export default function CompareBarChart({ stocks }) {
  if (!stocks || stocks.length < 2) return null

  const data = METRICS.map(({ key, label, toValue }) => {
    const entry = { metric: label }
    stocks.forEach(s => { entry[s.ticker] = toValue(s[key]) })
    return entry
  })

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-5">
      <h3 className="font-semibold text-[#f1f1f1] text-sm mb-4">Metrics Comparison</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <XAxis dataKey="metric" tick={{ fontSize: 10, fill: '#666666' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#666666' }} tickLine={false} axisLine={false} width={40} />
            <Tooltip
              cursor={{ fill: '#1a1a1a' }}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: '1px solid #333',
                backgroundColor: '#141414',
                color: '#f1f1f1',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
              labelStyle={{ color: '#888', marginBottom: 6, fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#999999' }} />
            {stocks.map((s, i) => (
              <Bar key={s.ticker} dataKey={s.ticker} fill={COMPARE_COLORS[i]} radius={[2, 2, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
