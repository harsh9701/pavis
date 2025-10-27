import { useContext, useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Package, ShoppingBag, Clock, Edit2, Save, X, ChevronRight, TrendingUp } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CustomerProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('info');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // Redirect to login if user is not authenticated
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) {
        // Optional: show nothing while redirecting
        return null;
    }

    const [customerData, setCustomerData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        address: '123 Business Street, Mumbai, Maharashtra 400001'
    });

    const [editData, setEditData] = useState({ ...customerData });

    const [orders] = useState([
        {
            id: 'ORD001',
            orderNumber: 'WHS2025001',
            items: ['Product A', 'Product B', 'Product C'],
            totalAmount: 45999,
            status: 'delivered',
            createdAt: '2025-10-15T10:30:00Z'
        },
        {
            id: 'ORD002',
            orderNumber: 'WHS2025002',
            items: ['Product D', 'Product E'],
            totalAmount: 28500,
            status: 'processing',
            createdAt: '2025-10-20T14:20:00Z'
        },
        {
            id: 'ORD003',
            orderNumber: 'WHS2025003',
            items: ['Product F'],
            totalAmount: 15750,
            status: 'pending',
            createdAt: '2025-10-24T09:15:00Z'
        }
    ]);

    const stats = {
        totalOrders: orders.length,
        totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
        pendingOrders: orders.filter(order => order.status === 'pending').length
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setCustomerData(editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...customerData });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-orange-600/20"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl sm:text-6xl font-black mb-4">
                        Hi, <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">{user.fullName}</span>
                    </h1>
                    <p className="text-xl text-gray-400">Manage your account and track your orders</p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                        { icon: ShoppingBag, label: 'Total Orders', value: stats.totalOrders, gradient: 'from-blue-500 to-cyan-500' },
                        { icon: TrendingUp, label: 'Total Spent', value: `₹${stats.totalSpent.toLocaleString()}`, gradient: 'from-purple-500 to-pink-500' },
                        { icon: Clock, label: 'Pending Orders', value: stats.pendingOrders, gradient: 'from-orange-500 to-yellow-500' }
                    ].map((stat, i) => (
                        <div key={i} className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}></div>
                            <stat.icon className={`text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text mb-3`} size={32} strokeWidth={2} />
                            <div className="text-3xl font-black mb-1">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-800">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`pb-4 px-6 font-bold transition-all ${activeTab === 'info' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        Personal Info
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`pb-4 px-6 font-bold transition-all ${activeTab === 'orders' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        Order History
                    </button>
                </div>

                {/* Personal Info Tab */}
                {activeTab === 'info' && (
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h2 className="text-3xl font-black">Personal Information</h2>
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:scale-105 transition-transform"
                                >
                                    <Edit2 size={18} /> Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-bold hover:scale-105 transition-transform"
                                    >
                                        <Save size={18} /> Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-full font-bold hover:bg-gray-600 transition"
                                    >
                                        <X size={18} /> Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center gap-2 text-gray-400 mb-2">
                                        <User size={18} /> Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                        />
                                    ) : (
                                        <div className="text-xl font-semibold">{customerData.name}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-gray-400 mb-2">
                                        <Mail size={18} /> Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                        />
                                    ) : (
                                        <div className="text-xl font-semibold">{customerData.email}</div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center gap-2 text-gray-400 mb-2">
                                        <Phone size={18} /> Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editData.phone}
                                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                        />
                                    ) : (
                                        <div className="text-xl font-semibold">{customerData.phone}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-gray-400 mb-2">
                                        <MapPin size={18} /> Address
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={editData.address}
                                            onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                            rows={3}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none resize-none"
                                        />
                                    ) : (
                                        <div className="text-xl font-semibold">{customerData.address}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black mb-6">Order History</h2>
                        {orders.length > 0 ? (
                            orders.map((order, i) => (
                                <div key={i} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Package className="text-white" size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg">Order #{order.orderNumber}</div>
                                                <div className="text-gray-400 text-sm mt-1">
                                                    {order.items.length} items • Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </div>
                                                <div className="text-2xl font-black mt-2">₹{order.totalAmount.toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-3">
                                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                                                order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                            <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition">
                                                View Details <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <div className="inline-block p-8 bg-gray-800/50 rounded-3xl border border-gray-700">
                                    <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 text-xl mb-2">No orders yet</p>
                                    <p className="text-gray-500 text-sm">Start shopping to see your orders here</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}