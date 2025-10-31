import { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, ShoppingCart, Sparkles, TrendingUp, Package, Users, Zap, Star, ChevronRight, Award, Shield, Truck, Clock, CheckCircle, Play, Quote, ArrowUpRight, BarChart3, DollarSign, Target, Gift, Bell, Heart, MessageCircle, Phone } from 'lucide-react';

export default function PavisHomepage() {
    const [categories, setCategories] = useState([
        { _id: '1', name: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop' },
        { _id: '2', name: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop' },
        { _id: '3', name: 'Home Decor', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' },
        { _id: '4', name: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' }
    ]);
    const [freshProducts, setFreshProducts] = useState([
        { _id: '1', name: 'Premium Product 1', price: 2999, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
        { _id: '2', name: 'Premium Product 2', price: 3499, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
        { _id: '3', name: 'Premium Product 3', price: 4299, imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop' }
    ]);

    const successStories = [
        {
            name: "Elite Fashion Hub",
            location: "Delhi",
            growth: "+150%",
            story: "Increased revenue by 150% in 8 months",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
        },
        {
            name: "Luxury Boutique",
            location: "Mumbai",
            growth: "+180%",
            story: "Expanded to 5 new cities with PAVIS",
            image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop"
        },
        {
            name: "Premium Lifestyle",
            location: "Bangalore",
            growth: "+320%",
            story: "Tripled customer base in 4 months",
            image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=300&fit=crop"
        }
    ];

    const benefits = [
        { icon: DollarSign, title: "Save 30-50%", desc: "Direct from manufacturers" },
        { icon: Truck, title: "Free Shipping", desc: "On orders above ₹5000" },
        { icon: Shield, title: "100% Secure", desc: "Protected transactions" },
        { icon: Gift, title: "Loyalty Rewards", desc: "Earn points on every order" }
    ];

    const faqs = [
        { q: "How do I place a bulk order?", a: "Simply browse products, add to cart, and proceed to checkout. Our system handles bulk orders seamlessly." },
        { q: "What are the payment options?", a: "We accept UPI, Net Banking and offer COD for verified businesses." },
        { q: "How long does delivery take?", a: "Standard delivery takes 5-7 business days. Express delivery available in major cities." },
        { q: "Can I return products?", a: "Yes, we offer easy returns within 7 days for damaged or wrong products." }
    ];

    return (
        <div className="min-h-screen bg-white text-black overflow-hidden relative">
            {/* Artistic curved background elements inspired by PAVIS logo */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Top right flowing curve */}
                <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-[0.03]" viewBox="0 0 400 400">
                    <path d="M 50,350 Q 150,50 350,150 Q 250,250 150,350 Q 100,300 50,350 Z" 
                          fill="black" />
                </svg>
                
                {/* Bottom left flowing curve */}
                <svg className="absolute -bottom-32 -left-32 w-[600px] h-[600px] opacity-[0.03]" viewBox="0 0 400 400">
                    <path d="M 350,50 Q 250,350 50,250 Q 150,150 250,50 Q 300,100 350,50 Z" 
                          fill="black" />
                </svg>

                {/* Center decorative ribbon-like flow */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.02]" viewBox="0 0 800 400">
                    <path d="M 0,200 Q 200,50 400,200 T 800,200" 
                          stroke="black" strokeWidth="40" fill="none" strokeLinecap="round"/>
                    <path d="M 0,220 Q 200,350 400,220 T 800,220" 
                          stroke="black" strokeWidth="30" fill="none" strokeLinecap="round"/>
                </svg>
            </div>

            {/* Hero Section - Asymmetric Split with Flowing Design */}
            <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Decorative flowing lines in hero */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="none">
                        <path d="M 0,100 Q 250,0 500,100 L 500,200 Q 250,100 0,200 Z" fill="black" opacity="0.3"/>
                        <path d="M 0,300 Q 250,200 500,300 L 500,400 Q 250,300 0,400 Z" fill="black" opacity="0.2"/>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        {/* Left Content - 7 columns */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Curved badge design */}
                            <div className="inline-block relative">
                                <div className="absolute inset-0 bg-black opacity-5 blur-xl rounded-full"></div>
                                <div className="relative px-6 py-3 bg-white border-2 border-black rounded-full shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-1">
                                            <Star className="w-5 h-5 fill-black stroke-black" />
                                            <Star className="w-5 h-5 fill-black stroke-black" />
                                            <Star className="w-5 h-5 fill-black stroke-black" />
                                        </div>
                                        <span className="text-sm font-bold tracking-wide">Rated 4.8/5 by 3500+ Customers</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main headline with creative typography */}
                            <div className="space-y-4">
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                                    <span className="block relative">
                                        Wholesale
                                        <svg className="absolute -bottom-2 left-0 w-full h-3 opacity-20" viewBox="0 0 400 20">
                                            <path d="M 0,10 Q 100,0 200,10 T 400,10" stroke="black" strokeWidth="3" fill="none"/>
                                        </svg>
                                    </span>
                                    <span className="block mt-4 relative inline-block">
                                        Made
                                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-20 h-20 opacity-10">
                                            <svg viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="4" fill="none"/>
                                                <path d="M 30,50 L 50,70 L 80,30" stroke="black" strokeWidth="4" fill="none"/>
                                            </svg>
                                        </div>
                                    </span>
                                    <span className="block mt-4 relative">
                                        <span className="relative inline-block">
                                            Simple
                                            {/* Underline curve */}
                                            <svg className="absolute -bottom-4 left-0 w-full h-6" viewBox="0 0 300 30">
                                                <path d="M 0,15 Q 150,0 300,15" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/>
                                            </svg>
                                        </span>
                                    </span>
                                </h1>
                            </div>

                            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                                Join India's fastest-growing B2B marketplace. Connect with us to save more and grow your business exponentially.
                            </p>

                            {/* CTA Buttons with unique styling */}
                            <div className="flex flex-wrap gap-6 pt-4">
                                <button className="group relative px-10 py-5 bg-black text-white rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105">
                                    <span className="relative flex items-center gap-3">
                                        Browse Products 
                                        <ShoppingCart className="group-hover:rotate-12 transition-transform" size={22} />
                                    </span>
                                    {/* Animated underline */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></div>
                                </button>
                                
                                <button className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg border-3 border-black overflow-hidden transition-all hover:bg-black hover:text-white">
                                    <span className="relative flex items-center gap-3">
                                        <Phone size={22} className="group-hover:rotate-12 transition-transform" />
                                        Contact Us
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Right Content - 5 columns - PAVIS Logo Integration */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative w-full aspect-square max-w-md mx-auto">
                                {/* Artistic curved frame */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                                    {/* Top flowing ribbon */}
                                    <path d="M 50,120 Q 100,40 200,80 Q 300,120 350,100" 
                                          stroke="black" strokeWidth="8" fill="none" 
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Bottom flowing ribbon */}
                                    <path d="M 50,320 Q 100,380 200,340 Q 300,300 350,320" 
                                          stroke="black" strokeWidth="8" fill="none" 
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Decorative curves */}
                                    <path d="M 80,150 Q 120,180 160,160" 
                                          stroke="black" strokeWidth="4" fill="none" opacity="0.3"/>
                                    <path d="M 240,280 Q 280,260 320,280" 
                                          stroke="black" strokeWidth="4" fill="none" opacity="0.3"/>
                                </svg>

                                {/* Central content */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center space-y-6">
                                        <div className="relative inline-block">
                                            <h2 className="text-7xl font-black tracking-widest relative">
                                                PAVIS
                                                {/* Letter decorations */}
                                                <div className="absolute -top-4 left-0 w-8 h-1 bg-black transform -rotate-12"></div>
                                                <div className="absolute -bottom-4 right-0 w-8 h-1 bg-black transform rotate-12"></div>
                                            </h2>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="h-px w-32 bg-black mx-auto"></div>
                                            <p className="text-xs tracking-[0.3em] font-bold uppercase">Premium Wholesale</p>
                                            <div className="h-px w-32 bg-black mx-auto"></div>
                                        </div>

                                        {/* Decorative elements */}
                                        <div className="flex justify-center gap-4 pt-4">
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Corner decorative elements */}
                                <div className="absolute top-8 left-8 w-12 h-12 border-l-4 border-t-4 border-black opacity-20"></div>
                                <div className="absolute bottom-8 right-8 w-12 h-12 border-r-4 border-b-4 border-black opacity-20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section - Diagonal Cards */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="group relative">
                                {/* Card with diagonal accent */}
                                <div className="relative bg-white p-6 rounded-3xl border-2 border-black overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2">
                                    {/* Diagonal accent */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-black opacity-5 transform rotate-45 translate-x-12 -translate-y-12"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-4 transform group-hover:rotate-6 transition-transform">
                                            <benefit.icon size={28} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-black mb-2">{benefit.title}</h3>
                                        <p className="text-gray-600 text-sm">{benefit.desc}</p>
                                    </div>

                                    {/* Bottom curve decoration */}
                                    <svg className="absolute bottom-0 left-0 w-full h-8 opacity-5" viewBox="0 0 200 20">
                                        <path d="M 0,10 Q 50,0 100,10 T 200,10 L 200,20 L 0,20 Z" fill="black"/>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories - Overlapping Circular Design */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section header with decorative elements */}
                    <div className="text-center mb-16 relative">
                        <div className="inline-block relative">
                            <h2 className="text-5xl md:text-6xl font-black mb-4 relative">
                                Explore by Category
                                {/* Decorative curved line under text */}
                                <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4" viewBox="0 0 300 20">
                                    <path d="M 0,10 Q 150,0 300,10" stroke="black" strokeWidth="3" fill="none"/>
                                </svg>
                            </h2>
                        </div>
                        <p className="text-gray-600 text-lg mt-6">Find exactly what you need from our diverse collection</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
                        {categories.map((cat, i) => (
                            <div key={i} className="group relative cursor-pointer">
                                {/* Circular container with decorative ring */}
                                <div className="relative">
                                    {/* Outer decorative ring */}
                                    <div className="absolute -inset-3 rounded-full border-2 border-black opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300"></div>
                                    
                                    {/* Main image circle */}
                                    <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-black shadow-xl group-hover:shadow-2xl transition-all">
                                        <img
                                            src={cat.imageUrl}
                                            alt={cat.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>

                                    {/* Category label with curved background */}
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max">
                                        <div className="relative bg-black text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                                            {cat.name}
                                            {/* Small decorative line */}
                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-black"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative corner elements */}
                                <div className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-20 transition-opacity">
                                    <svg viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="none"/>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fresh Products - Asymmetric Grid */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    {/* Header with flowing design */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
                        <div className="relative">
                            <div className="absolute -left-12 top-0 text-9xl font-black opacity-[0.02]">🔥</div>
                            <h2 className="text-5xl font-black relative z-10">
                                Hot Arrivals
                                <svg className="absolute -bottom-3 -right-8 w-16 h-16 opacity-10" viewBox="0 0 50 50">
                                    <path d="M 10,25 Q 25,10 40,25 Q 25,40 10,25 Z" fill="black"/>
                                </svg>
                            </h2>
                            <p className="text-gray-600 mt-3 text-lg">Fresh stock just landed - grab them before they're gone!</p>
                        </div>
                        <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-3 group">
                            View All 
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {freshProducts.map((product, i) => (
                            <div key={i} className="group relative bg-white rounded-3xl overflow-hidden border-2 border-black hover:shadow-2xl transition-all hover:-translate-y-2">
                                {/* Image container with overlay */}
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Curved overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    
                                    {/* Quick view button */}
                                    <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                                        <Heart size={20} />
                                    </button>

                                    {/* New badge with curved design */}
                                    <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                                        NEW
                                    </div>
                                </div>

                                {/* Product info */}
                                <div className="p-6 relative">
                                    {/* Top decorative line */}
                                    <svg className="absolute top-0 left-6 w-16 h-2 opacity-10" viewBox="0 0 60 10">
                                        <path d="M 0,5 Q 30,0 60,5" stroke="black" strokeWidth="2" fill="none"/>
                                    </svg>

                                    <h3 className="font-bold text-xl mb-3 mt-2">{product.name}</h3>
                                    
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">Price</p>
                                            <p className="text-3xl font-black">₹{product.price}</p>
                                        </div>
                                        <button className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-2 group/btn">
                                            <ShoppingCart size={18} className="group-hover/btn:rotate-12 transition-transform" />
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories - Ribbon Layout */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden">
                {/* Decorative background curves */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 400">
                        <path d="M 0,200 Q 250,100 500,200 T 1000,200" stroke="white" strokeWidth="2" fill="none"/>
                        <path d="M 0,250 Q 250,350 500,250 T 1000,250" stroke="white" strokeWidth="2" fill="none"/>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black mb-4 relative inline-block">
                            Real Businesses, Real Growth
                            {/* Underline decoration */}
                            <svg className="absolute -bottom-4 left-0 w-full h-3" viewBox="0 0 400 15">
                                <path d="M 0,7 Q 200,0 400,7" stroke="white" strokeWidth="3" fill="none"/>
                            </svg>
                        </h2>
                        <p className="text-xl text-gray-300 mt-8">See how businesses are thriving with PAVIS</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {successStories.map((story, i) => (
                            <div key={i} className="group relative">
                                {/* Card with unique shape */}
                                <div className="relative bg-white text-black rounded-3xl overflow-hidden border-4 border-white hover:border-gray-300 transition-all hover:-translate-y-2 hover:shadow-2xl">
                                    {/* Image */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={story.image}
                                            alt={story.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Growth badge - positioned over image */}
                                        <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-full font-black text-lg shadow-lg">
                                            {story.growth}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 relative">
                                        {/* Decorative curve */}
                                        <svg className="absolute top-0 left-0 w-full h-6 opacity-5" viewBox="0 0 200 20">
                                            <path d="M 0,20 Q 100,0 200,20" fill="black"/>
                                        </svg>

                                        <h3 className="text-2xl font-black mb-2 mt-2">{story.name}</h3>
                                        <p className="text-gray-500 text-sm mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                                <circle cx="12" cy="9" r="2.5"/>
                                            </svg>
                                            {story.location}
                                        </p>
                                        <p className="text-lg font-medium">{story.story}</p>
                                    </div>
                                </div>

                                {/* Decorative element */}
                                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-4 border-white rounded-full opacity-20"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section - Accordion Style with Curves */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-9xl font-black opacity-[0.02]">?</div>
                        <h2 className="text-5xl md:text-6xl font-black mb-4 relative z-10">
                            Got Questions?
                            <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4" viewBox="0 0 300 20">
                                <path d="M 0,10 Q 150,0 300,10" stroke="black" strokeWidth="3" fill="none"/>
                            </svg>
                        </h2>
                        <p className="text-xl text-gray-600 mt-8">We've got answers</p>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="group relative bg-white border-2 border-black rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-1">
                                {/* Decorative corner curves */}
                                <svg className="absolute top-0 left-0 w-16 h-16 opacity-5" viewBox="0 0 60 60">
                                    <path d="M 0,60 Q 0,0 60,0" stroke="black" strokeWidth="3" fill="none"/>
                                </svg>
                                <svg className="absolute bottom-0 right-0 w-16 h-16 opacity-5" viewBox="0 0 60 60">
                                    <path d="M 60,0 Q 60,60 0,60" stroke="black" strokeWidth="3" fill="none"/>
                                </svg>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-black rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                                        <MessageCircle size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black mb-3">{faq.q}</h3>
                                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>

                                {/* Bottom decorative line */}
                                <svg className="absolute bottom-0 left-8 w-32 h-2 opacity-10" viewBox="0 0 120 10">
                                    <path d="M 0,5 Q 60,0 120,5" stroke="black" strokeWidth="2" fill="none"/>
                                </svg>
                            </div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="text-center mt-16 relative">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 flex gap-3 opacity-10">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                        </div>

                        <p className="text-gray-600 text-lg mb-6">Still have questions?</p>
                        <button className="relative px-12 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all group overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                Contact Support Team
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Animated background effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>

                        {/* Bottom decorative curve */}
                        <svg className="mx-auto mt-8 w-48 h-6 opacity-10" viewBox="0 0 200 20">
                            <path d="M 0,10 Q 50,0 100,10 T 200,10" stroke="black" strokeWidth="2" fill="none"/>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Footer decorative element */}
            <div className="relative h-20 overflow-hidden">
                <svg className="absolute bottom-0 left-0 w-full h-full opacity-5" viewBox="0 0 1000 100">
                    <path d="M 0,50 Q 250,0 500,50 T 1000,50 L 1000,100 L 0,100 Z" fill="black"/>
                </svg>
            </div>
        </div>
    );
}