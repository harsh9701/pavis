import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    ShoppingCart,
    User,
    Menu,
    X,
    ArrowLeft,
    UserCircle,
    Settings,
    LogOut,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { cart, setCart } = useCart();
    const userMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close user menu when clicking outside (desktop)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        if (userMenuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [userMenuOpen]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    const handleLogout = async () => {
        try {
            const response = await logout();
            if (response.status === 200) {
                setCart([]);
                navigate("/");
            }
        } catch (err) {
            navigate("/");
        }
        setUserMenuOpen(false);
        setMenuOpen(false);
    };

    return (
        <>
            {/* ====== HEADER BAR ====== */}
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl shadow-lg" : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <img
                                src="/WholseraLogo.png"
                                alt="Wholsera Logo"
                                className="h-10 sm:h-12 w-auto"
                            />
                        </Link>

                        {/* Desktop Search Bar */}
                        <div className="hidden md:flex items-center w-[320px] lg:w-[460px] transition-all duration-300 rounded-full px-6 py-3 border bg-gradient-to-r from-[#1e2761] to-[#240046] border-purple-500/30">
                            <input
                                type="text"
                                placeholder="Bottles, Pen Holder, Bags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-white placeholder-white font-semibold text-sm"
                            />
                            <Search className="text-yellow-400 cursor-pointer" size={20} />
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/cart" className="relative">
                                <ShoppingCart
                                    className="text-yellow-400 hover:text-yellow-300 transition"
                                    size={24}
                                />
                            </Link>

                            {/* User Icon with Dropdown Menu */}
                            {user && (
                                <div className="relative" ref={userMenuRef}>
                                    <User
                                        className="text-yellow-400 hover:text-yellow-300 transition cursor-pointer"
                                        size={24}
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    />

                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-[#1e2761] to-[#240046] border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden">
                                            <div className="py-2">
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center space-x-3 px-4 py-3 text-gray-200 hover:bg-white/10 transition"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <UserCircle
                                                        size={20}
                                                        className="text-yellow-400"
                                                    />
                                                    <span className="font-medium">Profile</span>
                                                </Link>
                                                {user?.role === "admin" && (
                                                    <Link
                                                        to="/admin"
                                                        className="flex items-center space-x-3 px-4 py-3 text-gray-200 hover:bg-white/10 transition"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <UserCircle
                                                            size={20}
                                                            className="text-yellow-400"
                                                        />
                                                        <span className="font-medium">
                                                            Admin Panel
                                                        </span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex w-32 justify-between bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition cursor-pointer"
                                >
                                    <User size={22} />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Icons */}
                        <div className="flex items-center space-x-4 md:hidden">
                            <Link to="/cart">
                                <ShoppingCart
                                    className="text-yellow-400 cursor-pointer"
                                    size={22}
                                />
                            </Link>
                            <Search
                                className="text-yellow-400 cursor-pointer"
                                size={22}
                                onClick={() => setIsMobileSearchOpen(true)}
                            />
                            <button
                                className="text-white"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                {menuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ====== MOBILE SLIDE-IN MENU (Always rendered for smooth animation) ====== */}
            <>
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    onClick={() => setMenuOpen(false)}
                ></div>

                {/* Sliding Menu */}
                <div
                    ref={mobileMenuRef}
                    className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-[#1e2761] to-[#240046] border-l border-purple-500/30 md:hidden z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
                            <h2 className="text-xl font-bold text-white">Menu</h2>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="text-white hover:text-gray-300 transition"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                            <Link
                                to="/profile"
                                className="flex items-center space-x-3 px-4 py-3 text-gray-200 hover:bg-white/10 rounded-lg transition font-medium"
                                onClick={() => setMenuOpen(false)}
                            >
                                <UserCircle size={22} className="text-yellow-400" />
                                <span>Profile</span>
                            </Link>

                            <Link
                                to="/cart"
                                className="flex items-center justify-between px-4 py-3 text-gray-200 hover:bg-white/10 rounded-lg transition font-medium"
                                onClick={() => setMenuOpen(false)}
                            >
                                <div className="flex items-center space-x-3">
                                    <ShoppingCart size={22} className="text-yellow-400" />
                                    <span>Shopping Cart</span>
                                </div>
                            </Link>

                            {user?.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className="flex items-center justify-between px-4 py-3 text-gray-200 hover:bg-white/10 rounded-lg transition font-medium"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <ShoppingCart size={22} className="text-yellow-400" />
                                        <span>Admin Dashboard</span>
                                    </div>
                                </Link>
                            )}

                            <div className="border-t border-purple-500/30 my-4"></div>

                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 w-full px-4 py-3 text-gray-200 hover:bg-white/10 rounded-lg transition font-medium"
                                >
                                    <LogOut size={22} className="text-yellow-400" />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-200 hover:bg-white/10 rounded-lg transition font-medium"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <User size={22} className="text-yellow-400" />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </>

            {/* ====== MOBILE SEARCH OVERLAY ====== */}
            {isMobileSearchOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/95 backdrop-blur-lg z-[60] flex flex-col p-4 animate-fade-in">
                    <div className="flex items-center space-x-3 mb-4">
                        <ArrowLeft
                            className="text-white cursor-pointer"
                            size={26}
                            onClick={() => setIsMobileSearchOpen(false)}
                        />
                        <div className="flex items-center w-full bg-gradient-to-r from-[#1e2761] to-[#240046] border border-purple-500/30 rounded-full px-4 py-3">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 font-medium text-sm"
                            />
                            <Search className="text-yellow-400" size={20} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}