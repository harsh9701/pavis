import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { X, Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function ShopByCategory() {
    const { id } = useParams(); // Get category ID from URL
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // 🔥 Sidebar state

    // Fetch category details + products by category ID
    const fetchCategoryProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/product/category/${id}`);
            setProducts(response.data.products || []);
            setCategory(response.data.category || null);
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

    const filteredProducts =
        selectedSubcategory === "All"
            ? products
            : products.filter(
                (p) => p.subcategory === selectedSubcategory
            );

    // Handle filter click
    const handleSubcategorySelect = (sub) => {
        setSelectedSubcategory(sub);
        setIsFilterOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 sm:px-6 lg:px-10 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {category ? `${category.name} Products` : "Category Products"}
                </h1>

                {/* Filter Button */}
                {category?.subcategories?.length > 0 && (
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition-all duration-200"
                    >
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                )}
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
                </div>
            ) : filteredProducts.length > 0 ? (
                <ProductCard freshProducts={filteredProducts} />
            ) : (
                <div className="text-center text-gray-400 mt-20">
                    <X size={40} className="mx-auto mb-4 opacity-70" />
                    <p className="text-lg font-semibold">
                        No products found in this subcategory.
                    </p>
                </div>
            )}

            {/* Sidebar Overlay */}
            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsFilterOpen(false)}
                ></div>
            )}

            {/* Sidebar Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ${isFilterOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-5 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-white">Filter by Subcategory</h2>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="p-5 space-y-3">
                    <button
                        onClick={() => handleSubcategorySelect("All")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${selectedSubcategory === "All"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            }`}
                    >
                        All
                    </button>

                    {category?.subcategories?.map((sub, index) => (
                        <button
                            key={index}
                            onClick={() => handleSubcategorySelect(sub)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition ${selectedSubcategory === sub
                                ? "bg-purple-600 text-white"
                                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                }`}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}