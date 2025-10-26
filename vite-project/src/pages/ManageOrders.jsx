import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import {
    Plus,
    X,
    Edit,
    Trash2,
    Package,
    Settings,
    Menu,
    TrendingUp,
    UserCheck,
    Search,
    Users,
    ShoppingCart,
    Eye,
    Calendar,
    LayoutGrid,
    Filter,
    Download,
    CheckCircle,
    Clock,
    XCircle,
    Truck
} from 'lucide-react';
import axios from "axios";

const ManageOrders = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const navigationItems = [
        { name: 'Dashboard', icon: TrendingUp, path: "/admin" },
        { name: 'Add Product', icon: Plus, path: "/add-product" },
        { name: 'Products', icon: Package, path: "/manage-products" },
        { name: 'Customers', icon: Users, path: "/manage-customers" },
        { name: 'Categories', icon: LayoutGrid, path: "/manage-categories" },
        { name: 'Orders', icon: ShoppingCart, active: true, path: "/manage-orders" },
        { name: 'Settings', icon: Settings, path: "/admin-setting" }
    ];

    const orderStatuses = [
        { value: 'pending', label: 'Pending', color: 'yellow', icon: Clock },
        { value: 'confirmed', label: 'Confirmed', color: 'blue', icon: CheckCircle },
        { value: 'processing', label: 'Processing', color: 'purple', icon: Package },
        { value: 'shipped', label: 'Shipped', color: 'indigo', icon: Truck },
        { value: 'delivered', label: 'Delivered', color: 'green', icon: CheckCircle },
        { value: 'cancelled', label: 'Cancelled', color: 'red', icon: XCircle }
    ];

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/admin/orders");
            if (response.status === 200) {
                setOrders(response.data.orders);
                setLoading(false);
            }
        } catch (error) {
            toast.error("Failed to fetch orders");
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setUpdatingStatus(true);
            const response = await axios.patch(`/admin/orders/${orderId}/status`, {
                status: newStatus
            });

            if (response.status === 200) {
                toast.success("Order status updated successfully");
                fetchOrders();
                setShowStatusModal(false);
            }
        } catch (error) {
            toast.error("Failed to update order status");
            console.error("Error updating status:", error);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowDetailsModal(true);
    };

    const handleUpdateStatus = (order) => {
        setSelectedOrder(order);
        setShowStatusModal(true);
    };

    const handleExportOrders = () => {
        toast.success("Exporting orders...");
        // Implement export functionality
    };

    const getStatusBadge = (status) => {
        const statusConfig = orderStatuses.find(s => s.value === status) || orderStatuses[0];
        const colorClasses = {
            yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
            green: 'bg-green-500/10 text-green-400 border-green-500/20',
            red: 'bg-red-500/10 text-red-400 border-red-500/20'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorClasses[statusConfig.color]}`}>
                <statusConfig.icon className="h-3 w-3 mr-1" />
                {statusConfig.label}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter orders based on search term and filters
    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        let matchesDate = true;
        if (dateFilter !== 'all') {
            const orderDate = new Date(order.createdAt);
            const today = new Date();
            const daysDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));

            switch (dateFilter) {
                case 'today':
                    matchesDate = daysDiff === 0;
                    break;
                case 'week':
                    matchesDate = daysDiff <= 7;
                    break;
                case 'month':
                    matchesDate = daysDiff <= 30;
                    break;
                default:
                    matchesDate = true;
            }
        }

        return matchesSearch && matchesStatus && matchesDate;
    });

    // Calculate statistics
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        totalRevenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold text-white">B2B Admin</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-8">
                    {navigationItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${item.active
                                ? 'bg-gray-700 text-white border-r-2 border-blue-500'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 lg:left-64 bg-gray-800 border-b border-gray-700 z-40 h-16 flex items-center justify-between px-6">
                    <div className="flex items-center justify-between h-16 px-6 w-full">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-semibold text-white">Manage Orders</h2>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleExportOrders}
                                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </button>
                            <div className="bg-gray-700 p-2 rounded-full">
                                <ShoppingCart className="h-5 w-5 text-gray-300" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="py-8 mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Total Orders</p>
                                        <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                                    </div>
                                    <ShoppingCart className="h-8 w-8 text-blue-400" />
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Pending</p>
                                        <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</p>
                                    </div>
                                    <Clock className="h-8 w-8 text-yellow-400" />
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Processing</p>
                                        <p className="text-2xl font-bold text-purple-400 mt-1">{stats.processing}</p>
                                    </div>
                                    <Package className="h-8 w-8 text-purple-400" />
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Delivered</p>
                                        <p className="text-2xl font-bold text-green-400 mt-1">{stats.delivered}</p>
                                    </div>
                                    <CheckCircle className="h-8 w-8 text-green-400" />
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Revenue</p>
                                        <p className="text-2xl font-bold text-green-400 mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-green-400" />
                                </div>
                            </div>
                        </div>

                        {/* Filters and Search */}
                        <div className="mb-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by order ID, customer..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    >
                                        <option value="all">All Status</option>
                                        {orderStatuses.map(status => (
                                            <option key={status.value} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    >
                                        <option value="all">All Time</option>
                                        <option value="today">Today</option>
                                        <option value="week">This Week</option>
                                        <option value="month">This Month</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Orders Table */}
                        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : filteredOrders.length === 0 ? (
                                <div className="text-center py-16">
                                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-white">No orders found</h3>
                                    <p className="mt-2 text-gray-400">Try adjusting your search or filter criteria</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead className="bg-gray-750">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Order Number
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Customer
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Items
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Amount
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                                            {filteredOrders.map((order) => (
                                                <tr key={order.orderId} className="hover:bg-gray-750 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-white">#{order.orderNumber}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="relative group">
                                                                <div className="text-sm font-medium text-white">{order.fullName}</div>
                                                                {/* Name tooltip */}
                                                                <div className="absolute left-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-center">
                                                                    <div>{order.email || 'Email Not Exist'}</div>
                                                                    <div>{order.contactNo || 'Contact Not Exist'}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center text-sm text-gray-300">
                                                            <Calendar className="h-3 w-3 mr-1" />
                                                            {formatDate(order.createdAt)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-300">{order.orderItemsCount || 0} items</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-white">₹{order.grandTotal?.toLocaleString()}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(order.status)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end items-center space-x-2">
                                                            <button
                                                                onClick={() => handleViewDetails(order)}
                                                                className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                                                                title="View details"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateStatus(order)}
                                                                className="text-green-400 hover:text-green-300 transition-colors cursor-pointer"
                                                                title="Update status"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-gray-400">
                                Showing {filteredOrders.length} of {orders.length} orders
                            </div>
                        </div>
                    </div>
                </main>

                {/* Order Details Modal */}
                {showDetailsModal && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b border-gray-700">
                                <h3 className="text-xl font-semibold text-white">Order Details - #{selectedOrder.orderId}</h3>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Order Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Customer</label>
                                            <p className="text-white mt-1">{selectedOrder.customer?.companyName}</p>
                                            <p className="text-sm text-gray-400">{selectedOrder.customer?.email}</p>
                                            <p className="text-sm text-gray-400">{selectedOrder.customer?.contactNo}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Order Date</label>
                                            <p className="text-white mt-1">{formatDate(selectedOrder.createdAt)}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Status</label>
                                            <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                {selectedOrder.shippingAddress && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400">Shipping Address</label>
                                        <p className="text-white mt-1">{selectedOrder.shippingAddress}</p>
                                    </div>
                                )}

                                {/* Order Items */}
                                <div className="border-t border-gray-700 pt-4">
                                    <label className="block text-sm font-medium text-gray-400 mb-3">Order Items</label>
                                    <div className="space-y-3">
                                        {selectedOrder.items?.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center bg-gray-750 p-4 rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-12 w-12 bg-gray-700 rounded-lg flex items-center justify-center">
                                                        <Package className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{item.productName}</p>
                                                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-white font-medium">₹{item.price?.toLocaleString()}</p>
                                                    <p className="text-sm text-gray-400">Total: ₹{(item.price * item.quantity)?.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="border-t border-gray-700 pt-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-gray-300">
                                            <span>Subtotal</span>
                                            <span>₹{selectedOrder.subtotal?.toLocaleString()}</span>
                                        </div>
                                        {selectedOrder.tax > 0 && (
                                            <div className="flex justify-between text-gray-300">
                                                <span>Tax</span>
                                                <span>₹{selectedOrder.tax?.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {selectedOrder.shipping > 0 && (
                                            <div className="flex justify-between text-gray-300">
                                                <span>Shipping</span>
                                                <span>₹{selectedOrder.shipping?.toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-gray-700">
                                            <span>Total</span>
                                            <span>₹{selectedOrder.totalAmount?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                                    <button
                                        onClick={() => {
                                            setShowDetailsModal(false);
                                            handleUpdateStatus(selectedOrder);
                                        }}
                                        className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                    >
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Update Status Modal */}
                {showStatusModal && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 max-w-md w-full">
                            <div className="flex items-center justify-between p-6 border-b border-gray-700">
                                <h3 className="text-xl font-semibold text-white">Update Order Status</h3>
                                <button
                                    onClick={() => setShowStatusModal(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">
                                        Current Status: {getStatusBadge(selectedOrder.status)}
                                    </label>
                                    <p className="text-sm text-gray-400 mb-4">Select new status for order #{selectedOrder.orderId}</p>
                                </div>

                                <div className="space-y-2">
                                    {orderStatuses.map((status) => (
                                        <button
                                            key={status.value}
                                            onClick={() => handleStatusChange(selectedOrder._id, status.value)}
                                            disabled={updatingStatus || selectedOrder.status === status.value}
                                            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${selectedOrder.status === status.value
                                                ? 'bg-gray-700 border-gray-600 cursor-not-allowed opacity-50'
                                                : 'bg-gray-750 border-gray-600 hover:border-blue-500 hover:bg-gray-700 cursor-pointer'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <status.icon className={`h-5 w-5 text-${status.color}-400`} />
                                                <span className="text-white font-medium">{status.label}</span>
                                            </div>
                                            {selectedOrder.status === status.value && (
                                                <CheckCircle className="h-5 w-5 text-green-400" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                                    <button
                                        onClick={() => setShowStatusModal(false)}
                                        className="px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
                                        disabled={updatingStatus}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default ManageOrders;