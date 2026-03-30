import { useState } from 'react'

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
  }

  return (
    <div className="px-4 py-3 border-t border-[#2a2a2a] bg-[#111111]">
      <div className="flex gap-2 items-end">
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
          placeholder="Ask about any stock... e.g. Should I buy Apple?"
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none px-3 py-2 text-sm bg-[#1a1a1a] border border-[#2a2a2a] text-[#f1f1f1] placeholder-[#444444] rounded-xl focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="px-4 py-2 bg-[#8b5cf6] text-white text-sm font-medium rounded-xl hover:bg-[#7c3aed] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          Send
        </button>
      </div>
    </div>
  )
}
