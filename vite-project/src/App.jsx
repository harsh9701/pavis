import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import './App.css';
import axios from "axios";

import LoadingScreen from "./components/LoadingScreen";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

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

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* Public routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
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