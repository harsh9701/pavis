import { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, ShoppingCart, Sparkles, TrendingUp, Package, Users, Zap, Star, ChevronRight, Award, Shield, Truck, Clock, CheckCircle, Play, Quote, ArrowUpRight, BarChart3, DollarSign, Target, Gift, Bell, Heart, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';

export default function WholseraHomepage() {
    const [categories, setCategories] = useState([]);
    const [freshProducts, setFreshProducts] = useState([]);

    const fetchFreshProducts = async () => {
        try {
            const response = await axios.get("/product/newArrivals");
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
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchFreshProducts();
    }, []);

    const successStories = [
        {
            name: "Youth Fashion Hub",
            location: "Delhi",
            growth: "+150%",
            story: "Increased revenue by 150% in 8 months",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
        },
        {
            name: "Diya Fashion",
            location: "Bihar",
            growth: "+180%",
            story: "Expanded to 5 new cities with Wholsera",
            image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop"
        },
        {
            name: "Home Decor Plus",
            location: "Mumbai",
            growth: "+320%",
            story: "Tripled customer base in 4 months",
            image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=300&fit=crop"
        }
    ];

    const benefits = [
        { icon: DollarSign, title: "Save 30-50%", desc: "Direct from manufacturers", color: "from-green-500 to-emerald-600" },
        { icon: Truck, title: "Free Shipping", desc: "On orders above ₹5000", color: "from-blue-500 to-cyan-600" },
        { icon: Shield, title: "100% Secure", desc: "Protected transactions", color: "from-purple-500 to-pink-600" },
        { icon: Gift, title: "Loyalty Rewards", desc: "Earn points on every order", color: "from-orange-500 to-yellow-600" }
    ];


    const faqs = [
        { q: "How do I place a bulk order?", a: "Simply browse products, add to cart, and proceed to checkout. Our system handles bulk orders seamlessly." },
        { q: "What are the payment options?", a: "We accept UPI, Net Banking and offer COD for verified businesses." },
        { q: "How long does delivery take?", a: "Standard delivery takes 5-7 business days. Express delivery available in major cities." },
        { q: "Can I return products?", a: "Yes, we offer easy returns within 7 days for damaged or wrong products." }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-orange-600/20"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero with Split Design */}
            <section className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/50">
                                <Star className="text-yellow-400 fill-yellow-400" size={16} />
                                <span className="text-sm font-semibold">Rated 4.8/5 by 3500+ Customers</span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight">
                                <span className="block">Wholesale</span>
                                <span className="">Made </span>
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                                    Simple
                                </span>
                            </h1>

                            <p className="text-m sm:text-xl text-gray-400 leading-relaxed">
                                Join India’s fastest-growing B2B marketplace. Connect with us to save more and grow your business exponentially.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link to='/explore' className="group relative px-8 py-4 rounded-full font-bold text-sm sm:text-lg overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500"></div>
                                    <span className="relative flex items-center">
                                        Browse Products <ShoppingCart className="ml-2" size={20} />
                                    </span>
                                </Link>
                                <button className="px-8 py-4 rounded-full font-bold text-sm sm:text-lg border-2 border-purple-500 hover:bg-purple-500/20 transition flex items-center gap-2 cursor-pointer">
                                    <Phone size={20} />
                                    Contact Us
                                </button>
                            </div>
                        </div>
                        {/* Left Content */}
                        <div className="space-y-4">
                            <section className="">
                                <img
                                    src="/WholseraFullLogo.png"
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Bar */}
            <section className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-2 md:gap-6">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0`}>
                                    <benefit.icon size={24} className="text-white" />
                                </div>
                                <div>
                                    <div className="font-bold">{benefit.title}</div>
                                    <div className="text-sm text-gray-400">{benefit.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Section */}
            <section className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">
                            Explore by <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Category</span>
                        </h2>
                        <p className="text-gray-400">Find exactly what you need from our diverse collection</p>
                    </div>
                    <div className="overflow-x-auto no-scrollbar pb-4">
                        <div className="flex gap-6 justify-start sm:justify-center w-max sm:w-full">
                            {categories.map((cat, i) => (
                                <Link key={i} to={`/shop-by-category/${cat._id}`}>
                                    <div className="flex flex-col items-center flex-shrink-0 group cursor-pointer">
                                        <div className="relative w-28 h-28 lg:w-36 lg:h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 group-hover:border-purple-500 transition-all group-hover:scale-110">
                                            <img
                                                src={cat.imageUrl}
                                                alt={cat.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <span className="mt-3 text-sm font-bold text-white text-center group-hover:text-purple-400 transition-colors">
                                            {cat.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Fresh Products */}
            <section className="relative z-10 py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/30 to-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-3xl font-black">
                                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                    🔥 Hot Arrivals
                                </span>
                            </h2>
                            <p className="text-gray-400 mt-2">Fresh stock just landed - grab them before they're gone!</p>
                        </div>
                        <Link to="/explore" className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:scale-105 transition-transform">
                            View All <ArrowRight size={20} />
                        </Link>
                    </div>

                    {freshProducts.length > 0 ? (
                        <ProductCard freshProducts={freshProducts} />
                    ) : (
                        <div className="text-center py-4">
                            <div className="inline-block p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                                <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-400 text-lg">New products coming soon...</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Success Stories */}
            <section className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black mb-2">
                            Real Businesses, <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Real Growth</span>
                        </h2>
                        <p className="text-l md:text-xl text-gray-400">See how businesses are thriving with Wholsera</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {successStories.map((story, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-2xl border-2 border-gray-700 hover:border-purple-500 transition-all">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                    />
                                </div>
                                <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold">{story.name}</h3>
                                        <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-bold">
                                            {story.growth}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">{story.location}</p>
                                    <p className="text-white">{story.story}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl md:text-5xl font-black mb-2">
                            Got <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Questions?</span>
                        </h2>
                        <p className="text-m md:text-xl text-gray-400">We've got answers</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all">
                                <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                                    <MessageCircle size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                                    {faq.q}
                                </h3>
                                <p className="text-gray-400 pl-8">{faq.a}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center m-10">
                        <p className="text-gray-400 mb-4">Still have questions?</p>
                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:scale-105 transition-transform">
                            Contact Support Team
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}