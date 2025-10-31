import React from 'react';
import {
    AlertTriangle,
    Home,
    ArrowLeft,
    Search,
    Mail
} from 'lucide-react';

const ErrorPage = () => {
    const handleGoHome = () => {
        // Replace with your actual navigation logic
        window.location.href = '/dashboard';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleContactSupport = () => {
        // Replace with your actual support contact logic
        window.location.href = 'mailto:support@yourcompany.com';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-lg mx-auto">
                {/* Error Icon and Numbers */}
                <div className="mb-8">
                    <div className="bg-red-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="h-12 w-12 text-red-600" />
                    </div>
                    <h1 className="text-8xl font-bold text-gray-800 mb-2">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                        The page you're looking for doesn't exist. It might have been moved,
                        deleted, or you entered the wrong URL.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-12">
                    <button
                        onClick={handleGoHome}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <Home className="h-5 w-5" />
                        <span>Back to Dashboard</span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={handleGoBack}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Go Back</span>
                        </button>

                        <button
                            onClick={handleContactSupport}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <Mail className="h-4 w-4" />
                            <span>Contact Support</span>
                        </button>
                    </div>
                </div>

                {/* Search Suggestion */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                        <h3 className="text-lg font-medium text-gray-800">Looking for something specific?</h3>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for products, customers, orders..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <a href="/products" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                            Manage Products
                        </a>
                        <a href="/customers" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                            Customer Management
                        </a>
                        <a href="/orders" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                            Order History
                        </a>
                        <a href="/settings" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                            Account Settings
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-sm text-gray-400">
                    <p>Error Code: 404 | If this problem persists, please contact our support team.</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;