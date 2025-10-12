import { ShoppingCart, Eye } from 'lucide-react';

export default function ProductCard({ freshProducts }) {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {freshProducts.map((product, index) => (
                <div
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl overflow-hidden hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
                >
                    {/* Image Container */}
                    <div className="relative w-full h-64 overflow-hidden">
                        <img
                            src={product.mainImage}
                            alt={product.productName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                        {/* Floating Action Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                                aria-label="View product"
                            >
                                <Eye className="w-4 h-4 text-gray-900 cursor-pointer" />
                            </button>
                            <button
                                className="bg-gradient-to-r from-orange-500 to-pink-500 p-2.5 rounded-full hover:scale-110 transition-all duration-200 shadow-lg cursor-pointer"
                                aria-label="Add to cart"
                            >
                                <ShoppingCart className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-4">
                        {/* Product Name */}
                        <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 min-h-[1.5rem] truncate">
                            {product.productName}
                        </h3>

                        {/* Price & MOQ Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-xl p-3">
                                <p className="text-xs text-gray-400 font-medium mb-1">Price</p>
                                <p className="text-xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                                    ₹{product.unitPrice}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-3">
                                <p className="text-xs text-gray-400 font-medium mb-1">MOQ</p>
                                <p className="text-xl font-black text-purple-400">
                                    {product.minimumOrderQuantity}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:from-gray-600 hover:to-gray-500 transition-all duration-300 group/btn cursor-pointer">
                                <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                View
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 group/btn cursor-pointer">
                                <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}