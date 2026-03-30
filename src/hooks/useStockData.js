import { useQuery, useQueries } from '@tanstack/react-query'
import { getStockHistory, getMarketOverview } from '../api/stockApi'

export function useStockHistory(ticker) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stockHistory', ticker],
    queryFn: () => getStockHistory(ticker),
    enabled: !!ticker,
    staleTime: 5 * 60 * 1000,
  })

  return { history: data || [], isLoading, isError }
}

export function useMarketOverview() {
  return useQuery({
    queryKey: ['marketOverview'],
    queryFn: getMarketOverview,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 2,
  })
}

export function useMultiStockHistory(tickers) {
  const results = useQueries({
    queries: tickers.map(ticker => ({
      queryKey: ['stockHistory', ticker],
      queryFn: () => getStockHistory(ticker),
      enabled: !!ticker,
      staleTime: 5 * 60 * 1000,
    })),
  })
  return results.map((r, i) => ({
    ticker: tickers[i],
    history: r.data || [],
    isLoading: r.isLoading,
    isError: r.isError,
  }))
}
