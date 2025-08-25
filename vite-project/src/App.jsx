import { Routes, Route } from "react-router-dom";  // ⬅️ Missing in your code
import './App.css'
import User from './User'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <main className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<User />} />
        </Routes>
      </main>
    </>
  )
}

export default App