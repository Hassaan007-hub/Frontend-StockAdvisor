const STYLES = {
  BUY:     { wrapper: 'bg-[#0d1f0d] border-[#166534]/40',  badge: 'bg-[#166534] text-[#86efac]' },
  HOLD:    { wrapper: 'bg-[#1c1a0a] border-[#854d0e]/40',  badge: 'bg-[#854d0e] text-[#fde68a]' },
  CAUTION: { wrapper: 'bg-[#1f0d0d] border-[#991b1b]/40',  badge: 'bg-[#991b1b] text-[#fca5a5]' },
}

export default function BuySellSignal({ data }) {
  if (!data) return null
  const styles = STYLES[data.signal] || STYLES.HOLD
  return (
    <div className={`rounded-2xl border p-5 ${styles.wrapper}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#f1f1f1]">Investment Signal</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#666666]">Score: {data.score}</span>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${styles.badge}`}>
            {data.signal}
          </span>
        </div>
      </div>
      {Array.isArray(data.score_breakdown) && data.score_breakdown.length > 0 && (
        <div className="space-y-2">
          {data.score_breakdown.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-[#999999]">
              <span className="text-[#444444] mt-0.5 flex-shrink-0">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
