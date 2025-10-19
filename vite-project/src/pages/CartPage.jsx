import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { debounce } from "../utils/debounce";
import toast from "react-hot-toast";
import axios from 'axios';

export default function CartPage() {
    const navigate = useNavigate();
    const { cart, setCart, loading, removeFromCart } = useCart();

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await axios.get("/users/cartData");
            setCart(response.data.cart.items);
        } catch (err) {

        }
    }

    const goBack = () => {
        navigate(-1);
    }

    const updateCartQuantityAPI = async (cartItemId, quantity) => {
        try {
            // Call backend to persist quantity
            toast.promise(
                axios.post("/product/updateCartQuantity", {
                    cartItemId,
                    quantity,
                }),
                {
                    loading: "Updating quantity...",
                    success: "Quantity updated ✅",
                    error: "Failed to update quantity ❌",
                }
            );
        } catch (err) {
            toast.error("Failed to update quantity ❌");
        }
    };

    // inside CartPage component
    const debouncedUpdate = useRef(debounce(updateCartQuantityAPI, 500)).current;

    const updateQuantity = async (id, change) => {
        const item = cart.find(i => i._id === id);
        if (!item) return;

        const newQuantity = item.quantity + change;

        // Check against Minimum Order Quantity (MOQ)
        if (newQuantity < item.minimumOrderQuantity) {
            toast.error(`Minimum order quantity is ${item.minimumOrderQuantity}`);
            return;
        }

        // Optimistically update the UI
        setCart(prev =>
            prev.map(i =>
                i._id === id ? { ...i, quantity: newQuantity } : i
            )
        );

        // Call backend via debounced function
        debouncedUpdate(id, newQuantity);
    };

    const removeItem = (id) => {
        removeFromCart(id);
    };

    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shipping = subtotal > 5000 ? 0 : 99;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center md:gap-4">
                        <button
                            onClick={goBack}
                            className="text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 rounded-full transition-all cursor-pointer">
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-[1.2rem] md:text-[2.2rem] font-black bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Shopping Cart
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <ShoppingBag size={24} />
                        <span className="font-semibold">{cart.length} Items</span>
                    </div>
                </div>

                {cart.length === 0 ? (
                    // Empty Cart
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700/30">
                            <ShoppingBag size={80} className="text-gray-600 mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-gray-300 mb-2">Your cart is empty</h2>
                            <p className="text-gray-500 mb-6">Add some products to get started!</p>
                            <Link to="/" className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300"
                                >
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.mainImage}
                                                alt={item.productName}
                                                className="w-full sm:w-32 h-32 object-cover rounded-xl border border-gray-700/30"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">
                                                    {item.productName}
                                                </h3>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                                                    ₹{item.unitPrice}
                                                </p>
                                            </div>

                                            {/* Quantity Controls & Remove Button */}
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-3 bg-gray-800 rounded-xl p-1 border border-gray-700/30">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, -1)}
                                                        className="p-2 hover:bg-gray-700 rounded-lg transition-all cursor-pointer"
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="w-12 text-center font-bold text-lg cursor-pointer">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, 1)}
                                                        className="p-2 hover:bg-gray-700 rounded-lg transition-all cursor-pointer"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-all cursor-pointer"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Item Total (Desktop) */}
                                        <div className="hidden sm:flex items-start justify-end">
                                            <p className="text-2xl font-bold text-purple-400">
                                                ₹{item.unitPrice * item.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Item Total (Mobile) */}
                                    <div className="sm:hidden flex justify-between items-center mt-4 pt-4 border-t border-gray-700/30">
                                        <span className="text-gray-400">Subtotal:</span>
                                        <p className="text-xl font-bold text-purple-400">
                                            ₹{item.unitPrice * item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 sticky top-24">
                                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Shipping</span>
                                        <span className="font-semibold">
                                            {shipping === 0 ? (
                                                <span className="text-green-400">FREE</span>
                                            ) : (
                                                `₹${shipping}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-700/30 pt-4 flex justify-between text-xl font-bold">
                                        <span className="text-white">Total</span>
                                        <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                                            ₹{total}
                                        </span>
                                    </div>
                                </div>

                                {shipping > 0 && (
                                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6">
                                        <p className="text-sm text-orange-300">
                                            Add ₹{5000 - subtotal} more for FREE shipping!
                                        </p>
                                    </div>
                                )}

                                <button className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 mb-4 cursor-pointer">
                                    Proceed to Checkout
                                </button>

                                <button className="w-full bg-gradient-to-br from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600 border border-gray-700/50 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer">
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}