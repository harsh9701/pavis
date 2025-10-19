import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import './App.css';
import axios from "axios";
import { Toaster } from "react-hot-toast";

import AdminLayout from "./components/AdminLayout";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import LoadingScreen from "./components/LoadingScreen";
import UserLayout from "./components/UserLayout";

// ✅ Lazy load all page components
const Home = lazy(() => import("./pages/Home"));
const LoginRegister = lazy(() => import("./pages/LoginRegister"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ExploreProducts = lazy(() => import("./pages/ExploreProducts"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ManageProducts = lazy(() => import("./pages/ManageProducts"));
const ManageCustomers = lazy(() => import("./pages/ManageCustomer"));
const ManageCategories = lazy(() => import("./pages/Categories"));
const CartPage = lazy(() => import("./pages/CartPage"));

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>

        {/* Public routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/view-product" element={<ProductPage />} />
          <Route path="/explore" element={<ExploreProducts />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminLayout />}>
          <Route
            path="/add-product"
            element={
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/manage-products"
            element={
              <AdminProtectedRoute>
                <ManageProducts />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/manage-customers"
            element={
              <AdminProtectedRoute>
                <ManageCustomers />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/manage-categories"
            element={
              <AdminProtectedRoute>
                <ManageCategories />
              </AdminProtectedRoute>
            }
          />

          {/* Catch-all error route */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;