export default function LoadingSpinner({ size = 'md', label = 'Loading...' }) {
  const sizeClasses = { sm: 'w-4 h-4 border-2', md: 'w-6 h-6 border-2', lg: 'w-10 h-10 border-4' }
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-[#2a2a2a] border-t-[#8b5cf6] animate-spin`}
        role="status"
        aria-label={label}
      />
      {label && <span className="text-sm text-[#666666]">{label}</span>}
    </div>
  )
}
