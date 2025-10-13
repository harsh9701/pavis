import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../context/CartContext"; // adjust path
import { useNavigate } from "react-router-dom"; // if using react-router

export default function ProductCard({ freshProducts }) {
    const { addToCart } = useCart();
    const navigate = useNavigate(); // for navigation to product page

    const handleViewProduct = (product) => {
        // Navigate to product details page (or open modal)
        navigate(`/product/${product._id}`);
    };

    const handleAddToCart = (productId, moq) => {
        addToCart(productId, moq);
    };

    return (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {freshProducts.map((product, index) => (
                <div
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl md:rounded-3xl overflow-hidden hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
                >
                    {/* Image Container */}
                    <div className="relative w-full aspect-square overflow-hidden">
                        <img
                            src={product.mainImage}
                            alt={product.productName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                        {/* Floating Action Buttons */}
                        <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-1.5 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => handleViewProduct(product)}
                                className="bg-white/90 backdrop-blur-sm p-1.5 md:p-2.5 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                                aria-label="View product"
                            >
                                <Eye className="w-3 h-3 md:w-4 md:h-4 text-gray-900 cursor-pointer" />
                            </button>
                            <button
                                onClick={() => handleAddToCart(product._id, product.minimumOrderQuantity)}
                                className="bg-gradient-to-r from-orange-500 to-pink-500 p-1.5 md:p-2.5 rounded-full hover:scale-110 transition-all duration-200 shadow-lg cursor-pointer"
                                aria-label="Add to cart"
                            >
                                <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    < div className="p-3 md:p-5 space-y-2 md:space-y-4" >
                        <h3 className="text-sm md:text-lg font-bold text-white leading-tight line-clamp-2 min-h-[2rem] md:min-h-[1.5rem]">
                            {product.productName}
                        </h3>

                        {/* Price & MOQ Grid */}
                        < div className="grid grid-cols-2 gap-2 md:gap-3" >
                            <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-lg md:rounded-xl p-2 md:p-3">
                                <p className="text-[10px] md:text-xs text-gray-400 font-medium mb-0.5 md:mb-1">Price</p>
                                <p className="text-sm md:text-xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                                    ₹{product.unitPrice}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg md:rounded-xl p-2 md:p-3">
                                <p className="text-[10px] md:text-xs text-gray-400 font-medium mb-0.5 md:mb-1">MOQ</p>
                                <p className="text-sm md:text-xl font-black text-purple-400">
                                    {product.minimumOrderQuantity}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-1.5 md:gap-2 pt-1 md:pt-2">
                            <button
                                onClick={() => handleViewProduct(product)}
                                className="flex-1 flex items-center justify-center gap-1 md:gap-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm hover:from-gray-600 hover:to-gray-500 transition-all duration-300 group/btn cursor-pointer"
                            >
                                <Eye className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:scale-110 transition-transform" />
                                <span className="hidden sm:inline">View</span>
                            </button>
                            <button
                                onClick={() => handleAddToCart(product._id, product.minimumOrderQuantity)}
                                className="flex-1 flex items-center justify-center gap-1 md:gap-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 group/btn cursor-pointer"
                            >
                                <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:scale-110 transition-transform" />
                                <span className="hidden sm:inline">Add</span>
                            </button>
                        </div>
                    </div >
                </div >
            ))
            }
        </div >
    );
}