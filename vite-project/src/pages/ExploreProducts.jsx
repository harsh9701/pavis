import { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";

export default function ExploreProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cart, setCart] = useState([]);

    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get("/product"); // your API endpoint
            setProducts(response.data.products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get("/admin/categories");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
        // You can also save cart in localStorage or send to backend
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-12 pt-22">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center mb-10">
                <button
                    className={`px-4 py-2 rounded-full font-semibold ${selectedCategory === "All"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-purple-500"
                        }`}
                    onClick={() => setSelectedCategory("All")}
                >
                    All
                </button>
                {categories.map((cat, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 rounded-full font-semibold ${selectedCategory === cat.name
                                ? "bg-purple-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-purple-500"
                            }`}
                        onClick={() => setSelectedCategory(cat.name)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product._id}
                        className="bg-gray-800 rounded-2xl p-4 flex flex-col hover:shadow-lg transition-shadow"
                    >
                        <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                            <img
                                src={product.mainImage}
                                alt={product.productName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{product.productName}</h3>
                        {/* <p className="text-gray-400 mb-4">{product.category}</p> */}
                        <div className="flex justify-between items-center mt-auto">
                            <span className="font-semibold text-white">₹{product.unitPrice}</span>
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-full"
                            >
                                <ShoppingCart size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Summary (optional) */}
            {cart.length > 0 && (
                <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-2xl shadow-lg">
                    <h4 className="font-bold mb-2">Cart</h4>
                    <ul className="text-sm max-h-48 overflow-y-auto">
                        {cart.map((item, i) => (
                            <li key={i} className="flex justify-between mb-1">
                                <span>{item.productName}</span>
                                <span>₹{item.unitPrice}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
