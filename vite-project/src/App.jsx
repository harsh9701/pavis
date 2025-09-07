import { Routes, Route } from "react-router-dom";  // ⬅️ Missing in your code
import './App.css'
import LoginRegister from './pages/LoginRegister'
import Home from './pages/Home'
import AddProduct from "./pages/AddProduct";
import ProductPage from "./pages/ProductPage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/add-product" element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } />
          <Route path="/view-product" element={<ProductPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App