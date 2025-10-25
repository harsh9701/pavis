import { useState, useEffect } from "react";
import {
    CheckCircle,
    Package,
    MapPin,
    Calendar,
    Phone,
    Download,
    ArrowLeft
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderSuccess() {
    const [showConfetti, setShowConfetti] = useState(true);
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { orderNumber } = useParams();
    const navigate = useNavigate();

    const fetchOrderData = async () => {
        try {
            const res = await axios.get("/users/orderDetail", {
                params: { orderNumber },
            });
            setOrderData(res.data.order);
        } catch (error) {
            console.error("Error fetching order details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderData();
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p className="text-lg animate-pulse">Loading your order details...</p>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <p className="text-xl mb-4">Order not found 😢</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
                >
                    Go Home
                </button>
            </div>
        );
    }

    const order = orderData; // use the fetched data

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
                <div
                    className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Confetti Effect */}
            {showConfetti && (
                <div className="fixed inset-0 z-20 pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: "-10px",
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 2}s`,
                            }}
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: [
                                        "#3b82f6",
                                        "#a855f7",
                                        "#f97316",
                                        "#10b981",
                                    ][Math.floor(Math.random() * 4)],
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 pt-26 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Success Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6 animate-bounce-slow">
                            <CheckCircle size={48} className="text-white" />
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black mb-2">Order Placed Successfully!</h1>
                        <p className="text-gray-400">
                            Thank you for your purchase. Your order has been confirmed and will
                            be shipped soon.
                        </p>
                    </div>

                    {/* Order ID */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Order ID</p>
                                <p className="text-sm sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                                    {order.orderNumber}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:border-purple-500 transition text-sm font-semibold">
                                    <Download size={16} />
                                    Invoice
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 hover:scale-105 transition text-sm font-semibold">
                                    <Package size={16} />
                                    Track Order
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Info + Summary */}
                    <div className="grid lg:grid-cols-2 gap-6 mb-6">
                        {/* Address */}
                        <div className="flex flex-col justify-between bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="text-purple-400" size={20} />
                                <h3 className="text-lg font-bold">Delivery Address</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p className="font-semibold text-white">{order.shippingAddress.fullName}</p>
                                <p className="text-gray-400">{order.shippingAddress.fullAddress}</p>
                                <p className="text-gray-400">
                                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                </p>
                                <div className="pt-3 border-t border-gray-700">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Phone size={14} />
                                        <span>{order.shippingAddress.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="flex flex-col justify-between bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="text-blue-400" size={20} />
                                <h3 className="text-lg font-bold">Order Summary</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Order Date:</span>
                                    <span className="font-semibold">
                                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Payment Method:</span>
                                    <span className="font-semibold">{order.paymentMethod}</span>
                                </div>
                                <div className="pt-3 border-t border-gray-700">
                                    <div className="flex justify-between text-lg font-black">
                                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            Order Amount:
                                        </span>
                                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                                            ₹{order.grandTotal?.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ordered Items */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
                        <h3 className="text-lg font-bold mb-4">Ordered Items</h3>
                        <div className="space-y-4">
                            {order.orderItems?.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                                >
                                    <img
                                        src={item.mainImage}
                                        alt={item.productName}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold mb-1">{item.productName}</h4>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-400">Qty: {item.quantity}</span>
                                            <span className="font-bold">
                                                ₹{item.unitPrice} × {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => navigate("/")}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold border-2 border-gray-700 hover:border-purple-500 hover:bg-purple-500/10 transition cursor-pointer"
                        >
                            <ArrowLeft size={20} />
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => navigate("/orders")}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 hover:scale-105 transition cursor-pointer"
                        >
                            <Package size={20} />
                            View All Orders
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
