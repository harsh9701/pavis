import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {
    Users,
    ShoppingCart,
    IndianRupee,
    Package,
    Plus,
    Settings,
    Menu,
    X,
    TrendingUp,
    UserCheck
} from 'lucide-react';

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Sample data - replace with your actual data
    const stats = {
        totalOrders: 1247,
        totalCustomers: 89,
        totalOrderValue: 156789,
        activeProducts: 234,
        pendingOrders: 23,
        monthlyGrowth: 12.5
    };

    const navigationItems = [
        { name: 'Dashboard', icon: TrendingUp, active: true, path: "/admin" },
        { name: 'Add Product', icon: Plus, path: "/add-product" },
        { name: 'Manage Products', icon: Package, path: "/manage-products" },
        { name: 'Manage Customers', icon: Users, path: "/manage-customers" },
        { name: 'Orders', icon: ShoppingCart, path: "/manage-orders" },
        { name: 'Settings', icon: Settings, path: "/admin-setting" }
    ];

    const StatCard = ({ title, value, icon: Icon, subtitle, trend }) => (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-white mt-2">{value}</p>
                    {subtitle && (
                        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                    )}
                </div>
                <div className="bg-gray-700 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-blue-400" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm font-medium">+{trend}%</span>
                    <span className="text-gray-500 text-sm ml-1">from last month</span>
                </div>
            )}
        </div>
    );

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
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex items-center space-x-4">
                        <h2 className="text-xl font-semibold text-white">Dashboard Overview</h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-700 p-2 rounded-full">
                            <UserCheck className="h-5 w-5 text-gray-300" />
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="p-6 pt-24">
                    {/* Stats grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Total Orders"
                            value={stats.totalOrders.toLocaleString()}
                            icon={ShoppingCart}
                            subtitle={`${stats.pendingOrders} pending`}
                            trend={stats.monthlyGrowth}
                        />

                        <StatCard
                            title="Total Customers"
                            value={stats.totalCustomers}
                            icon={Users}
                            subtitle="Active customers"
                        />

                        <StatCard
                            title="Total Order Value"
                            value={`$${stats.totalOrderValue.toLocaleString()}`}
                            icon={IndianRupee}
                            subtitle="This month"
                            trend={8.2}
                        />

                        <StatCard
                            title="Active Products"
                            value={stats.activeProducts}
                            icon={Package}
                            subtitle="In inventory"
                        />

                        <StatCard
                            title="Pending Orders"
                            value={stats.pendingOrders}
                            icon={ShoppingCart}
                            subtitle="Needs attention"
                        />

                        <StatCard
                            title="Monthly Growth"
                            value={`${stats.monthlyGrowth}%`}
                            icon={TrendingUp}
                            subtitle="Revenue increase"
                        />
                    </div>

                    {/* Quick actions */}
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link to="/add-product" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                                <Plus className="h-4 w-4" />
                                <span>Add Product</span>
                            </Link>

                            <Link to="/manage-products" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                                <Package className="h-4 w-4" />
                                <span>Manage Products</span>
                            </Link>

                            <Link to="/manage-customers" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>Manage Customers</span>
                            </Link>

                            <Link to="/manage-orders" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                                <ShoppingCart className="h-4 w-4" />
                                <span>View Orders</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent activity placeholder */}
                    <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-600 p-1 rounded-full">
                                        <ShoppingCart className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-gray-300">New order #1247 received</span>
                                </div>
                                <span className="text-gray-500 text-sm">2 min ago</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-600 p-1 rounded-full">
                                        <Users className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-gray-300">New customer registered</span>
                                </div>
                                <span className="text-gray-500 text-sm">5 min ago</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-yellow-600 p-1 rounded-full">
                                        <Package className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-gray-300">Product stock updated</span>
                                </div>
                                <span className="text-gray-500 text-sm">10 min ago</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;