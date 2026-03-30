import { useState, useCallback } from 'react'
import { sendMessage as apiSendMessage } from '../api/stockApi'

export function useChat(onToolResult) {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (text) => {
    if (!text || !text.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: text.trim() }])
    setIsLoading(true)

    try {
      const result = await apiSendMessage(text.trim())
      setMessages(prev => [
        ...prev,
        { role: 'agent', content: result.response || 'No response received.' },
      ])
      if (result.tool_used && result.data) {
        onToolResult(result.tool_used, result.data)
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'agent', content: 'Sorry, I had trouble reaching the server. Make sure the backend is running and try again.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [onToolResult])

  return { messages, isLoading, sendMessage }
}
