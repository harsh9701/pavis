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
    Filter,
    CheckCircle,
    Clock,
    Users,
    ShoppingCart,
    Eye,
    Mail,
    Phone,
    Star,
    XCircle,
    User
} from 'lucide-react';
import axios from "axios";

const ManageCustomers = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const navigationItems = [
        { name: 'Dashboard', icon: TrendingUp, path: "/admin" },
        { name: 'Add Product', icon: Plus, path: "/add-product" },
        { name: 'Manage Products', icon: Package, path: "/manage-products" },
        { name: 'Manage Customers', icon: Users, active: true, path: "/manage-customers" },
        { name: 'Orders', icon: ShoppingCart, path: "/manage-orders" },
        { name: 'Settings', icon: Settings, path: "/admin-setting" }
    ];

    // Mock data for customers (replace with actual API call)
    const mockCustomers = [
        {
            _id: "1",
            companyName: "Tech Solutions Ltd",
            contactPerson: "John Doe",
            email: "john@techsolutions.com",
            phone: "+91-9876543210",
            address: "123 Business Park, Delhi",
            customerType: "premium",
            status: "active",
            registrationDate: "2024-01-15",
            totalOrders: 25,
            totalSpent: 125000,
            lastOrderDate: "2024-03-10",
            creditLimit: 50000,
            rating: 4.8
        },
        {
            _id: "2",
            companyName: "Global Manufacturing Co",
            contactPerson: "Sarah Johnson",
            email: "sarah@globalmanuf.com",
            phone: "+91-8765432109",
            address: "456 Industrial Area, Mumbai",
            customerType: "standard",
            status: "active",
            registrationDate: "2024-02-20",
            totalOrders: 12,
            totalSpent: 75000,
            lastOrderDate: "2024-03-08",
            creditLimit: 25000,
            rating: 4.5
        },
        {
            _id: "3",
            companyName: "Smart Retail Chain",
            contactPerson: "Mike Wilson",
            email: "mike@smartretail.com",
            phone: "+91-7654321098",
            address: "789 Commercial Street, Bangalore",
            customerType: "premium",
            status: "inactive",
            registrationDate: "2023-11-05",
            totalOrders: 45,
            totalSpent: 200000,
            lastOrderDate: "2024-01-20",
            creditLimit: 75000,
            rating: 4.2
        },
        {
            _id: "4",
            companyName: "BuildPro Construction",
            contactPerson: "David Brown",
            email: "david@buildpro.com",
            phone: "+91-6543210987",
            address: "321 Builder's Hub, Chennai",
            customerType: "standard",
            status: "blocked",
            registrationDate: "2024-03-01",
            totalOrders: 3,
            totalSpent: 15000,
            lastOrderDate: "2024-03-05",
            creditLimit: 10000,
            rating: 3.8
        }
    ];

    // Fetch customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            // Replace with actual API call
            // const response = await axios.get("/admin/api/customers");
            // setCustomers(response.data.customers);

            // Using mock data for now
            setTimeout(() => {
                setCustomers(mockCustomers);
                setLoading(false);
            }, 1000);
        } catch (error) {
            toast.error("Failed to fetch customers");
            console.error("Error fetching customers:", error);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = async (customerId) => {
        setOpen(true);
        setSelectedCustomerId(customerId);
    };

    const handleStatusChange = async (customerId, newStatus) => {
        try {
            // await axios.patch(`/api/customers/${customerId}`, { status: newStatus });
            // Update local state
            setCustomers(customers.map(customer =>
                customer._id === customerId
                    ? { ...customer, status: newStatus }
                    : customer
            ));
            toast.success("Customer status updated");
        } catch (error) {
            toast.error("Failed to update customer status");
            console.error("Error updating customer status:", error);
        }
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // await axios.put(`/api/customers/${editingCustomer._id}`, editingCustomer);
            // Update local state
            setCustomers(customers.map(customer =>
                customer._id === editingCustomer._id
                    ? editingCustomer
                    : customer
            ));
            toast.success("Customer updated successfully");
            setShowEditModal(false);
        } catch (error) {
            toast.error("Failed to update customer");
            console.error("Error updating customer:", error);
        }
    };

    const handleViewDetails = (customer) => {
        setSelectedCustomer(customer);
        setShowDetailsModal(true);
    };

    const handleViewOrders = (customerId) => {
        // Navigate to orders page with customer filter
        // window.location.href = `/manage-orders?customer=${customerId}`;
        toast.success("Redirecting to customer orders...");
    };

    // Filter customers based on search term and filters
    const filteredCustomers = customers.filter(customer => {
        const matchesSearch =
            customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
        const matchesType = typeFilter === 'all' || customer.customerType === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'inactive': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'blocked': return <XCircle className="h-4 w-4 text-red-500" />;
            default: return <User className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-500';
            case 'inactive': return 'bg-yellow-500/10 text-yellow-500';
            case 'blocked': return 'bg-red-500/10 text-red-500';
            default: return 'bg-gray-500/10 text-gray-500';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'premium': return 'bg-purple-500/10 text-purple-500';
            case 'standard': return 'bg-blue-500/10 text-blue-500';
            default: return 'bg-gray-500/10 text-gray-500';
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
            />
        ));
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
                            <h2 className="text-xl font-semibold text-white">Manage Customers</h2>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-700 p-2 rounded-full">
                                <UserCheck className="h-5 w-5 text-gray-300" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="py-8 mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Filters and Search */}
                        <div className="mb-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="text"
                                        placeholder="Search customers by company, name, or email..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-5 w-5 text-gray-400" />
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="blocked">Blocked</option>
                                        </select>
                                    </div>

                                    <select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="premium">Premium</option>
                                        <option value="standard">Standard</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Customers Table */}
                        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : filteredCustomers.length === 0 ? (
                                <div className="text-center py-16">
                                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-white">No customers found</h3>
                                    <p className="mt-2 text-gray-400">Try adjusting your search or filter criteria</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead className="bg-gray-750">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Company
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Contact
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Orders
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Total Spent
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Rating
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
                                            {filteredCustomers.map((customer) => (
                                                <tr key={customer._id} className="hover:bg-gray-750 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                                    <span className="text-sm font-bold text-white">
                                                                        {customer.companyName.charAt(0)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-white">{customer.companyName}</div>
                                                                <div className="text-sm text-gray-400">{customer.contactPerson}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-300">
                                                            <div className="flex items-center">
                                                                <Mail className="h-3 w-3 mr-1" />
                                                                {customer.email}
                                                            </div>
                                                            <div className="flex items-center mt-1">
                                                                <Phone className="h-3 w-3 mr-1" />
                                                                {customer.phone}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(customer.customerType)}`}>
                                                            <span className="capitalize">{customer.customerType}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-300">{customer.totalOrders} orders</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-300">₹{customer.totalSpent.toLocaleString()}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {renderStars(customer.rating)}
                                                            <span className="ml-1 text-xs text-gray-400">{customer.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                                                            {getStatusIcon(customer.status)}
                                                            <span className="ml-1 capitalize">{customer.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end items-center space-x-2">
                                                            <button
                                                                onClick={() => handleViewDetails(customer)}
                                                                className="text-green-400 hover:text-green-300 transition-colors"
                                                                title="View details"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleViewOrders(customer._id)}
                                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                                                title="View orders"
                                                            >
                                                                <ShoppingCart className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleEdit(customer)}
                                                                className="text-yellow-400 hover:text-yellow-300 transition-colors"
                                                                title="Edit customer"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(customer._id)}
                                                                className="text-Red-400 hover:text-red-300 transition-colors"
                                                                title="Delete customer"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
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
                                Showing {filteredCustomers.length} of {customers.length} customers
                            </div>
                        </div>
                    </div>
                </main>

                {/* Customer Details Modal */}
                {showDetailsModal && selectedCustomer && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b border-gray-700">
                                <h3 className="text-xl font-semibold text-white">Customer Details</h3>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Company Name</label>
                                            <p className="text-white mt-1">{selectedCustomer.companyName}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Contact Person</label>
                                            <p className="text-white mt-1">{selectedCustomer.contactPerson}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Email</label>
                                            <p className="text-white mt-1">{selectedCustomer.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Phone</label>
                                            <p className="text-white mt-1">{selectedCustomer.phone}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Customer Type</label>
                                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getTypeColor(selectedCustomer.customerType)}`}>
                                                <span className="capitalize">{selectedCustomer.customerType}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Status</label>
                                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedCustomer.status)}`}>
                                                {getStatusIcon(selectedCustomer.status)}
                                                <span className="ml-1 capitalize">{selectedCustomer.status}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Credit Limit</label>
                                            <p className="text-white mt-1">₹{selectedCustomer.creditLimit.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400">Rating</label>
                                            <div className="flex items-center mt-1">
                                                {renderStars(selectedCustomer.rating)}
                                                <span className="ml-2 text-white">{selectedCustomer.rating}/5</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Address</label>
                                    <p className="text-white mt-1">{selectedCustomer.address}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-700">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400">Total Orders</label>
                                        <p className="text-2xl font-bold text-white mt-1">{selectedCustomer.totalOrders}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400">Total Spent</label>
                                        <p className="text-2xl font-bold text-green-400 mt-1">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400">Last Order</label>
                                        <p className="text-white mt-1">{selectedCustomer.lastOrderDate}</p>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                                    <button
                                        onClick={() => handleViewOrders(selectedCustomer._id)}
                                        className="px-4 py-2 border border-blue-600 rounded-lg text-sm font-medium text-blue-400 bg-blue-600/10 hover:bg-blue-600/20 transition-colors"
                                    >
                                        View Orders
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowDetailsModal(false);
                                            handleEdit(selectedCustomer);
                                        }}
                                        className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                    >
                                        Edit Customer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Customer Modal */}
                {showEditModal && editingCustomer && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b border-gray-700">
                                <h3 className="text-xl font-semibold text-white">Edit Customer</h3>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editingCustomer.companyName}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, companyName: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Contact Person
                                        </label>
                                        <input
                                            type="text"
                                            value={editingCustomer.contactPerson}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, contactPerson: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={editingCustomer.email}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={editingCustomer.phone}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Customer Type
                                        </label>
                                        <select
                                            value={editingCustomer.customerType}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, customerType: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        >
                                            <option value="standard">Standard</option>
                                            <option value="premium">Premium</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={editingCustomer.status}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="blocked">Blocked</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Credit Limit (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={editingCustomer.creditLimit}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, creditLimit: parseInt(e.target.value) })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Rating
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            step="0.1"
                                            value={editingCustomer.rating}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, rating: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        value={editingCustomer.address}
                                        onChange={(e) => setEditingCustomer({ ...editingCustomer, address: e.target.value })}
                                        rows="3"
                                        className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                    >
                                        Update Customer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default ManageCustomers;