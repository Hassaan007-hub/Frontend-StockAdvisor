export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#1f0d0d] border border-[#991b1b]/40 rounded-xl">
      <span className="text-[#ef4444] text-lg leading-none mt-0.5">!</span>
      <div className="flex-1">
        <p className="text-sm text-[#fca5a5] leading-relaxed">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="mt-2 text-xs text-[#ef4444] underline hover:text-[#fca5a5]">
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
