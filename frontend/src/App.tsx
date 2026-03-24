import { Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/layout/SmoothScroll'
import HomePage from './pages/HomePage'
import DocsPage from './pages/DocsPage'

function App() {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </SmoothScroll>
  )
}

export default App
