// src/components/LoadingScreen.jsx
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black-900 via-white-700 to-blue-900 text-black z-50">
      {/* Animated circular loader */}
      <motion.div
        className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full mb-6"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />

      {/* Brand name or text */}
      <motion.h1
        className="text-3xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        PAVIS
      </motion.h1>

      {/* Optional subtle shimmer line */}
      <motion.div
        className="mt-4 h-[2px] w-40 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
}