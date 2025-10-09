import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative z-10 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <Link to="/" className="flex items-center">
                                <img
                                    src="/WholseraFullLogo.png"
                                    alt="Wholsera Logo"
                                    className="h-10 sm:h-12 w-auto"
                                />
                            </Link>
                        </div>
                        <p className="text-gray-400">Your trusted partner for business solutions and professional equipment.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Bulk Orders</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Office Equipment</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Manufacturing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Healthcare</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact Info</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>support@b2bhub.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>Mon-Fri: 9AM-6PM EST</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 B2B Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}