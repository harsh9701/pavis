import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    ArrowLeft,
    ShoppingCart,
    Package,
    TrendingUp,
    Shield,
    Truck,
    Star,
    Plus,
    Minus,
} from "lucide-react";

export default function ProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(6);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const res = await axios.get(`/product/view/${id}`);
                const data = res.data.productData;
                setProduct(data);
                setQuantity(data.minimumOrderQuantity);
                setSelectedImage(data.mainImage);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProductDetail();
        window.scrollTo(0, 0);
    }, [id])

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
                Product not found.
            </div>
        );
    }

    const allImages = [product.mainImage, ...(product.additionalImages || [])].filter(Boolean);

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => {
        if (quantity > product.minimumOrderQuantity) {
            setQuantity((prev) => prev - 1);
        }
    };

    const calculateTotal = () => {
        const subtotal = product.unitPrice * quantity;
        let total = subtotal;
        if (product.taxType === "exclusive") {
            total += (subtotal * product.taxRate) / 100;
        }
        return total;
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-orange-600/20"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-16">
                {/* Images Top */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Main Image */}
                    <div className="space-y-6 mt-8">
                        <div className="relative w-full h-130 rounded-2xl overflow-hidden border border-gray-700 mb-4 aspect-square sm:aspect-[16/9]">
                            <img
                                src={selectedImage}
                                alt={product.productName}
                                className="w-full h-full object-fit"
                            />
                            {product.discount > 0 && (
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1.5 rounded-full font-semibold text-sm">
                                    {product.discount}% OFF
                                </div>
                            )}
                        </div>

                        {/* Scrollable Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
                            {allImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 snap-start transition cursor-pointer ${selectedImage === img
                                        ? "border-purple-500 ring-2 ring-purple-500/50"
                                        : "border-gray-700 hover:border-gray-500"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`View ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 mt-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
                                {product.productName}
                            </h1>
                            {/* <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="text-yellow-400 fill-yellow-400"
                                        size={18}
                                    />
                                ))}
                                <span className="text-gray-400 ml-2 text-sm">
                                    4.8 (245 reviews)
                                </span>
                            </div> */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400">
                                    SKU: {product.sku}
                                </span>
                                <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-400">
                                    {product.category}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border border-gray-700">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                                        ₹{product.unitPrice}
                                    </span>
                                    <span className="text-gray-400">/unit</span>
                                </div>
                                {product.discount > 0 && (
                                    <p className="text-gray-500 line-through text-sm">
                                        ₹{Math.round(product.unitPrice / (1 - product.discount / 100))}
                                    </p>
                                )}
                                <div className="mt-2 space-y-1 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Package size={16} />
                                        Min Order {product.minimumOrderQuantity} units
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp size={16} />
                                        Tax: {product.taxRate}% ({product.taxType})
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400">
                                        <Truck size={16} />
                                        Free delivery above ₹5000
                                    </div>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border border-gray-700">
                                <label className="block text-sm font-semibold text-gray-400 mb-3">
                                    Select Quantity
                                </label>
                                <div className="flex items-center gap-3 mb-4">
                                    <button
                                        onClick={decrementQuantity}
                                        disabled={quantity <= product.minimumOrderQuantity}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-800 border border-gray-700 hover:border-purple-500 disabled:opacity-50 flex items-center justify-center cursor-pointer"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                Math.max(
                                                    parseInt(e.target.value) || product.minimumOrderQuantity,
                                                    product.minimumOrderQuantity
                                                )
                                            )
                                        }
                                        className="w-20 sm:w-24 h-10 sm:h-12 bg-gray-800 border border-gray-700 rounded-xl text-center text-lg font-bold focus:border-purple-500 outline-none"
                                    />
                                    <button
                                        onClick={incrementQuantity}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-800 border border-gray-700 hover:border-purple-500 flex items-center justify-center cursor-pointer"
                                    >
                                        <Plus size={18} />
                                    </button>

                                    <button className="group relative flex-1 px-6 py-4 rounded-xl font-bold overflow-hidden cursor-pointer">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 transition-transform group-hover:scale-105"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 blur-xl opacity-40"></div>
                                        <span className="relative flex items-center justify-center">
                                            <ShoppingCart className="mr-2" size={20} /> Add to Cart
                                        </span>
                                    </button>
                                </div>

                                <div className="space-y-2 border-t border-gray-700 pt-3 text-sm">
                                    {/* <div className="flex justify-between text-gray-400">
                                        <span>Subtotal:</span>
                                        <span>₹{(product.unitPrice * quantity).toFixed(2)}</span>
                                    </div> */}
                                    {/* {product.discount > 0 && (
                                        <div className="flex justify-between text-green-400">
                                            <span>Discount ({product.discount}%):</span>
                                            <span>
                                                -₹{(
                                                    (product.unitPrice * quantity * product.discount) /
                                                    100
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    )} */}
                                    <div className="flex justify-between text-gray-400">
                                        <span>Tax ({product.taxRate}%):</span>
                                        <span>
                                            ₹{(
                                                (product.unitPrice * quantity * product.taxRate) /
                                                100
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-2">
                                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            Total:
                                        </span>
                                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                                            ₹{calculateTotal().toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            {/* <div className="flex flex-col sm:flex-row gap-3">
                                <button className="group relative flex-1 px-6 py-4 rounded-xl font-bold overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 transition-transform group-hover:scale-105"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 blur-xl opacity-40"></div>
                                    <span className="relative flex items-center justify-center">
                                        <ShoppingCart className="mr-2" size={20} /> Add to Cart
                                    </span>
                                </button>
                                <button className="flex-1 px-6 py-4 rounded-xl font-bold border-2 border-gray-700 hover:border-purple-500 hover:bg-purple-500/10 transition">
                                    Buy Now
                                </button>
                            </div> */}

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { icon: Shield, text: "Verified Seller" },
                                    { icon: Truck, text: "Fast Delivery" },
                                    { icon: Star, text: "Quality Assured" },
                                ].map((f, i) => (
                                    <div
                                        key={i}
                                        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-3 border border-gray-700 text-center hover:border-gray-600 transition group"
                                    >
                                        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                            <f.icon size={16} />
                                        </div>
                                        <span className="text-xs text-gray-400 group-hover:text-gray-300 transition">
                                            {f.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-8 mt-2">
                    {/* Left Section - Details */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-bold mb-3">Product Details</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Category:</span>
                                    <span className="font-semibold text-white">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Subcategory:</span>
                                    <span className="font-semibold text-white">
                                        {product.subcategory}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Status:</span>
                                    <span className="font-semibold text-green-400 capitalize">
                                        {product.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Details */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-bold mb-3">Description</h3>
                            <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div >
    );
}
