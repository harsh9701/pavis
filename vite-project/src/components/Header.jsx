import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, ArrowLeft } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { cart, setCart } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
    };

    return (
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
                            <ShoppingCart className="text-yellow-400 hover:text-yellow-300 transition" size={24} />
                            {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                7
                            </span> */}
                        </Link>

                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="flex w-32 justify-between bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition pointer"
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
                        <ShoppingCart className="text-yellow-400 cursor-pointer" size={22} />
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

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800">
                    <div className="px-4 py-6 space-y-4">
                        <Link
                            to="/cart"
                            className="flex items-center justify-between text-gray-300 hover:text-white transition font-medium"
                        >
                            <div className="flex items-center space-x-2">
                                <ShoppingCart size={20} className="text-yellow-400" />
                                <span>Shopping Cart</span>
                            </div>
                            <span className="text-sm text-gray-400">7 items</span>
                        </Link>

                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 text-gray-300 hover:text-white transition font-medium"
                            >
                                <User size={20} />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-3 text-gray-300 hover:text-white transition font-medium"
                            >
                                <User size={20} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Mobile Search Overlay */}
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
        </header>
    );
}
