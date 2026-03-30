import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CompareTable from '../components/dashboard/CompareTable'

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

describe('CompareTable', () => {
  it('renders a header for each stock', () => {
    render(<CompareTable stocks={mockStocks} />)
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('NVDA')).toBeInTheDocument()
    expect(screen.getByText('TSLA')).toBeInTheDocument()
  })

  it('renders N/A for null pe_ratio', () => {
    const stocks = [
      { ...mockStocks[0], pe_ratio: null },
      mockStocks[1],
    ]
    render(<CompareTable stocks={stocks} />)
    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('renders with two stocks', () => {
    render(<CompareTable stocks={mockStocks.slice(0, 2)} />)
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('NVDA')).toBeInTheDocument()
    expect(screen.queryByText('TSLA')).not.toBeInTheDocument()
  })
})
