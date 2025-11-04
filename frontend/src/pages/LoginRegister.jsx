import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, Building, User, Phone, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

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
                    setTimeout(() => navigate("/"), 1000);
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
    }, []);

    return (
        <div className="min-h-screen bg-white text-black relative overflow-hidden">
            <Toaster position="top-center" />

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
                        stroke="black" strokeWidth="40" fill="none" strokeLinecap="round" />
                    <path d="M 0,220 Q 200,350 400,220 T 800,220"
                        stroke="black" strokeWidth="30" fill="none" strokeLinecap="round" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Side - Welcome Section */}
                    <div className="space-y-8 text-center lg:text-left">
                        {/* Curved badge design */}
                        <div className="inline-block relative">
                            <div className="absolute inset-0 bg-black opacity-5 blur-xl rounded-full"></div>
                            <div className="relative px-6 py-3 bg-white border-2 border-black rounded-full shadow-lg">
                                <div className="flex items-center gap-3 justify-center lg:justify-start">
                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                    <span className="text-sm font-bold tracking-wide">India's Premier B2B Platform</span>
                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Main headline with creative typography */}
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                                <span className="block relative">
                                    Welcome to
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 opacity-20" viewBox="0 0 400 20">
                                        <path d="M 0,10 Q 100,0 200,10 T 400,10" stroke="black" strokeWidth="3" fill="none" />
                                    </svg>
                                </span>
                                <span className="block mt-4 relative">
                                    <span className="relative inline-block">
                                        PAVIS
                                        {/* Underline curve */}
                                        <svg className="absolute -bottom-4 left-0 w-full h-6" viewBox="0 0 300 30">
                                            <path d="M 0,15 Q 150,0 300,15" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </span>
                            </h1>
                        </div>

                        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                            Simplify wholesale: Connect directly with manufacturers and scale your business exponentially.
                        </p>

                        {/* Stats with flowing design */}
                        <div className="flex flex-wrap gap-8 pt-6 justify-center lg:justify-start">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-black opacity-5 rounded-2xl blur group-hover:opacity-10 transition-opacity"></div>
                                <div className="relative text-center">
                                    <div className="text-4xl sm:text-5xl font-black mb-1">15K+</div>
                                    <div className="text-gray-600 text-sm font-medium">Active Products</div>
                                    {/* Decorative line */}
                                    <svg className="mx-auto mt-2 w-16 h-2 opacity-20" viewBox="0 0 60 10">
                                        <path d="M 0,5 Q 30,0 60,5" stroke="black" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-2 bg-black opacity-5 rounded-2xl blur group-hover:opacity-10 transition-opacity"></div>
                                <div className="relative text-center">
                                    <div className="text-4xl sm:text-5xl font-black mb-1">80K+</div>
                                    <div className="text-gray-600 text-sm font-medium">Total Products</div>
                                    <svg className="mx-auto mt-2 w-16 h-2 opacity-20" viewBox="0 0 60 10">
                                        <path d="M 0,5 Q 30,0 60,5" stroke="black" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-2 bg-black opacity-5 rounded-2xl blur group-hover:opacity-10 transition-opacity"></div>
                                <div className="relative text-center">
                                    <div className="text-4xl sm:text-5xl font-black mb-1">2M+</div>
                                    <div className="text-gray-600 text-sm font-medium">Orders Delivered</div>
                                    <svg className="mx-auto mt-2 w-16 h-2 opacity-20" viewBox="0 0 60 10">
                                        <path d="M 0,5 Q 30,0 60,5" stroke="black" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Auth Form */}
                    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                        <div className="relative bg-white rounded-3xl border-2 border-black p-8 sm:p-10 shadow-2xl">
                            {/* Decorative corner curves */}
                            <svg className="absolute top-0 left-0 w-20 h-20 opacity-5" viewBox="0 0 80 80">
                                <path d="M 0,80 Q 0,0 80,0" stroke="black" strokeWidth="4" fill="none" />
                            </svg>
                            <svg className="absolute bottom-0 right-0 w-20 h-20 opacity-5" viewBox="0 0 80 80">
                                <path d="M 80,0 Q 80,80 0,80" stroke="black" strokeWidth="4" fill="none" />
                            </svg>

                            {/* Header */}
                            <div className="text-center mb-8 relative z-10">
                                <div className="flex justify-center mb-2">
                                    <div className="">
                                        <img src="pavis-logo.png" alt="Logo" className="w-34 h-34 object-contain" />
                                    </div>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-black mb-3 relative inline-block">
                                    {isLogin ? 'Welcome Back' : 'Join PAVIS'}
                                    <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-3" viewBox="0 0 200 15">
                                        <path d="M 0,7 Q 100,0 200,7" stroke="black" strokeWidth="2" fill="none" />
                                    </svg>
                                </h2>
                                <p className="text-gray-600 mt-4">
                                    {isLogin ? 'Sign in to your business account' : 'Create your business account today'}
                                </p>
                            </div>

                            {/* Form */}
                            <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <div className="space-y-5">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="Full Name"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-black rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:shadow-lg transition-all font-medium"
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                name="company"
                                                placeholder="Company Name"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-black rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:shadow-lg transition-all font-medium"
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="tel"
                                                name="contactNo"
                                                placeholder="Phone Number"
                                                value={formData.contactNo}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-black rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:shadow-lg transition-all font-medium"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Business Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-black rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:shadow-lg transition-all font-medium"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-black rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:shadow-lg transition-all font-medium"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {!isLogin && (
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-black rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:shadow-lg transition-all font-medium"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                )}

                                {isLogin && (
                                    <div className="text-right">
                                        <a href="#" className="text-sm font-bold hover:underline transition-all">
                                            Forgot password?
                                        </a>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="group w-full relative px-8 py-4 bg-black text-white rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 shadow-lg cursor-pointer"
                                >
                                    <span className="relative flex items-center justify-center gap-3">
                                        {isLogin ? 'Sign In' : 'Create Account'}
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <div className="text-center pt-2">
                                    <p className="text-gray-600">
                                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                                        <button
                                            onClick={toggleForm}
                                            type="button"
                                            className="ml-2 font-bold hover:underline transition-all cursor-pointer"
                                        >
                                            {isLogin ? 'Sign Up' : 'Sign In'}
                                        </button>
                                    </p>
                                </div>
                            </form>

                            {/* Bottom decorative curve */}
                            <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-4 opacity-5" viewBox="0 0 200 20">
                                <path d="M 0,10 Q 50,0 100,10 T 200,10" stroke="black" strokeWidth="3" fill="none" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}