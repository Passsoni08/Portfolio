import { Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/layout/SmoothScroll'
import HomePage from './pages/HomePage'

function App() {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </SmoothScroll>
  )
}

export default App
