import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import CompareBarChart from '../components/dashboard/CompareBarChart'

const mockStocks = [
  { ticker: 'AAPL', pe_ratio: 28.5, revenue_growth: 0.08, profit_margin: 0.25 },
  { ticker: 'NVDA', pe_ratio: 45.2, revenue_growth: 1.22, profit_margin: 0.55 },
  { ticker: 'TSLA', pe_ratio: null, revenue_growth: 0.02, profit_margin: 0.05 },
]

describe('CompareBarChart', () => {
  it('renders without crashing with 3 stocks', () => {
    render(<CompareBarChart stocks={mockStocks} />)
  })

  it('renders without crashing with null metric values', () => {
    render(<CompareBarChart stocks={mockStocks} />)
  })

  it('renders without crashing with 2 stocks', () => {
    render(<CompareBarChart stocks={mockStocks.slice(0, 2)} />)
  })
})
