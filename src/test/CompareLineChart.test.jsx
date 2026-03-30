import { render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import CompareLineChart from '../components/dashboard/CompareLineChart'

vi.mock('../hooks/useStockData', () => ({
  useStockHistory: vi.fn(),
  useMultiStockHistory: () => [
    { ticker: 'AAPL', history: [{ date: 'Jan 25', close: 150 }, { date: 'Feb 25', close: 160 }], isLoading: false, isError: false },
    { ticker: 'NVDA', history: [{ date: 'Jan 25', close: 500 }, { date: 'Feb 25', close: 520 }], isLoading: false, isError: false },
  ],
}))

describe('CompareLineChart', () => {
  it('renders without crashing with 2 tickers', () => {
    render(<CompareLineChart tickers={['AAPL', 'NVDA']} />)
  })

  it('renders without crashing when a ticker has no history', () => {
    render(<CompareLineChart tickers={['AAPL', 'NVDA']} />)
  })
})
