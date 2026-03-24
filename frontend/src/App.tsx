import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SmoothScroll from './components/layout/SmoothScroll'
import HomePage from './pages/HomePage'

const DocsPage = lazy(() => import('./pages/DocsPage'))

function App() {
  const location = useLocation()

  return (
    <SmoothScroll>
      <div key={location.pathname} className="page-transition">
        <Suspense fallback={
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-small)',
          }}>
            Loading...
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<DocsPage />} />
          </Routes>
        </Suspense>
      </div>
    </SmoothScroll>
  )
}

export default App
