import { useState, useEffect, useRef, useContext } from "react";
import { Search, ShoppingCart, User, Menu, X, ArrowLeft, UserCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function PavisHeader() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const { cart, setCart } = useCart();
    const userMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        if (userMenuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [userMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

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
            {/* HEADER BAR */}
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-black/10"
                    : "bg-white/80 backdrop-blur-md"
                    }`}
            >
                {/* Decorative top line */}
                <div className={`h-1 bg-black transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-pulse"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo with curved accent */}
                        <Link to="/" className="flex items-center group relative">
                            <div className="relative">
                                {/* Logo */}
                                <img
                                    src="/pavis-logo.png"
                                    alt="Wholsera Logo"
                                    className="h-10 sm:h-12 w-auto"
                                />
                                {/* Small decorative element */}
                                <div className="absolute -right-2 -top-1 w-2 h-2 bg-black rounded-full opacity-50"></div>
                            </div>
                        </Link>

                        {/* Desktop Search Bar with curved design */}
                        <div className="hidden md:flex items-center relative group">
                            <div className="w-[320px] lg:w-[460px] transition-all duration-300">
                                <div className="relative">
                                    {/* Main search input */}
                                    <div className="flex items-center px-6 py-3 bg-gray-50 border-2 border-black rounded-full hover:bg-white hover:shadow-lg transition-all">
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 font-medium text-sm"
                                        />
                                        <div className="w-10 h-10 -mr-2 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-all">
                                            <Search className="text-white" size={18} />
                                        </div>
                                    </div>
                                    {/* Decorative curve under search */}
                                    <svg className="absolute -bottom-1 left-8 w-24 h-2 opacity-10" viewBox="0 0 100 10">
                                        <path d="M 0,5 Q 50,0 100,5" stroke="black" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center space-x-6">
                            {/* Cart with badge */}
                            <Link to="/cart" className="relative group">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gray-50 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer group">
                                        <ShoppingCart className="text-black group-hover:text-white transition-colors" size={20} />
                                    </div>
                                    {cart.length > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {cart.length}
                                        </div>
                                    )}
                                </div>
                            </Link>

                            {/* User Menu */}
                            {user && (
                                <div className="relative" ref={userMenuRef}>
                                    <div
                                        className="w-12 h-12 bg-gray-50 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer group"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    >
                                        <User className="text-black group-hover:text-white transition-colors" size={20} />
                                    </div>

                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-4 w-56 bg-white border-2 border-black rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
                                            {/* Decorative top curve */}
                                            <svg className="absolute top-0 left-0 w-full h-4 opacity-5" viewBox="0 0 200 20">
                                                <path d="M 0,20 Q 100,0 200,20" fill="black" />
                                            </svg>

                                            <div className="py-2">
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center space-x-3 px-5 py-3 text-black hover:bg-gray-50 transition"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <UserCircle size={20} />
                                                    <span className="font-medium">Profile</span>
                                                </Link>
                                                {user?.role === "admin" && (
                                                    <Link
                                                        to="/admin"
                                                        className="flex items-center space-x-3 px-5 py-3 text-black hover:bg-gray-50 transition"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <UserCircle size={20} />
                                                        <span className="font-medium">Admin Panel</span>
                                                    </Link>
                                                )}
                                                <div className="border-t border-gray-200 my-2"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-3 w-full px-5 py-3 text-black hover:bg-gray-50 transition"
                                                >
                                                    <LogOut size={20} />
                                                    <span className="font-medium">Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Login/Logout Button */}
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-2 group relative overflow-hidden"
                                >
                                    <span className="relative z-10">Logout</span>
                                    <LogOut size={18} className="relative z-10 group-hover:rotate-12 transition-transform" />
                                    {/* Hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Login</span>
                                    {/* Animated underline */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></div>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Icons */}
                        <div className="flex items-center space-x-4 md:hidden">
                            <Link to="/cart" className="relative">
                                <div className="w-10 h-10 bg-gray-50 border-2 border-black rounded-full flex items-center justify-center">
                                    <ShoppingCart className="text-black" size={18} />
                                    {cart.length > 0 && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {cart.length}
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div
                                className="w-10 h-10 bg-gray-50 border-2 border-black rounded-full flex items-center justify-center cursor-pointer"
                                onClick={() => setIsMobileSearchOpen(true)}
                            >
                                <Search className="text-black" size={18} />
                            </div>

                            <button
                                className="w-10 h-10 bg-black text-white border-2 border-black rounded-full flex items-center justify-center"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                {menuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative line */}
                <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
            </header>

            {/* MOBILE SLIDE-IN MENU */}
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
                    className={`fixed top-0 right-0 h-full w-80 bg-white md:hidden z-50 shadow-2xl transform transition-transform duration-300 ease-in-out border-l-4 border-black ${menuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Header with curved decoration */}
                        <div className="relative p-6 border-b-2 border-black">
                            {/* Background curve */}
                            <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 300 100">
                                <path d="M 0,50 Q 150,0 300,50 L 300,100 L 0,100 Z" fill="black" />
                            </svg>

                            <div className="relative z-10 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-black">Menu</h2>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                            <Link
                                to="/profile"
                                className="flex items-center space-x-4 px-5 py-4 text-black hover:bg-gray-50 rounded-2xl transition font-medium border-2 border-transparent hover:border-black"
                                onClick={() => setMenuOpen(false)}
                            >
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                    <UserCircle size={20} className="text-white" />
                                </div>
                                <span>Profile</span>
                            </Link>

                            <Link
                                to="/cart"
                                className="flex items-center space-x-4 px-5 py-4 text-black hover:bg-gray-50 rounded-2xl transition font-medium border-2 border-transparent hover:border-black"
                                onClick={() => setMenuOpen(false)}
                            >
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center relative">
                                    <ShoppingCart size={20} className="text-white" />
                                    {cart.length > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center border-2 border-black">
                                            {cart.length}
                                        </div>
                                    )}
                                </div>
                                <span>Shopping Cart</span>
                            </Link>

                            {user?.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className="flex items-center space-x-4 px-5 py-4 text-black hover:bg-gray-50 rounded-2xl transition font-medium border-2 border-transparent hover:border-black"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                        <UserCircle size={20} className="text-white" />
                                    </div>
                                    <span>Admin Dashboard</span>
                                </Link>
                            )}

                            {/* Decorative divider */}
                            <div className="py-4">
                                <div className="relative h-px bg-black/10">
                                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-2 opacity-20" viewBox="0 0 120 10">
                                        <path d="M 0,5 Q 60,0 120,5" stroke="black" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            </div>

                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-4 w-full px-5 py-4 text-white bg-black hover:bg-gray-800 rounded-2xl transition font-medium"
                                >
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                        <LogOut size={20} className="text-black" />
                                    </div>
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-4 px-5 py-4 text-white bg-black hover:bg-gray-800 rounded-2xl transition font-medium"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                        <User size={20} className="text-black" />
                                    </div>
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>

                        {/* Footer decoration */}
                        <div className="p-4">
                            <svg className="w-full h-8 opacity-5" viewBox="0 0 300 30">
                                <path d="M 0,15 Q 75,0 150,15 T 300,15" stroke="black" strokeWidth="2" fill="none" />
                            </svg>
                        </div>
                    </div>
                </div>
            </>

            {/* MOBILE SEARCH OVERLAY */}
            {isMobileSearchOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-white z-[60] flex flex-col p-4 animate-fade-in">
                    {/* Decorative top */}
                    <svg className="absolute top-0 left-0 w-full h-16 opacity-5" viewBox="0 0 400 60">
                        <path d="M 0,30 Q 200,0 400,30 L 400,60 L 0,60 Z" fill="black" />
                    </svg>

                    <div className="relative z-10 flex items-center space-x-3 mb-4">
                        <button
                            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center"
                            onClick={() => setIsMobileSearchOpen(false)}
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <div className="flex items-center flex-1 px-6 py-3 bg-gray-50 border-2 border-black rounded-full">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 font-medium"
                            />
                            <div className="w-10 h-10 -mr-2 bg-black rounded-full flex items-center justify-center">
                                <Search className="text-white" size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Search suggestions could go here */}
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        <p>Start typing to search products...</p>
                    </div>
                </div>
            )}
        </>
    );
}