import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, Building, User, Phone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

export default function AuthHeroPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        company: '',
        contactNo: ''
    });

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await axios.post(`/users/login`, { email: formData.email, password: formData.password });
                const data = response.data;
                if (response.status === 200) {
                    toast.success("Login Successful 🎉");
                    login(data);
                    setTimeout(() => navigate("/"), 1500);
                }
            } else {
                const response = await axios.post(`/users/register`, formData);
                const data = response.data;
                if (response.status === 200) {
                    toast.success("Account Created Successfully 🎊");
                    login(data);
                    setTimeout(() => navigate("/"), 1500);
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data.errors) {
                    error.response.data.errors.forEach((err) => toast.error(err.msg));
                } else if (error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Something went wrong 😢");
                }
            } else {
                toast.error("Server not reachable 🚨");
            }
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setShowPassword(false);
        setShowConfirmPassword(false);
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            company: '',
            contactNo: ''
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-4">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-orange-900/20"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">

                {/* Left Side - Welcome Text */}
                <div className="space-y-6 text-center lg:text-left px-4">
                    <h1 className="text-5xl sm:text-6xl font-black leading-tight">
                        Welcome to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">Wholsera</span>
                    </h1>
                    <p className="text-gray-400 text-xl sm:text-2xl max-w-lg">
                        Simplify wholesale: Connect directly with manufacturers and scale your business efficiently.
                    </p>

                    <div className="flex flex-wrap gap-8 mt-8 justify-center lg:justify-start">
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">15K+</div>
                            <div className="text-gray-400 text-sm mt-1">Active Sellers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">80K+</div>
                            <div className="text-gray-400 text-sm mt-1">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">2M+</div>
                            <div className="text-gray-400 text-sm mt-1">Orders</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login/Register Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-black/50 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className='flex justify-center mb-4'>
                                <img src="WholseraLogo.png" alt="Logo" className='w-20' />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-gray-300">
                                {isLogin ? 'Sign in to your business account' : 'Join our B2B platform today'}
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="Company Name"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            name="contactNo"
                                            placeholder="Phone Number"
                                            value={formData.contactNo}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Business Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-12 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors pointer"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {!isLogin && (
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            )}

                            {isLogin && (
                                <div className="text-right">
                                    <a href="#" className="text-blue-400 hover:text-blue-500 text-sm transition-colors">
                                        Forgot your password?
                                    </a>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full relative px-6 py-3 rounded-xl font-bold text-lg overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 hover:scale-105 transition-transform"
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </button>

                            <div className="mt-6 text-center">
                                <p className="text-gray-300">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    <button
                                        onClick={toggleForm}
                                        type="button"
                                        className="ml-2 text-blue-400 hover:text-blue-500 font-semibold transition-colors pointer"
                                    >
                                        {isLogin ? 'Sign Up' : 'Sign In'}
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}