import { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, ShoppingCart, Sparkles, TrendingUp, Package, Users, Zap, Star, ChevronRight } from 'lucide-react';
import axios from 'axios';
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard';

export default function WholseraHomepage() {

    const [categories, setCategories] = useState([]);
    const [freshProducts, setFreshProducts] = useState([]);

    const fetchFreshProducts = async () => {
        try {
            const response = await axios.get("/product/new-arrivals");
            setFreshProducts(response.data.products || []);
        } catch (error) {
            console.error("Error fetching fresh products:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/admin/categories");
            setCategories(response.data.categories);
        } catch (error) {
            toast.error("Failed to fetch products");
            console.error("Error fetching products:", error);
        }
    };

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1581091012184-8f2a49e4e123?auto=format&fit=crop&w=1600&q=80",
            title: "Discover Amazing Products",
            subtitle: "Explore our exclusive collection for retailers and wholesalers",
            cta: "Shop Now",
        },
        {
            image: "https://images.unsplash.com/photo-1556742400-b5c3f8e0c98b?auto=format&fit=crop&w=1600&q=80",
            title: "Connect with Trusted Manufacturers",
            subtitle: "Find verified manufacturers and grow your business",
            cta: "Get Started",
        },
        {
            image: "https://images.unsplash.com/photo-1593011959404-3e6e2c2c44e3?auto=format&fit=crop&w=1600&q=80",
            title: "Fast Delivery Across India",
            subtitle: "We ensure your orders reach you on time, every time",
            cta: "Learn More",
        },
        {
            image: "https://images.unsplash.com/photo-1607083204015-4b46f8f6f53e?auto=format&fit=crop&w=1600&q=80",
            title: "Exclusive Wholesale Deals",
            subtitle: "Get the best prices directly from manufacturers",
            cta: "View Deals",
        },
    ];

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
        fetchFreshProducts();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-orange-600/20"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Category Section */}
            <section className="relative z-10 pt-16 pb-10 px-4 sm:px-6 lg:px-8 mt-12">
                <div className="overflow-x-auto no-scrollbar">
                    <div className="flex gap-8 justify-start sm:justify-center w-max sm:w-full">
                        {categories.map((cat, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center flex-shrink-0 cursor-pointer transition-transform"
                            >
                                <div className="w-22 h-22 lg:w-28 lg:h-28 rounded-full overflow-hidden shadow-lg">
                                    <img
                                        src={cat.imageUrl}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="mt-2 text-sm font-semibold text-white text-center">
                                    {cat.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fresh Products Section */}
            <section className="relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-12 text-center">
                        <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Fresh Arrivals
                        </span>
                    </h2>

                    {freshProducts.length > 0 ? (
                        <ProductCard freshProducts={freshProducts} />
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-block p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                                <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-400 text-lg">No fresh products available yet.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* <Carousel slides={slides} /> */}

            {/* Hero Section */}
            <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-8 mb-16">
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight">
                            <span className="block mb-4">Wholesale</span>
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                                Simplified
                            </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Connect directly with manufacturers. Scale your business. Experience wholesale like never before.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                            <button className="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 transition-transform group-hover:scale-105"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 blur-xl opacity-50"></div>
                                <span className="relative flex items-center">
                                    Start Selling <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
                                </span>
                            </button>
                            <button className="px-10 py-5 rounded-full font-bold text-lg border-2 border-gray-700 hover:border-purple-500 transition">
                                Explore Products
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-12 pt-12 text-center">
                            <div>
                                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">15K+</div>
                                <div className="text-sm text-gray-500 mt-1">Active Sellers</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">80K+</div>
                                <div className="text-sm text-gray-500 mt-1">Products</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">2M+</div>
                                <div className="text-sm text-gray-500 mt-1">Orders</div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Cards */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: ShoppingBag, title: 'Electronics', gradient: 'from-blue-500 to-cyan-500' },
                            { icon: Package, title: 'Fashion', gradient: 'from-purple-500 to-pink-500' },
                            { icon: Sparkles, title: 'FMCG', gradient: 'from-orange-500 to-yellow-500' }
                        ].map((item, i) => (
                            <div key={i} className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                                <item.icon className={`text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text mb-4`} size={40} strokeWidth={2} />
                                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm">Discover thousands of products</p>
                                <ChevronRight className="absolute bottom-6 right-6 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl sm:text-6xl font-black mb-6">
                            Built for <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Growth</span>
                        </h2>
                        <p className="text-xl text-gray-400">Everything you need to scale your wholesale business</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: 'Lightning Fast', desc: 'Instant order processing and real-time inventory updates', color: 'blue' },
                            { icon: Users, title: 'Verified Network', desc: 'Connect with trusted manufacturers and distributors', color: 'purple' },
                            { icon: TrendingUp, title: 'Analytics Dashboard', desc: 'Track sales, inventory, and growth metrics', color: 'orange' },
                            { icon: Package, title: 'Smart Logistics', desc: 'Automated shipping and delivery management', color: 'green' },
                            { icon: Star, title: 'Premium Support', desc: '24/7 dedicated assistance for your business', color: 'pink' },
                            { icon: ShoppingBag, title: 'Bulk Ordering', desc: 'Flexible quantities with competitive pricing', color: 'cyan' }
                        ].map((feature, i) => (
                            <div key={i} className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all">
                                <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="text-white" size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 blur-2xl opacity-50"></div>
                        <div className="relative px-8 py-20 text-center">
                            <h2 className="text-5xl sm:text-6xl font-black mb-6">
                                Ready to Scale?
                            </h2>
                            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                                Join thousands of businesses already growing with Wholsera
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <button className="bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                                    Start Free Trial
                                </button>
                                <button className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition">
                                    Book a Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}