import { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
    X,
    Plus,
    Edit,
    Trash2,
    ChevronDown,
    ChevronRight,
    TrendingUp,
    Package,
    Users,
    ShoppingCart,
    Menu,
    UserCheck,
    LayoutGrid,
    Earth
} from 'lucide-react';
import axios from "axios";

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);

    const fileInputRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({
        category: "",
        image: null
    });
    const [newSubcategory, setNewSubcategory] = useState("");
    const [expandedCategory, setExpandedCategory] = useState(null);

    const navigationItems = [
        { name: 'Dashboard', icon: TrendingUp, path: "/admin" },
        { name: 'Add Product', icon: Plus, path: "/add-product" },
        { name: 'Products', icon: Package, path: "/manage-products" },
        { name: 'Customers', icon: Users, path: "/manage-customers" },
        { name: 'Categories', icon: LayoutGrid, active: true, path: "/manage-categories" },
        { name: 'Orders', icon: ShoppingCart, path: "/manage-orders" },
        { name: 'Go to Website', icon: Earth, path: "/" }
    ];

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/admin/categories");
            setCategories(response.data.categories);
        } catch (error) {
            toast.error("Failed to fetch products");
            console.error("Error fetching products:", error);
        }
    };

    // Handle file selection with validation
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Only JPG, JPEG, WEBP and PNG files are allowed");
            e.target.value = "";
            setNewCategory(prev => ({
                ...prev,
                image: null
            }));
            return;
        }

        if (file.size > 3 * 1024 * 1024) { // 3MB limit
            toast.error("File size exceeds 3MB");
            e.target.value = "";
            setNewCategory(prev => ({
                ...prev,
                image: null
            }));
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setNewCategory(prev => ({
                ...prev,
                image: {
                    file: file,
                    url: event.target.result, // base64 string
                    name: file.name
                }
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleFileClick = (e) => {
        setNewCategory((prev) => ({ ...prev, image: null }));
        return;
    }

    const resetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // clear selected file
        }
    };

    const handleAddCategory = async (e) => {
        if (newCategory.category.trim() === "") {
            return toast.error("Category name should not be blank");
        }

        if (!newCategory.image) {
            return toast.error("Please upload category image");
        }

        try {
            toast.promise(
                axios.post("/admin/addCategory", newCategory, {
                    headers: { "Content-Type": "application/json" }
                }),
                {
                    loading: "Adding category...",
                    success: "Category Added 🎉",
                }
            ).then((response) => {
                if (response.status === 200) {
                    setNewCategory({
                        category: "",
                        image: null
                    });
                    setCategories((prev) => [...prev, response.data.category]);
                    resetFileInput();
                }
            }).catch((error) => {
                if (error.response) {
                    // ✅ express-validator errors
                    if (error.response.data.errors) {
                        error.response.data.errors.forEach((err) => {
                            toast.error(err.msg);
                        });
                    }
                    // ✅ custom backend message
                    else if (error.response.data.message) {
                        toast.error(error.response.data.message);
                    }
                    // fallback
                    else {
                        toast.error("Something went wrong 😢");
                    }
                } else {
                    toast.error("Server not reachable 🚨");
                }
            });
        } catch (err) {
            toast.error("Error adding category");
            console.error(err);
        }
    };

    // Add subcategory
    const handleAddSubcategory = (categoryId) => {
        if (!newSubcategory.trim()) return;

        const newSubcategoryData = {
            categoryId,
            newSubcategory
        }

        try {
            toast.promise(
                axios.post("/admin/addSubcategory", newSubcategoryData, {
                    headers: { "Content-Type": "application/json" }
                }),
                {
                    loading: "Adding Subcategory...",
                    success: "Subcategory Added 🎉"
                }
            ).then((response) => {
                if (response.status === 200) {
                    setCategories(
                        categories.map((cat) =>
                            cat._id === categoryId
                                ? {
                                    ...cat,
                                    subcategories: [...cat.subcategories, newSubcategory],
                                }
                                : cat
                        )
                    );
                }
            }).catch((error) => {
                if (error.response) {
                    // ✅ express-validator errors
                    if (error.response.data.errors) {
                        error.response.data.errors.forEach((err) => {
                            toast.error(err.msg);
                        });
                    }
                    // ✅ custom backend message
                    else if (error.response.data.message) {
                        toast.error(error.response.data.message);
                    }
                    // fallback
                    else {
                        toast.error("Something went wrong 😢");
                    }
                } else {
                    toast.error("Server not reachable 🚨");
                }
            });
        } catch (err) {
            toast.error("Error adding subcategory");
            console.error(err);
        } finally {
            setNewSubcategory("");
        }
    };

    // Delete category
    const handleDeleteCategory = (id) => {
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
                        axios.delete(`/admin/category/${id}`),
                        {
                            loading: "Deleting category...",
                            success: "category deleted successfully ✅",
                            error: "Failed to delete product ❌",
                        }
                    ).then((response) => {
                        if (response.status === 200) {
                            setCategories((prevCategory) =>
                                prevCategory.filter((cat) => cat._id !== id));
                        }
                    });
                } catch (error) {
                    console.error("Error deleting product:", error);
                }
            }
        });
    };

    // Delete subcategory
    const handleDeleteSubcategory = (categoryId, subIndex) => {

        const data = {
            categoryId,
            subIndex
        }

        toast.promise(
            axios.post(`/admin/deleteSubcategory`, data, {
                headers: { "Content-type": "application/json" }
            }),
            {
                loading: "Deleting Subcategory...",
                success: "Subcategory Deleted",
            }
        ).then((response) => {
            if (response.status === 200) {
                setCategories(
                    categories.map((cat) =>
                        cat._id === categoryId
                            ? {
                                ...cat,
                                subcategories: cat.subcategories.filter(
                                    (_, index) => index !== subIndex
                                ),
                            }
                            : cat
                    )
                );
            }
        })
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
                            <h2 className="text-xl font-semibold text-white">Manage Categories</h2>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-700 p-2 rounded-full">
                                <UserCheck className="h-5 w-5 text-gray-300" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="py-8 m-8 mt-16">
                    {/* Add category form */}
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
                        <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
                            <input
                                type="text"
                                value={newCategory.category}
                                onChange={(e) => setNewCategory((prev) => ({ ...prev, category: e.target.value }))}
                                placeholder="Category name"
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onClick={handleFileClick}
                                onChange={handleFileChange}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none pointer"
                            />
                            <button
                                onClick={handleAddCategory}
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex justify-center items-center space-x-2 pointer"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add</span>
                            </button>
                        </div>
                    </div>

                    {/* Category list */}
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>

                        {categories.length === 0 ? (
                            <p className="text-gray-400">No categories added yet.</p>
                        ) : (
                            <ul className="space-y-4">
                                {categories.map((cat) => (
                                    <li
                                        key={cat._id}
                                        className="bg-gray-700 rounded-lg p-4 border border-gray-600"
                                    >
                                        {/* Category header */}
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() =>
                                                        setExpandedCategory(
                                                            expandedCategory === cat._id ? null : cat._id
                                                        )
                                                    }
                                                    className="text-gray-400 hover:text-white pointer"
                                                >
                                                    {expandedCategory === cat._id ? (
                                                        <ChevronDown className="h-5 w-5" />
                                                    ) : (
                                                        <ChevronRight className="h-5 w-5" />
                                                    )}
                                                </button>

                                                {/* ✅ Show category image */}
                                                {cat.imageUrl && (
                                                    <img
                                                        src={cat.imageUrl}
                                                        alt={cat.name}
                                                        className="w-10 h-10 object-cover rounded-md border border-gray-500"
                                                    />
                                                )}

                                                <span className="font-medium">{cat.name}</span>
                                            </div>
                                            <div className="flex space-x-3">
                                                <button className="text-blue-400 hover:text-blue-500">
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(cat._id)}
                                                    className="text-red-400 hover:text-red-500 pointer"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subcategories */}
                                        {expandedCategory === cat._id && (
                                            <div className="mt-4 pl-8 space-y-2">
                                                {cat.subcategories.length > 0 ? (
                                                    cat.subcategories.map((sub, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between items-center bg-gray-600 rounded-lg px-3 py-2"
                                                        >
                                                            <span>{sub}</span>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteSubcategory(cat._id, index)
                                                                }
                                                                className="text-red-400 hover:text-red-500 pointer"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-400">No subcategories</p>
                                                )}

                                                {/* Add subcategory */}
                                                <div className="flex space-x-2 mt-2">
                                                    <input
                                                        type="text"
                                                        value={newSubcategory}
                                                        onChange={(e) => setNewSubcategory(e.target.value)}
                                                        placeholder="Subcategory name"
                                                        className="flex-1 px-3 py-2 rounded-lg bg-gray-600 text-white border border-gray-500 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => handleAddSubcategory(cat._id)}
                                                        className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm pointer"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </main>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default ManageCategories;