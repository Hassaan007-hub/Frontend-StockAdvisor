import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MultiComparePanel from '../components/dashboard/MultiComparePanel'

vi.mock('../hooks/useStockData', () => ({
  useStockHistory: vi.fn(),
  useMultiStockHistory: () => [
    { ticker: 'AAPL', history: [], isLoading: false, isError: false },
    { ticker: 'NVDA', history: [], isLoading: false, isError: false },
    { ticker: 'TSLA', history: [], isLoading: false, isError: false },
  ],
}))

const mockStocks = [
  {
    ticker: 'AAPL', company_name: 'Apple Inc.', current_price: 175.0,
    pe_ratio: 28.5, market_cap_billions: 2750.0, revenue_growth: 0.08,
    profit_margin: 0.25, analyst_recommendation: 'buy',
  },
  {
    ticker: 'NVDA', company_name: 'NVIDIA Corp.', current_price: 850.0,
    pe_ratio: 45.2, market_cap_billions: 2100.0, revenue_growth: 1.22,
    profit_margin: 0.55, analyst_recommendation: 'strong_buy',
  },
  {
    ticker: 'TSLA', company_name: 'Tesla Inc.', current_price: 175.0,
    pe_ratio: 60.1, market_cap_billions: 560.0, revenue_growth: 0.02,
    profit_margin: 0.05, analyst_recommendation: 'hold',
  },
]

describe('MultiComparePanel', () => {
  it('renders all three sections with 3 stocks', () => {
    render(<MultiComparePanel stocks={mockStocks} />)
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('NVDA')).toBeInTheDocument()
    expect(screen.getByText('TSLA')).toBeInTheDocument()
    expect(screen.getByText('Price History')).toBeInTheDocument()
    expect(screen.getByText('Metrics Comparison')).toBeInTheDocument()
  })

  it('renders with two stocks without crashing', () => {
    render(<MultiComparePanel stocks={mockStocks.slice(0, 2)} />)
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('NVDA')).toBeInTheDocument()
  })
})
