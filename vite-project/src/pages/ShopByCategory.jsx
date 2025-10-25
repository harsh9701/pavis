import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { X } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function ShopByCategory() {
    const { id } = useParams(); // Get category ID from URL
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch category details + products by category ID
    const fetchCategoryProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/product/category/${id}`);
            const products = response.data.products;
            setProducts(response.data.products || []);
            setCategory(response.data.products[0].category.name || null);
        } catch (error) {
            console.error("Failed to fetch category products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProducts();
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 sm:px-6 lg:px-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {category ? `${category} Products` : "Category Products"}
                </h1>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
                </div>
            ) : products.length > 0 ? (
                <ProductCard freshProducts={products} />
            ) : (
                <div className="text-center text-gray-400 mt-20">
                    <X size={40} className="mx-auto mb-4 opacity-70" />
                    <p className="text-lg font-semibold">No products found in this category.</p>
                </div>
            )}
        </div>
    );
}
