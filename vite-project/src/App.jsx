import { Routes, Route } from "react-router-dom";  // ⬅️ Missing in your code
import './App.css'
import User from './pages/User'
import Home from './pages/Home'

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<User />} />
        </Routes>
      </main>
    </>
  )
}

export default App