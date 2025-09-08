import { Routes, Route } from "react-router-dom";  // ⬅️ Missing in your code
import './App.css'
import LoginRegister from './pages/LoginRegister'
import Home from './pages/Home'
import AddProduct from "./pages/AddProduct";
import ProductPage from "./pages/ProductPage";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import axios from "axios";
import Layout from "./components/Layout";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/add-product" element={
            <AdminProtectedRoute>
              <AddProduct />
            </AdminProtectedRoute>
          } />
          <Route path="/view-product" element={<ProductPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App