import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DashboardPanel from '../components/dashboard/DashboardPanel'

// Mock all hooks so no real HTTP calls are made
vi.mock('../hooks/useStockData', () => ({
  useStockHistory: () => ({ history: [], isLoading: false, isError: false }),
  useMultiStockHistory: () => [],
  useMarketOverview: () => ({
    data: {
      indices: [
        { ticker: 'SPY', name: 'S&P 500', price: 520.5, change_pct: 0.75 },
        { ticker: 'QQQ', name: 'NASDAQ 100', price: 440.2, change_pct: 1.1 },
        { ticker: 'DIA', name: 'Dow Jones', price: 390.0, change_pct: 0.3 },
      ],
      stocks: [
        { ticker: 'NVDA', price: 875.0, change_pct: 3.2 },
        { ticker: 'TSLA', price: 210.0, change_pct: -1.5 },
      ],
    },
    isLoading: false,
    isError: false,
  }),
}))

const mockDashboardData = {
  stock_summary: {
    ticker: 'AAPL',
    company_name: 'Apple Inc.',
    current_price: 175.0,
    pe_ratio: 28.5,
    market_cap_billions: 2750.0,
    '52w_high': 200.0,
    '52w_low': 140.0,
    revenue_growth: 0.08,
    profit_margin: 0.25,
    dividend_yield: 0.005,
    analyst_recommendation: 'buy',
    sector: 'Technology',
  },
  signal: {
    ticker: 'AAPL',
    signal: 'BUY',
    score: '8/10',
    score_breakdown: ['Low P/E ratio (+2)'],
  },
  trend: {
    ticker: 'AAPL',
    trend_signal: 'Uptrend',
    current_price: 175.0,
    ma_50day: 170.0,
    ma_200day: 160.0,
    change_1month: '2.5%',
    change_3month: '5.0%',
    change_6month: '10.0%',
    change_1year: '20.0%',
    daily_volatility: '1.2% (Moderate)',
    support_level: 160.0,
    resistance_level: 185.0,
  },
}

describe('DashboardPanel', () => {
  it('renders market overview when no data is provided', () => {
    render(<DashboardPanel />)
    expect(screen.getByText('Market Overview')).toBeInTheDocument()
  })

  it('renders all four widgets simultaneously when dashboardData is provided', () => {
    render(<DashboardPanel dashboardData={mockDashboardData} />)
    // StockCard: company name
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument()
    // BuySellSignal: signal badge
    expect(screen.getByText('BUY')).toBeInTheDocument()
    // RiskGauge: score display
    expect(screen.getByText('8/10')).toBeInTheDocument()
    // TrendChart: section heading
    expect(screen.getByText('AAPL — 1 Year Trend')).toBeInTheDocument()
  })

  it('renders MultiComparePanel when compareData is provided', () => {
    const compareData = {
      stocks: [
        {
          ticker: 'AAPL', company_name: 'Apple Inc.', current_price: 175.0,
          pe_ratio: 28.5, market_cap_billions: 2750.0, revenue_growth: 0.08,
          profit_margin: 0.25, analyst_recommendation: 'buy',
        },
        {
          ticker: 'MSFT', company_name: 'Microsoft Corp.', current_price: 420.0,
          pe_ratio: 35.0, market_cap_billions: 3100.0, revenue_growth: 0.17,
          profit_margin: 0.36, analyst_recommendation: 'buy',
        },
      ],
    }
    render(<DashboardPanel compareData={compareData} />)
    expect(screen.getByText('MSFT')).toBeInTheDocument()
    expect(screen.queryByText('Investment Signal')).not.toBeInTheDocument()
  })
})
