import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";
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
    ShoppingCart
} from 'lucide-react';
import axios from "axios";

const ManageProducts = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [editingProduct, setEditingProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const navigationItems = [
        { name: 'Dashboard', icon: TrendingUp, path: "/admin" },
        { name: 'Add Product', icon: Plus, path: "/add-product" },
        { name: 'Manage Products', icon: Package, active: true, path: "/manage-products" },
        { name: 'Manage Customers', icon: Users, path: "/manage-customers" },
        { name: 'Orders', icon: ShoppingCart, path: "/manage-orders" },
        { name: 'Settings', icon: Settings, path: "/admin-setting" }
    ];

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/product");
            setProducts(response.data.products);
        } catch (error) {
            toast.error("Failed to fetch products");
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // function to delete single product
    const handleDelete = async (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
        }).then(async (e) => {
            if (e.isConfirmed) {
                try {
                    await toast.promise(
                        axios.delete(`/product/delete/${productId}`),
                        {
                            loading: "Deleting product...",
                            success: "Product deleted successfully ✅",
                            error: "Failed to delete product ❌",
                        }
                    );

                    // ✅ Update local state instead of refetching
                    setProducts((prevProducts) =>
                        prevProducts.filter((product) => product._id !== productId)
                    );
                } catch (error) {
                    console.error("Error deleting product:", error);
                }
            }
        });
    };

    const handleStatusChange = async (productId, newStatus) => {
        try {
            toast.promise(
                axios.patch(`/product/updateStatus/${productId}`, { status: newStatus }),
                {
                    loading: "Updating product...",
                    success: "Status updated ✅",
                    error: "Failed to update product ❌",
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        // Update product in local state instead of refetching all
                        setProducts((prevProducts) =>
                            prevProducts.map((product) =>
                                product._id === productId
                                    ? { ...product, status: newStatus } // update status locally
                                    : product
                            )
                        );
                    }
                })
                .catch((error) => {
                    console.error("Error updating product:", error);
                });
        } catch (error) {
            toast.error("Failed to update product status");
            console.error("Error updating product status:", error);
        }
    };


    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (
            !editingProduct.productName?.trim() ||
            !editingProduct.category?.trim() ||
            !editingProduct.unitPrice ||
            !editingProduct.minimumOrderQuantity ||
            !editingProduct.taxRate ||
            !editingProduct.taxType ||
            !editingProduct.description?.trim() ||
            !editingProduct.status?.trim()
        ) {
            toast.error("Some fields are blank");
            return;
        }

        if (Number(editingProduct.unitPrice) <= 0) {
            toast.error("Unit price should be greater than 0");
            return;
        }

        if (Number(editingProduct.minimumOrderQuantity) <= 0) {
            toast.error("MOQ should be greater than 0");
            return;
        }

        try {
            toast.promise(
                axios.put(`/product/update/${editingProduct._id}`, editingProduct),
                {
                    loading: "Updating product...",
                    success: "Product updated successfully ✅",
                    error: "Failed to update product ❌",
                }
            )
                .then(() => {
                    setShowEditModal(false);
                    fetchProducts();
                })
                .catch((error) => {
                    console.error("Error updating product:", error);
                });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update product");
            console.error("Error updating product:", error);
        }
    };

    // Filter products based on search term and filters
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'inactive': return <Clock className="h-4 w-4 text-yellow-500" />;
            default: return <Package className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-500';
            case 'inactive': return 'bg-yellow-500/10 text-yellow-500';
            default: return 'bg-gray-500/10 text-gray-500';
        }
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
                            <h2 className="text-xl font-semibold text-white">Manage Products</h2>
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
                                        placeholder="Search products by name or SKU..."
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
                                        </select>
                                    </div>

                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="machinery">Machinery</option>
                                        <option value="office-supplies">Office Supplies</option>
                                        <option value="raw-materials">Raw Materials</option>
                                        <option value="tools">Tools & Equipment</option>
                                        <option value="software">Software</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Products Table */}
                        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="text-center py-16">
                                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-white">No products found</h3>
                                    <p className="mt-2 text-gray-400">Try adjusting your search or filter criteria</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead className="bg-gray-750">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    SKU
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    MOQ
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
                                            {filteredProducts.map((product) => (
                                                <tr key={product._id} className="hover:bg-gray-750 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img
                                                                    className="h-10 w-10 rounded-md object-cover"
                                                                    src={product.mainImage || '/placeholder-image.jpg'}
                                                                    alt={product.productName}
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-white">{product.productName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-300">{product.sku}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-300 capitalize">{product.category}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-300">₹{product.unitPrice}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-300">{product.minimumOrderQuantity || 0}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                                            {getStatusIcon(product.status)}
                                                            <span className="ml-1 capitalize">{product.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end items-center space-x-2">
                                                            <button
                                                                onClick={() => handleEdit(product)}
                                                                className="text-blue-400 hover:text-blue-300 transition-colors pointer"
                                                                title="Edit product"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(product._id)}
                                                                className="text-red-400 hover:text-red-300 transition-colors pointer"
                                                                title="Delete product"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                            <div className="relative inline-block text-left">
                                                                <select
                                                                    value={product.status}
                                                                    onChange={(e) => handleStatusChange(product._id, e.target.value)}
                                                                    className={`appearance-none ${getStatusColor(product.status)} border-none rounded-full px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
                                                                >
                                                                    <option value="active">Active</option>
                                                                    <option value="inactive">Inactive</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Pagination (optional) */}
                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-gray-400">
                                Showing {filteredProducts.length} of {products.length} products
                            </div>
                            {/* Add pagination controls here if needed */}
                        </div>
                    </div>
                </main>

                {/* Edit Product Modal */}
                {showEditModal && editingProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b border-gray-700">
                                <h3 className="text-xl font-semibold text-white">Edit Product</h3>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-400 hover:text-white pointer"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editingProduct.productName}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, productName: e.target.value })}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Category
                                        </label>
                                        <select
                                            value={editingProduct.category}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white pointer"
                                        >
                                            <option value="electronics">Electronics</option>
                                            <option value="machinery">Machinery</option>
                                            <option value="office-supplies">Office Supplies</option>
                                            <option value="raw-materials">Raw Materials</option>
                                            <option value="tools">Tools & Equipment</option>
                                            <option value="software">Software</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Unit Price (₹)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={editingProduct.unitPrice}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, unitPrice: e.target.value })}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            MOQ
                                        </label>
                                        <input
                                            type="number"
                                            step="1"
                                            value={editingProduct.minimumOrderQuantity}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, minimumOrderQuantity: e.target.value })}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Tax Rate
                                        </label>
                                        <select
                                            value={editingProduct.taxRate}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, taxRate: e.target.value })}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white pointer"
                                        >
                                            <option value="">Select Tax Rate</option>
                                            <option value="0">0 %</option>
                                            <option value="5">5 %</option>
                                            <option value="12">12 %</option>
                                            <option value="18">18 %</option>
                                            <option value="28">28 %</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Tax Type
                                        </label>
                                        <select
                                            value={editingProduct.taxType}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, taxType: e.target.value })}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white pointer"
                                        >
                                            <option value="">Select tax Type</option>
                                            <option value="inclusive">Inclusive</option>
                                            <option value="exclusive">Exclusive</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={editingProduct.description}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                        rows="4"
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                    />
                                </div>

                                <div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={editingProduct.status}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value })}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white pointer"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors pointer"
                                    >
                                        Update Product
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

export default ManageProducts;