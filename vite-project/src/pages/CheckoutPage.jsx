import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, CreditCard, ShoppingBag, Package, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        fullAddress: "",
        city: "",
        state: "",
        pincode: "",
    });

    useEffect(() => {
        fetchCartData();
        window.scrollTo(0, 0);
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await axios.get("/users/cartData");
            if (response.data.cart.items) {
                setCart(response.data.cart.items);
            } else {
                setCart([]);
            }
        } catch (err) { }
    }

    // ✅ Validation helpers
    const isValidPincode = (pincode) => {
        return /^[1-9][0-9]{5}$/.test(pincode); // Must be 6 digits and not start with 0
    };

    const isValidPhone = (phone) => {
        // Must start with 6–9, be 10 digits, and not all same digits
        return /^[6-9]\d{9}$/.test(phone) && !/^(\d)\1{9}$/.test(phone);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // ✅ Restrict only phone and pincode inputs
        if (name === "phone") {
            if (/^\d{0,10}$/.test(value)) setAddress({ ...address, [name]: value });
        } else if (name === "pincode") {
            if (/^\d{0,6}$/.test(value)) setAddress({ ...address, [name]: value });
        } else {
            setAddress({ ...address, [name]: value });
        }
    };

    // Calculate item total with tax
    const calculateItemTotal = (item) => {
        const basePrice = item.unitPrice * item.quantity;
        const taxRate = item.taxRate || 0;
        const taxType = item.taxType || "inclusive";

        if (taxType === "exclusive") {
            // Tax is added on top
            const taxAmount = (basePrice * taxRate) / 100;
            return basePrice + taxAmount;
        } else {
            // Tax is inclusive (already in price)
            return basePrice;
        }
    };

    // Calculate subtotal (sum of all item totals including exclusive tax)
    const subtotal = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
    const shipping = subtotal > 5000 ? 0 : 500;
    const total = subtotal + shipping;

    const handlePayment = async () => {
        if (
            !address.fullName ||
            !address.phone ||
            !address.fullAddress ||
            !address.city ||
            !address.state ||
            !address.pincode
        ) {
            toast.error("Please fill all address fields");
            return;
        }

        if (!isValidPhone(address.phone)) {
            toast.error("Invalid phone number. Must be 10 digits and start with 6–9.");
            return;
        }

        if (!isValidPincode(address.pincode)) {
            toast.error("Invalid pincode. Must be a 6-digit number and not start with 0.");
            return;
        }

        try {
            toast.promise(
                axios.post("/users/createOrder", { address, cart, total }),
                {
                    loading: "Processing payment...",
                    success: "Order placed successfully ✅",
                    error: "Order not placed❌",
                }
            ).then((res) => {
                const orderNumber = res.data.orderNumber;

                // Clear cart (optional)
                setCart([]);
                navigate(`/order-success/${orderNumber}`);
            })
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to place order");
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pt-13">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 rounded-full transition-all"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-[1.2rem] md:text-[2.2rem] font-black bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Checkout
                        </h1>
                    </div>
                    <div className="flex items-center text-[0.8rem] md:text-[1rem] gap-2 bg-gray-800/60 px-4 py-2 rounded-full border border-gray-700/40">
                        <ShoppingBag size={20} className="text-orange-400" />
                        <span className="font-semibold">{cart.length} Items</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Left Section - Address & Items */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Address Form */}
                        <div className="bg-gray-800/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700/40 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg">
                                    <MapPin size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">Shipping Address</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    name="fullName"
                                    value={address.fullName}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/40 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all placeholder:text-gray-500"
                                />
                                <input
                                    name="phone"
                                    value={address.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    inputMode="numeric"
                                    maxLength={10}
                                    className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/40 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all placeholder:text-gray-500"
                                />
                                <input
                                    name="fullAddress"
                                    value={address.fullAddress}
                                    onChange={handleChange}
                                    placeholder="Full Address"
                                    className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/40 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all md:col-span-2 placeholder:text-gray-500"
                                />
                                <input
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/40 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all placeholder:text-gray-500"
                                />
                                <input
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/40 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all placeholder:text-gray-500"
                                />
                                <input
                                    name="pincode"
                                    value={address.pincode}
                                    onChange={handleChange}
                                    placeholder="Pincode"
                                    inputMode="numeric"
                                    maxLength={6}
                                    className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/40 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all md:col-span-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-gray-800/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700/40 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg">
                                    <Package size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">Order Items</h2>
                            </div>

                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item, index) => {
                                    const basePrice = item.unitPrice * item.quantity;
                                    const taxRate = item.taxRate || 0;
                                    const taxType = item.taxType || "inclusive";
                                    const itemTotal = calculateItemTotal(item);

                                    return (
                                        <div key={index} className="p-4 bg-gray-900/60 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all">
                                            <div className="flex items-start gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Package size={28} className="text-gray-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-white mb-1 truncate">{item.productName}</h3>
                                                    <p className="text-sm text-gray-400 mb-2">₹{item.unitPrice} × {item.quantity}</p>
                                                    {taxRate > 0 && (
                                                        <div className="text-xs text-gray-500">
                                                            Tax: {taxRate}% {taxType === "inclusive" ? "(Incl.)" : "(Excl.)"}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-right ml-4">
                                                    <p className="text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent whitespace-nowrap">
                                                        ₹{itemTotal.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <style>{`
                            .custom-scrollbar::-webkit-scrollbar {
                                width: 6px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: rgba(31, 41, 55, 0.5);
                                border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: linear-gradient(to bottom, #f97316, #ec4899);
                                border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: linear-gradient(to bottom, #fb923c, #f472b6);
                            }
                            .custom-scrollbar {
                                scrollbar-width: thin;
                                scrollbar-color: #f97316 rgba(31, 41, 55, 0.5);
                            }
                        `}</style>
                    </div>

                    {/* Right Section - Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700/40 shadow-xl sticky top-8">
                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-gray-300">
                                    <span className="text-base">Subtotal (with taxes)</span>
                                    <span className="font-semibold text-lg">₹{subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Truck size={18} className="text-orange-400" />
                                        <span className="text-base">Shipping</span>
                                    </div>
                                    <span className="font-semibold text-lg">
                                        {shipping === 0 ? (
                                            <span className="text-green-400">FREE</span>
                                        ) : (
                                            `₹${shipping}`
                                        )}
                                    </span>
                                </div>

                                {subtotal < 5000 && subtotal > 0 && (
                                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                                        <p className="text-xs text-orange-300">
                                            Add ₹{(5000 - subtotal).toFixed(2)} more for FREE shipping!
                                        </p>
                                    </div>
                                )}

                                <div className="border-t border-gray-700/40 pt-4 flex justify-between items-center">
                                    <span className="text-xl font-bold">Total</span>
                                    <span className="text-2xl font-black bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                        ₹{total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer"
                            >
                                <CreditCard size={22} />
                                Pay ₹{total.toFixed(2)}
                            </button>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>30-Day Money Back Guarantee</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>Fast Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}