export function formatPrice(value) {
  if (value == null || isNaN(value)) return 'N/A'
  return `$${Number(value).toFixed(2)}`
}

export function formatBillions(value) {
  if (value == null || isNaN(value)) return 'N/A'
  return `$${Number(value).toFixed(1)}B`
}

export function formatPercent(value) {
  if (value == null || isNaN(value)) return 'N/A'
  return `${(Number(value) * 100).toFixed(1)}%`
}

export function formatPE(value) {
  if (value == null || isNaN(value)) return 'N/A'
  return Number(value).toFixed(1)
}

// isNegativeChange("-3.2%") → true
export function isNegativeChange(changeStr) {
  if (!changeStr || typeof changeStr !== 'string') return false
  return changeStr.trim().startsWith('-')
}
