import { useState } from 'react';
import { ShoppingCart, Star, ArrowRight, Menu, User, Bell } from 'lucide-react';

export default function HomePage() {

    const [selectedCategory, setSelectedCategory] = useState('All');

    // Categories data
    const categories = [
        { id: 1, name: "All", count: 156, icon: "🏢" },
        { id: 2, name: "Office Equipment", count: 45, icon: "💼" },
        { id: 3, name: "Technology", count: 38, icon: "💻" },
        { id: 4, name: "Manufacturing", count: 29, icon: "⚙️" },
        { id: 5, name: "Healthcare", count: 22, icon: "🏥" },
        { id: 6, name: "Construction", count: 18, icon: "🏗️" },
        { id: 7, name: "Automotive", count: 15, icon: "🚗" }
    ];

    // Products data
    const products = [
        {
            id: 1,
            name: "Professional Laptop Stand",
            category: "Office Equipment",
            price: "$299",
            originalPrice: "$399",
            rating: 4.8,
            reviews: 124,
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
            badge: "Best Seller",
            inStock: true
        },
        {
            id: 2,
            name: "Wireless Conference System",
            category: "Technology",
            price: "$1,299",
            originalPrice: "$1,599",
            rating: 4.9,
            reviews: 89,
            image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=300&h=300&fit=crop",
            badge: "New",
            inStock: true
        },
        {
            id: 3,
            name: "Industrial Safety Helmet",
            category: "Construction",
            price: "$89",
            originalPrice: "$119",
            rating: 4.7,
            reviews: 203,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop",
            badge: "Sale",
            inStock: true
        },
        {
            id: 4,
            name: "Medical Grade Monitor",
            category: "Healthcare",
            price: "$2,199",
            originalPrice: "$2,499",
            rating: 4.6,
            reviews: 67,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop",
            badge: "Premium",
            inStock: false
        },
        {
            id: 5,
            name: "Heavy Duty Printer",
            category: "Office Equipment",
            price: "$899",
            originalPrice: "$1,199",
            rating: 4.5,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop",
            badge: "Popular",
            inStock: true
        },
        {
            id: 6,
            name: "Server Rack Cabinet",
            category: "Technology",
            price: "$1,899",
            originalPrice: "$2,299",
            rating: 4.8,
            reviews: 92,
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=300&fit=crop",
            badge: "Enterprise",
            inStock: true
        }
    ];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Categories Section */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedCategory === category.name
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                            >
                                <div className="text-2xl mb-2">{category.icon}</div>
                                <h3 className="font-semibold text-sm text-gray-900">{category.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{category.count} items</p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Products Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {selectedCategory === 'All' ? 'Featured Products' : selectedCategory}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Sort by: Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Rating</option>
                                <option>Newest</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.badge === 'Best Seller' ? 'bg-green-100 text-green-800' :
                                            product.badge === 'New' ? 'bg-blue-100 text-blue-800' :
                                                product.badge === 'Sale' ? 'bg-red-100 text-red-800' :
                                                    'bg-purple-100 text-purple-800'
                                            }`}>
                                            {product.badge}
                                        </span>
                                    </div>
                                    {!product.inStock && (
                                        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                                            <span className="bg-white px-4 py-2 rounded-lg font-semibold text-gray-900">Out of Stock</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="mb-2">
                                        <span className="text-xs text-blue-600 font-medium">{product.category}</span>
                                    </div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>

                                    <div className="flex items-center mb-3">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                            <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                                            <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                                        </div>
                                        <button
                                            disabled={!product.inStock}
                                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-1" />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-10">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors">
                            Load More Products
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}