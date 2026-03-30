export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          AI
        </div>
      )}
      <div className={`max-w-xs lg:max-w-sm xl:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isUser
          ? 'bg-[#8b5cf6] text-white rounded-br-sm'
          : 'bg-[#1a1a1a] text-[#f1f1f1] border-l-2 border-[#8b5cf6] rounded-bl-sm'
      }`}>
        {message.content.split('\n').map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}
      </div>
    </div>
  )
}
