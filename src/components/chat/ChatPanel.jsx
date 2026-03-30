import { useRef, useEffect } from 'react'
import { useChat } from '../../hooks/useChat'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'

const SUGGESTIONS = [
  'Analyze Apple stock',
  'Compare NVDA vs TSLA vs AAPL',
  'Should I buy Tesla?',
  'Where will NVDA go?',
]

const CAPABILITIES = [
  { icon: '🔍', label: 'Analyze',  desc: 'Deep fundamental analysis' },
  { icon: '⚖️', label: 'Compare',  desc: 'Side-by-side up to 5 stocks' },
  { icon: '📊', label: 'Signals',  desc: 'Buy / Sell scoring' },
  { icon: '📈', label: 'Trends',   desc: '1-year trend outlook' },
]

function EmptyState({ onSend, isLoading }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-4 text-center gap-4">
      {/* Brand icon */}
      <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-2xl shadow-lg shadow-[#8b5cf6]/5">
        📈
      </div>

      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#f1f1f1] tracking-tight">Stock Advisor</h2>
        <p className="text-xs text-[#555] leading-relaxed">
          AI-powered market analysis. Ask me anything.
        </p>
      </div>

      {/* Capability cards */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-[280px]">
        {CAPABILITIES.map(({ icon, label, desc }) => (
          <div
            key={label}
            className="bg-[#141414] border border-[#222] rounded-xl p-2.5 text-left hover:border-[#8b5cf6]/30 transition-colors"
          >
            <div className="text-base mb-1">{icon}</div>
            <div className="text-xs font-semibold text-[#d4d4d4] mb-0.5">{label}</div>
            <div className="text-[11px] text-[#555]">{desc}</div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full max-w-[280px]">
        <div className="flex-1 h-px bg-[#1e1e1e]" />
        <span className="text-[11px] text-[#3a3a3a] uppercase tracking-widest">Try asking</span>
        <div className="flex-1 h-px bg-[#1e1e1e]" />
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-col gap-1.5 w-full max-w-[280px]">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => onSend(s)}
            disabled={isLoading}
            className="w-full text-left px-3 py-2 text-xs text-[#8b5cf6] bg-[#8b5cf6]/5 border border-[#8b5cf6]/20 rounded-xl hover:bg-[#8b5cf6]/10 hover:border-[#8b5cf6]/40 disabled:opacity-40 transition-all"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ChatPanel({ onToolResult, onShowMarket }) {
  const { messages, isLoading, sendMessage } = useChat(onToolResult)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex flex-col h-full bg-[#111111]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1e1e1e] flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-[#f1f1f1]">Stock Advisor</h1>
          <p className="text-xs text-[#444]">Powered by Google ADK + Groq</p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={onShowMarket}
            title="Back to Market Overview"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-[#888] bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:text-[#f1f1f1] hover:border-[#8b5cf6]/40 transition-all"
          >
            ← Market
          </button>
        )}
      </div>

      {/* Messages / empty state */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState onSend={sendMessage} isLoading={isLoading} />
        ) : (
          <div className="px-4 py-4 space-y-4">
            {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex-shrink-0">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
