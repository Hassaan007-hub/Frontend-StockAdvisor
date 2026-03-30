export default function Disclaimer() {
  return (
    <div className="flex items-start gap-2 p-3 bg-[#111111] border border-[#2a2a2a] rounded-xl">
      <span className="text-[#666666] text-sm leading-none mt-0.5" aria-hidden="true">⚠️</span>
      <p className="text-xs text-[#666666] leading-relaxed">
        All analysis is for <strong className="text-[#999999]">educational purposes only</strong> and does not constitute
        financial advice. Always consult a qualified financial advisor before making investment decisions.
      </p>
    </div>
  )
}
