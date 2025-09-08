import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        await logout().then(response => {
            if (response == 200) {
                navigate("/");
            }
        }).catch(err => {
            console.log(err);
            navigate("/");
        });
    }

    return (
        <header className="bg-white shadow-lg border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo.svg"
                            alt="CheckMeOut Logo"
                            className="h-10 md:h-12 w-auto"
                        />
                    </Link>

                    {/* Search Bar (hidden on mobile) */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products, brands, categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                7
                            </span>
                        </Link>
                        {user ? (
                            <button className="flex items-center space-x-2 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 pointer"
                                onClick={handleLogout}>
                                <User className="w-6 h-6" />
                                <span className="font-medium">Logout</span>
                            </button>
                        ) : (
                            <Link to="/login" className="flex items-center space-x-2 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200">
                                <User className="w-6 h-6" />
                                <span className="font-medium">Login</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen
                ? 'max-h-48 opacity-100'
                : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                <div className="bg-white border-t border-gray-100 shadow-lg">
                    <div className="px-4 py-6 space-y-6">
                        {/* Mobile Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            />
                        </div>

                        {/* Mobile Actions */}
                        <div className="space-y-3">
                            <Link className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <ShoppingCart className="w-6 h-6" />
                                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                            7
                                        </span>
                                    </div>
                                    <span className="font-medium">Shopping Cart</span>
                                </div>
                                <div className="text-sm text-gray-500">7 items</div>
                            </Link>

                            {user ? (
                                <button className="flex items-center w-full p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group pointer"
                                    onClick={handleLogout}>
                                    <div className="flex items-center space-x-4">
                                        <User className="w-6 h-6" />
                                        <span className="font-medium">Logout</span>
                                    </div>
                                </button>
                            ) : (
                                <Link to="/login" className="flex items-center w-full p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group">
                                    <div className="flex items-center space-x-4">
                                        <User className="w-6 h-6" />
                                        <span className="font-medium">Login</span>
                                    </div>
                                </Link>
                            )}
                        </div>

                        {/* Quick Links */}
                        <div className="border-t border-gray-100 pt-4">
                            <div className="grid grid-cols-2 gap-3">
                                <button className="p-3 text-center text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                                    <span className="text-sm font-medium">Orders</span>
                                </button>
                                <button className="p-3 text-center text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                                    <span className="text-sm font-medium">Wishlist</span>
                                </button>
                                <button className="p-3 text-center text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                                    <span className="text-sm font-medium">Support</span>
                                </button>
                                <button className="p-3 text-center text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                                    <span className="text-sm font-medium">Settings</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}