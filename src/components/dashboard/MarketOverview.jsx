import { useMarketOverview } from '../../hooks/useStockData'
import LoadingSpinner from '../shared/LoadingSpinner'

// ── Tooltip texts ────────────────────────────────────────────────────────────
const INDEX_INFO = {
  'S&P 500':     'Tracks the 500 largest U.S. publicly traded companies by market cap. Widely regarded as the best single gauge of the U.S. stock market.',
  'NASDAQ 100':  'Tracks the 100 largest non-financial companies listed on NASDAQ. Heavily weighted toward technology and high-growth stocks.',
  'Dow Jones':   'Tracks 30 major blue-chip U.S. companies across various industries. One of the oldest and most widely followed market indices.',
}

const SECTION_INFO = {
  'Leaders':   'The 5 stocks in today\'s watchlist with the highest relative daily % change — not necessarily in the green. On a broadly red day, leaders are simply losing less than others.',
  'Laggards':  'The 5 stocks in today\'s watchlist with the lowest relative daily % change — the hardest hit today regardless of direction.',
  'Watchlist': 'A curated selection of popular stocks spanning tech, finance, energy, and consumer sectors. Prices refresh every 5 minutes via live market data.',
}

// ── Shared sub-components ────────────────────────────────────────────────────
function InfoIcon() {
  return (
    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-[#3a3a3a] text-[#555] text-[9px] font-bold leading-none ml-1.5 group-hover:border-[#666] group-hover:text-[#888] transition-colors select-none">
      i
    </span>
  )
}

// align="left"|"right"  — horizontal anchor edge
// direction="up"|"down" — whether bubble appears above or below
function Tooltip({ content, align = 'left', direction = 'up', children }) {
  const alignClass = align === 'right' ? 'right-0' : 'left-0'
  const isUp = direction === 'up'
  const posClass  = isUp ? 'bottom-full mb-2' : 'top-full mt-2'
  const arrowPos  = isUp ? 'after:top-full' : 'after:bottom-full'
  const arrowColor = isUp ? 'after:border-t-[#333]' : 'after:border-b-[#333]'
  const arrowSide = align === 'right' ? 'after:right-3' : 'after:left-3'

  return (
    <span className="relative group inline-flex items-center cursor-default">
      {children}
      <span
        className={`
          absolute ${posClass} ${alignClass} w-60
          px-3 py-2.5 rounded-lg text-xs text-[#aaa] leading-relaxed
          bg-[#1a1a1a] border border-[#333] shadow-2xl
          opacity-0 group-hover:opacity-100 pointer-events-none
          transition-opacity duration-150 z-30 whitespace-normal
          after:content-[''] after:absolute ${arrowPos} ${arrowSide}
          after:border-4 after:border-transparent ${arrowColor}
        `}
      >
        {content}
      </span>
    </span>
  )
}

function ChangeTag({ pct }) {
  if (pct == null) return <span className="text-[#444]">--</span>
  const pos = pct >= 0
  return (
    <span className={pos ? 'text-emerald-400' : 'text-red-400'}>
      {pos ? '+' : ''}{pct.toFixed(2)}%
    </span>
  )
}

function fmt(price) {
  if (price == null) return '--'
  return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function IndexCard({ name, price, change_pct }) {
  return (
    <div className="bg-[#111111] rounded-xl border border-[#2a2a2a] p-4">
      <div className="text-xs text-[#666] mb-3">
        <Tooltip content={INDEX_INFO[name] || name} direction="down">
          {name}
          <InfoIcon />
        </Tooltip>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-[10px] text-[#3a3a3a] uppercase tracking-wider mb-0.5">Price</div>
          <div className="text-base font-bold text-[#f1f1f1]">{fmt(price)}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-[#3a3a3a] uppercase tracking-wider mb-0.5">Today</div>
          <div className="text-sm font-semibold"><ChangeTag pct={change_pct} /></div>
        </div>
      </div>
    </div>
  )
}

function StockRow({ ticker, price, change_pct }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#1e1e1e] last:border-0">
      <span className="font-mono text-sm font-semibold text-[#f1f1f1] w-16">{ticker}</span>
      <div className="text-right">
        <div className="text-[10px] text-[#3a3a3a] uppercase tracking-wider">Price</div>
        <div className="text-sm text-[#888]">{fmt(price)}</div>
      </div>
      <div className="text-right w-16">
        <div className="text-[10px] text-[#3a3a3a] uppercase tracking-wider">Today</div>
        <div className="text-sm font-medium"><ChangeTag pct={change_pct} /></div>
      </div>
    </div>
  )
}

function MiniStockCard({ ticker, price, change_pct }) {
  return (
    <div className="bg-[#111111] rounded-lg border border-[#1e1e1e] px-3 py-2.5 flex items-center justify-between gap-2">
      <span className="font-mono text-xs font-bold text-[#f1f1f1] shrink-0">{ticker}</span>
      <div className="flex gap-3 text-right">
        <div>
          <div className="text-[10px] text-[#3a3a3a] uppercase tracking-wider">Price</div>
          <div className="text-xs text-[#777]">{fmt(price)}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#3a3a3a] uppercase tracking-wider">Today</div>
          <div className="text-xs font-semibold"><ChangeTag pct={change_pct} /></div>
        </div>
      </div>
    </div>
  )
}

function SectionHeading({ label, color, align }) {
  return (
    <h3 className={`text-xs font-semibold ${color} uppercase tracking-wider mb-3`}>
      <Tooltip content={SECTION_INFO[label]} align={align}>
        {label}
        <InfoIcon />
      </Tooltip>
    </h3>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function MarketOverview() {
  const { data, isLoading, isError } = useMarketOverview()

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0a0a0a]">
        <LoadingSpinner size="lg" label="Loading market data..." />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8 bg-[#0a0a0a]">
        <div>
          <div className="text-5xl mb-4" aria-hidden="true">📈</div>
          <h2 className="text-xl font-semibold text-[#f1f1f1] mb-2">Stock Advisor</h2>
          <p className="text-[#666] text-sm max-w-xs leading-relaxed">
            Ask me anything about stocks on the left. Charts and analysis will appear here.
          </p>
        </div>
      </div>
    )
  }

  const stocks  = data.stocks || []
  const gainers = stocks.slice(0, 5)
  const losers  = [...stocks].reverse().slice(0, 5)
  const middle  = stocks.slice(5, stocks.length - 5)

  return (
    <div className="p-6 space-y-5 bg-[#0a0a0a] min-h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#f1f1f1]">Market Overview</h2>
        <span className="text-xs text-[#444]">Live · refreshes every 5 min</span>
      </div>

      {/* Major indices */}
      <div className="grid grid-cols-3 gap-3">
        {(data.indices || []).map(idx => (
          <IndexCard key={idx.ticker} {...idx} />
        ))}
      </div>

      {/* Best & worst performers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0f0f0f] rounded-xl border border-[#2a2a2a] p-4">
          <SectionHeading label="Leaders" color="text-emerald-400" align="left" />
          {gainers.map(s => <StockRow key={s.ticker} {...s} />)}
        </div>
        <div className="bg-[#0f0f0f] rounded-xl border border-[#2a2a2a] p-4">
          <SectionHeading label="Laggards" color="text-red-400" align="right" />
          {losers.map(s => <StockRow key={s.ticker} {...s} />)}
        </div>
      </div>

      {/* Remaining watchlist stocks */}
      {middle.length > 0 && (
        <div>
          <SectionHeading label="Watchlist" color="text-[#555]" align="left" />
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {middle.map(s => (
              <MiniStockCard key={s.ticker} {...s} />
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-[#2a2a2a] text-center pb-2">
        Ask me about any stock on the left →
      </p>
    </div>
  )
}
