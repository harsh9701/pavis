import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {Link} from "react-router-dom";
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
    Truck,
    PackageCheck,
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
        setLoading(false);
        setProducts([
            {
                _id: "prod_001",
                productName: "Wireless Mechanical Keyboard",
                sku: "KEY-WM-001",
                category: "electronics",
                subcategory: "computer-accessories",
                description: "Premium wireless mechanical keyboard with RGB lighting and programmable keys. Features brown switches for tactile feedback.",
                unitPrice: 89.99,
                bulkPricing: [
                    { quantity: 10, price: 84.99 },
                    { quantity: 25, price: 79.99 },
                    { quantity: 50, price: 74.99 }
                ],
                taxable: true,
                dimensions: { length: 45, width: 15, height: 3 },
                color: "Black",
                material: "Plastic, Aluminum",
                minimumOrderQuantity: 1,
                status: "active",
                stockQuantity: 125,
                mainImage: {
                    url: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    name: "keyboard.jpg"
                },
                additionalImages: [
                    {
                        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                        name: "keyboard-angle.jpg"
                    }
                ],
                createdAt: "2023-05-15T08:30:00Z",
                updatedAt: "2023-07-20T14:22:00Z"
            },
            {
                _id: "prod_002",
                productName: "Industrial Air Compressor",
                sku: "COMP-AIR-205",
                category: "machinery",
                subcategory: "air-tools",
                description: "Heavy-duty industrial air compressor with 5HP motor and 60-gallon tank. Suitable for continuous operation in manufacturing environments.",
                unitPrice: 1249.99,
                bulkPricing: [
                    { quantity: 3, price: 1199.99 },
                    { quantity: 5, price: 1149.99 }
                ],
                taxable: true,
                dimensions: { length: 120, width: 60, height: 90 },
                color: "Blue",
                material: "Steel",
                minimumOrderQuantity: 1,
                status: "dispatched",
                stockQuantity: 8,
                mainImage: {
                    url: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    name: "compressor.jpg"
                },
                additionalImages: [],
                createdAt: "2023-06-10T11:15:00Z",
                updatedAt: "2023-08-05T09:45:00Z"
            },
            {
                _id: "prod_003",
                productName: "Executive Office Chair",
                sku: "FURN-CHAIR-EXEC",
                category: "office-supplies",
                subcategory: "furniture",
                description: "Ergonomic executive office chair with lumbar support, adjustable height, and premium leather upholstery.",
                unitPrice: 349.99,
                bulkPricing: [
                    { quantity: 5, price: 329.99 },
                    { quantity: 10, price: 299.99 }
                ],
                taxable: true,
                dimensions: { length: 65, width: 65, height: 120 },
                color: "Brown",
                material: "Leather, Steel, Plastic",
                minimumOrderQuantity: 1,
                status: "delivered",
                stockQuantity: 35,
                mainImage: {
                    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    name: "office-chair.jpg"
                },
                additionalImages: [
                    {
                        url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                        name: "chair-side.jpg"
                    }
                ],
                createdAt: "2023-04-22T14:30:00Z",
                updatedAt: "2023-07-18T16:20:00Z"
            },
            {
                _id: "prod_004",
                productName: "Stainless Steel Bolts (50pk)",
                sku: "HARD-BOLT-SS50",
                category: "raw-materials",
                subcategory: "fasteners",
                description: "High-quality stainless steel bolts, 50-piece set. Corrosion-resistant and suitable for outdoor applications.",
                unitPrice: 24.99,
                bulkPricing: [
                    { quantity: 10, price: 22.99 },
                    { quantity: 25, price: 19.99 },
                    { quantity: 100, price: 16.99 }
                ],
                taxable: false,
                dimensions: { length: 5, width: 5, height: 2 },
                color: "Silver",
                material: "Stainless Steel",
                minimumOrderQuantity: 5,
                status: "active",
                stockQuantity: 420,
                mainImage: {
                    url: "https://images.unsplash.com/photo-1618941719405-5c0ba6b0bb13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    name: "bolts.jpg"
                },
                additionalImages: [],
                createdAt: "2023-07-01T09:45:00Z",
                updatedAt: "2023-08-12T11:30:00Z"
            },
            {
                _id: "prod_005",
                productName: "Cordless Drill Kit",
                sku: "TOOL-DRILL-20V",
                category: "tools",
                subcategory: "power-tools",
                description: "20V Lithium-Ion cordless drill kit with 2 batteries, charger, and carrying case. Includes various drill bits and accessories.",
                unitPrice: 159.99,
                bulkPricing: [
                    { quantity: 3, price: 149.99 },
                    { quantity: 5, price: 139.99 }
                ],
                taxable: true,
                dimensions: { length: 35, width: 25, height: 15 },
                color: "Black & Yellow",
                material: "Plastic, Metal",
                minimumOrderQuantity: 1,
                status: "inactive",
                stockQuantity: 0,
                mainImage: {
                    url: "https://images.unsplash.com/photo-1572981779307-38f8b02b6291?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    name: "drill-kit.jpg"
                },
                additionalImages: [
                    {
                        url: "https://images.unsplash.com/photo-1597709037495-4b0e5b6f4c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                        name: "drill-closeup.jpg"
                    }
                ],
                createdAt: "2023-03-10T16:20:00Z",
                updatedAt: "2023-08-10T10:15:00Z"
            },
            {
                _id: "prod_006",
                productName: "Project Management Software License",
                sku: "SOFT-PM-PRO",
                category: "software",
                subcategory: "business-software",
                description: "Enterprise project management software with team collaboration tools, Gantt charts, and resource management features.",
                unitPrice: 499.99,
                bulkPricing: [
                    { quantity: 5, price: 449.99 },
                    { quantity: 10, price: 399.99 },
                    { quantity: 20, price: 349.99 }
                ],
                taxable: true,
                dimensions: { length: 0, width: 0, height: 0 },
                color: "N/A",
                material: "Digital",
                minimumOrderQuantity: 1,
                status: "active",
                stockQuantity: 999,
                mainImage: {
                    url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    name: "software.jpg"
                },
                additionalImages: [],
                createdAt: "2023-05-05T13:40:00Z",
                updatedAt: "2023-08-15T14:25:00Z"
            },
            {
                _id: "prod_007",
                productName: "Industrial Workbench",
                sku: "FURN-BENCH-INDL",
                category: "tools",
                subcategory: "workstation",
                description: "Heavy-duty steel workbench with wood top, drawers, and tool storage. Perfect for workshop or garage.",
                unitPrice: 429.99,
                bulkPricing: [
                    { quantity: 2, price: 409.99 },
                    { quantity: 5, price: 389.99 }
                ],
                taxable: true,
                dimensions: { length: 180, width: 60, height: 90 },
                color: "Gray",
                material: "Steel, Wood",
                minimumOrderQuantity: 1,
                status: "active",
                stockQuantity: 12,
                mainImage: {
                    url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    name: "workbench.jpg"
                },
                additionalImages: [],
                createdAt: "2023-06-28T10:15:00Z",
                updatedAt: "2023-08-14T09:30:00Z"
            },
            {
                _id: "prod_008",
                productName: "Copper Wire Spool (100m)",
                sku: "MAT-WIRE-CU100",
                category: "raw-materials",
                subcategory: "electrical",
                description: "100-meter spool of high-quality copper electrical wire. 2.5mm diameter, suitable for residential and commercial applications.",
                unitPrice: 89.99,
                bulkPricing: [
                    { quantity: 5, price: 84.99 },
                    { quantity: 10, price: 79.99 }
                ],
                taxable: false,
                dimensions: { length: 25, width: 25, height: 10 },
                color: "Copper",
                material: "Copper, PVC",
                minimumOrderQuantity: 2,
                status: "dispatched",
                stockQuantity: 18,
                mainImage: {
                    url: "https://images.unsplash.com/photo-1605108721178-97a9514c0b9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    name: "copper-wire.jpg"
                },
                additionalImages: [],
                createdAt: "2023-07-15T14:50:00Z",
                updatedAt: "2023-08-16T12:45:00Z"
            }
        ]);
        // try {
        //     setLoading(true);
        //     // const response = await axios.get("/api/products");
        //     setProducts(response.data);
        // } catch (error) {
        //     toast.error("Failed to fetch products");
        //     console.error("Error fetching products:", error);
        // } finally {
        //     setLoading(false);
        // }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`/api/products/${productId}`);
            toast.success("Product deleted successfully");
            fetchProducts(); // Refresh the list
        } catch (error) {
            toast.error("Failed to delete product");
            console.error("Error deleting product:", error);
        }
    };

    const handleStatusChange = async (productId, newStatus) => {
        try {
            await axios.patch(`/api/products/${productId}`, { status: newStatus });
            toast.success("Product status updated");
            fetchProducts(); // Refresh the list
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
        try {
            await axios.put(`/api/products/${editingProduct._id}`, editingProduct);
            toast.success("Product updated successfully");
            setShowEditModal(false);
            fetchProducts(); // Refresh the list
        } catch (error) {
            toast.error("Failed to update product");
            console.error("Error updating product:", error);
        }
    };

    // Filter products based on search term and filters
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'inactive': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'dispatched': return <Truck className="h-4 w-4 text-blue-500" />;
            case 'delivered': return <PackageCheck className="h-4 w-4 text-purple-500" />;
            default: return <Package className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-500';
            case 'inactive': return 'bg-yellow-500/10 text-yellow-500';
            case 'dispatched': return 'bg-blue-500/10 text-blue-500';
            case 'delivered': return 'bg-purple-500/10 text-purple-500';
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
                                            <option value="dispatched">Dispatched</option>
                                            <option value="delivered">Delivered</option>
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
                                                    Stock
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
                                                                    src={product.mainImage?.url || '/placeholder-image.jpg'}
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
                                                        <div className="text-sm text-gray-300">{product.stockQuantity || 0} units</div>
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
                                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                                                title="Edit product"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(product._id)}
                                                                className="text-red-400 hover:text-red-300 transition-colors"
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
                                                                    <option value="dispatched">Dispatched</option>
                                                                    <option value="delivered">Delivered</option>
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
                                    className="text-gray-400 hover:text-white"
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
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            SKU
                                        </label>
                                        <input
                                            type="text"
                                            value={editingProduct.sku}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
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
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
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
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Stock Quantity
                                        </label>
                                        <input
                                            type="number"
                                            value={editingProduct.stockQuantity || 0}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, stockQuantity: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={editingProduct.status}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="dispatched">Dispatched</option>
                                            <option value="delivered">Delivered</option>
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