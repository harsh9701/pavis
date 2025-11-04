import { ShoppingCart, Eye, Heart } from "lucide-react";
import { useCart } from "../context/CartContext"; // adjust path
import { useNavigate } from "react-router-dom"; // if using react-router

export default function ProductCard({ freshProducts }) {
    const { addToCart } = useCart();
    const navigate = useNavigate(); // for navigation to product page

    const handleViewProduct = (product) => {
        // Navigate to product details page (or open modal)
        navigate(`/product/${product._id}`);
    };

    const handleAddToCart = (product, moq) => {
        addToCart(product, moq);
    };

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {freshProducts.map((product, i) => (
                <div key={i} className="group relative bg-white rounded-3xl overflow-hidden border-2 border-black hover:shadow-2xl transition-all hover:-translate-y-2">
                    {/* Image container with overlay */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                            src={product.mainImage}
                            alt={product.productName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Curved overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        {/* Quick view button */}
                        <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                            <Heart size={20} />
                        </button>

                        {/* New badge with curved design */}
                        <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                            NEW
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="p-6 relative">
                        {/* Top decorative line */}
                        <svg className="absolute top-0 left-6 w-16 h-2 opacity-10" viewBox="0 0 60 10">
                            <path d="M 0,5 Q 30,0 60,5" stroke="black" strokeWidth="2" fill="none" />
                        </svg>

                        <h3 className="font-bold text-xl mb-3 mt-2">{product.productName}</h3>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Price</p>
                                <p className="text-3xl font-black">₹{product.unitPrice}</p>
                            </div>
                            <button
                                className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-2 group/btn"
                                onClick={() => handleAddToCart(product, product.minimumOrderQuantity)}
                            >
                                <ShoppingCart size={18} className="group-hover/btn:rotate-12 transition-transform" />
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}