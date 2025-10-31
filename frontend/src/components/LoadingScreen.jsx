// components/LoadingScreen.jsx
import { Sparkles } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white overflow-hidden">
            {/* Animated gradient background like homepage */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-orange-600/20"></div>
                <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Logo + animated spinner */}
            <div className="relative z-10 flex flex-col items-center space-y-6">
                <div className="flex items-center space-x-3">
                    <Sparkles className="text-purple-400 animate-spin-slow" size={40} />
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent tracking-wide">
                        Wholsera
                    </h1>
                </div>
                <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm tracking-widest uppercase mt-4">Loading Experience...</p>
            </div>
        </div>
    );
}
