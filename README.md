# Stock Advisor — Frontend

React frontend for the AI-powered Stock Advisor application. Provides a real-time market dashboard, stock analysis cards, multi-stock comparison charts, and a chat interface powered by a multi-agent backend.

---

## Features

- **Market Overview** — Live indices (S&P 500, NASDAQ 100, Dow Jones) with auto-refresh every 5 minutes. Leaders, Laggards, and a 22-stock Watchlist grid with today's price and % change.
- **Stock Dashboard** — Per-stock card showing current price, P/E ratio, market cap, 52W high/low, analyst rating, investment signal (Buy/Hold/Caution) with a score gauge, and a 1-year trend chart.
- **Multi-Stock Comparison** — Side-by-side comparison of 2–5 stocks via bar chart, line chart, and a metrics table.
- **AI Chat Agent** — Conversational interface that triggers the backend multi-agent system and renders structured results (dashboard/comparison) directly in the UI panel.
- **Themed UI** — Dark theme with custom scrollbar, tooltips, favicon, and a footer with developer info.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Data fetching | TanStack React Query 5 + Axios |
| Charts | Recharts 2 |
| Testing | Vitest + Testing Library |

---

## Project Structure

```
src/
├── api/
│   └── stockApi.js          # Axios instance with API key interceptor, all API calls
├── hooks/
│   ├── useChat.js            # Chat session state and message handling
│   └── useStockData.js       # React Query hooks for stock + market data
├── components/
│   ├── chat/
│   │   ├── ChatPanel.jsx     # Main chat UI, empty state with capability cards
│   │   ├── ChatMessage.jsx   # Individual message bubble
│   │   ├── ChatInput.jsx     # Message input + send button
│   │   └── TypingIndicator.jsx
│   ├── dashboard/
│   │   ├── MarketOverview.jsx    # Live market indices, leaders/laggards, watchlist
│   │   ├── DashboardPanel.jsx    # Routes between MarketOverview / StockCard view
│   │   ├── StockCard.jsx         # Full per-stock analysis card
│   │   ├── BuySellSignal.jsx     # Signal badge + score breakdown
│   │   ├── RiskGauge.jsx         # Score bar (Caution → Hold → Buy)
│   │   ├── TrendChart.jsx        # 1-year price history line chart
│   │   ├── MultiComparePanel.jsx # Comparison layout container
│   │   ├── CompareTable.jsx      # Side-by-side metrics table
│   │   ├── CompareBarChart.jsx   # Bar chart for metric comparison
│   │   └── CompareLineChart.jsx  # Price history overlay line chart
│   └── shared/
│       ├── Disclaimer.jsx    # Investment disclaimer banner
│       ├── ErrorMessage.jsx  # Error state component
│       └── LoadingSpinner.jsx
├── utils/
│   ├── compareColors.js      # Consistent per-stock color palette for charts
│   └── formatters.js         # Number/currency formatting helpers
├── App.jsx                   # Root layout, state routing, footer
└── main.jsx                  # React entry point, QueryClientProvider
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Backend running (see `../Backend_StockAdvisor/`)

### Install & Run

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

### Environment Variables

Create a `.env` file in this directory:

```env
VITE_API_URL=http://localhost:8000
VITE_API_KEY=your_api_secret_key

VITE_Developer_Name="Your Name"
VITE_Developer_Email="your@email.com"
VITE_Developer_LinkedIn="https://linkedin.com/in/yourprofile"
```

`VITE_API_KEY` must match the `API_SECRET_KEY` set on the backend.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests with Vitest |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in Vercel, set **Root Directory** to `Frontend_StockAdvisor`
3. Add environment variables in Vercel project settings:
   - `VITE_API_URL` → your Hugging Face Space URL e.g. `https://hassaan007-agent-stock-advisor.hf.space`
   - `VITE_API_KEY` → same secret key as the backend
   - `VITE_Developer_Name`, `VITE_Developer_Email`, `VITE_Developer_LinkedIn`
4. Deploy — Vercel auto-detects Vite

---

## API Security

Every request automatically includes an `X-API-Key` header (injected by an Axios interceptor in `stockApi.js`). The backend rejects any request without a valid key with `401 Unauthorized`.

---

## Developer

Built by **Hassaan Azam**
