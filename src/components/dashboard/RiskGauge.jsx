export default function RiskGauge({ score }) {
  if (!score) return null
  const numeric = parseInt(String(score).split('/')[0], 10)
  if (isNaN(numeric)) return null

  const getColor = (seg) => {
    if (seg > numeric) return 'bg-[#222222]'
    if (numeric >= 8) return 'bg-[#22c55e]'
    if (numeric >= 5) return 'bg-[#eab308]'
    return 'bg-[#ef4444]'
  }

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[#f1f1f1] text-sm">Score Gauge</h3>
        <span className="text-xl font-bold text-[#f1f1f1]">{score}</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(seg => (
          <div key={seg} className={`flex-1 h-4 rounded-sm transition-colors ${getColor(seg)}`} title={`${seg}/10`} />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-[#666666]">Caution</span>
        <span className="text-xs text-[#666666]">Hold</span>
        <span className="text-xs text-[#666666]">Buy</span>
      </div>
    </div>
  )
}
