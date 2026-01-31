import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-deep-space" data-theme="xai">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
