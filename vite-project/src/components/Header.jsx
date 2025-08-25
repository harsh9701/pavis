import { Search, ShoppingCart, User, Bell } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">B</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">B2B Hub</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-lg mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products, categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <Bell className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                7
                            </span>
                        </button>
                        <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <User className="w-6 h-6" />
                            <a href="/login"><span className="hidden md:block">Account</span></a>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}