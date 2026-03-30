import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi } from 'vitest'
import { useMultiStockHistory } from '../hooks/useStockData'

vi.mock('../api/stockApi', () => ({
  getStockHistory: vi.fn().mockResolvedValue([{ date: 'Jan 25', close: 150 }]),
  getStockDashboard: vi.fn(),
  getStockCompare: vi.fn(),
  getQuickStock: vi.fn(),
  sendMessage: vi.fn(),
}))

function wrapper({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('useMultiStockHistory', () => {
  it('returns one result per ticker with correct shape', async () => {
    const { result } = renderHook(() => useMultiStockHistory(['AAPL', 'NVDA']), { wrapper })
    await waitFor(() => {
      expect(result.current).toHaveLength(2)
      expect(result.current[0].ticker).toBe('AAPL')
      expect(result.current[1].ticker).toBe('NVDA')
      expect(result.current[0].history).toHaveLength(1)
      expect(result.current[0].isLoading).toBe(false)
    })
  })

  it('returns empty array for empty tickers list', () => {
    const { result } = renderHook(() => useMultiStockHistory([]), { wrapper })
    expect(result.current).toHaveLength(0)
  })
})
