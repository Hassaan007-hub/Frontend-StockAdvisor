import { formatPrice, formatBillions, formatPE, formatPercent } from '../../utils/formatters'
import { COMPARE_COLORS } from '../../utils/compareColors'

const FIELDS = [
  { key: 'current_price',          label: 'Price',           format: formatPrice },
  { key: 'pe_ratio',               label: 'P/E Ratio',       format: formatPE },
  { key: 'market_cap_billions',    label: 'Market Cap',      format: formatBillions },
  { key: 'revenue_growth',         label: 'Revenue Growth',  format: formatPercent },
  { key: 'profit_margin',          label: 'Profit Margin',   format: formatPercent },
  { key: 'analyst_recommendation', label: 'Analyst Rating',  format: v => v ? v.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'N/A' },
]

export default function CompareTable({ stocks }) {
  if (!stocks || stocks.length < 2) return null

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] overflow-hidden">
      {/* Ticker header row */}
      <div
        style={{ display: 'grid', gridTemplateColumns: `140px repeat(${stocks.length}, 1fr)` }}
        className="bg-[#111111] border-b border-[#2a2a2a]"
      >
        <div className="p-3 text-xs text-[#666666] font-medium">Metric</div>
        {stocks.map((s, i) => (
          <div key={s.ticker} className="p-3 text-sm font-semibold text-center"
               style={{ color: COMPARE_COLORS[i] }}>
            {s.ticker}
          </div>
        ))}
      </div>
      {/* Company name row */}
      <div
        style={{ display: 'grid', gridTemplateColumns: `140px repeat(${stocks.length}, 1fr)` }}
        className="border-b border-[#2a2a2a] bg-[#111111]/50"
      >
        <div className="p-3 text-xs text-[#666666]" />
        {stocks.map(s => (
          <div key={s.ticker} className="p-3 text-xs text-center text-[#666666]">{s.company_name}</div>
        ))}
      </div>
      {/* Metric rows */}
      {FIELDS.map(({ key, label, format }) => (
        <div
          key={key}
          style={{ display: 'grid', gridTemplateColumns: `140px repeat(${stocks.length}, 1fr)` }}
          className="border-b border-[#222222] hover:bg-[#222222] transition-colors"
        >
          <div className="p-3 text-xs text-[#666666]">{label}</div>
          {stocks.map(s => (
            <div key={s.ticker} className="p-3 text-sm text-center font-medium text-[#f1f1f1]">
              {format(s[key])}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
