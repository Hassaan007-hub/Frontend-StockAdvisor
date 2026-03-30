import { formatPrice, formatBillions, formatPE } from '../../utils/formatters'

export default function StockCard({ data }) {
  if (!data) return null
  const metrics = [
    { label: 'Current Price',  value: formatPrice(data.current_price) },
    { label: 'P/E Ratio',      value: formatPE(data.pe_ratio) },
    { label: 'Market Cap',     value: formatBillions(data.market_cap_billions) },
    { label: '52W High',       value: formatPrice(data['52w_high']) },
    { label: '52W Low',        value: formatPrice(data['52w_low']) },
    { label: 'Analyst Rating', value: data.analyst_recommendation
        ? data.analyst_recommendation.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'N/A' },
  ]
  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] hover:border-[#8b5cf6]/30 transition-colors p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#f1f1f1]">{data.ticker}</h2>
          <p className="text-sm text-[#666666]">{data.company_name}</p>
        </div>
        <span className="px-3 py-1 bg-[#8b5cf6]/15 text-[#8b5cf6] text-xs font-medium rounded-full">
          {data.sector || 'Stock'}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {metrics.map(({ label, value }) => (
          <div key={label} className="bg-[#111111] rounded-xl p-3">
            <p className="text-xs text-[#666666] mb-1">{label}</p>
            <p className="text-sm font-semibold text-[#f1f1f1]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
