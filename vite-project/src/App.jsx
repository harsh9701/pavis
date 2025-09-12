import { Routes, Route } from "react-router-dom";
import './App.css'

import AddProduct from "./pages/AddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import ProductPage from "./pages/ProductPage";
import UserLayout from "./components/UserLayout";

import axios from "axios";
import ManageProducts from "./pages/ManageProducts";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/view-product" element={<ProductPage />} />
        </Route>

        {/*Admin routes  */}
        <Route element={<AdminLayout />}>
          <Route path="/add-product" element={
            <AdminProtectedRoute>
              <AddProduct />
            </AdminProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />
          <Route path="/manage-products" element={
            <AdminProtectedRoute>
              <ManageProducts />
            </AdminProtectedRoute>
          } />

          {/* Error Page */}
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App