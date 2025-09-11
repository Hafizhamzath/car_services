// src/pages/NotAuthorized.jsx
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function NotAuthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Icon with animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="flex justify-center mb-6"
        >
          <div className="p-6 rounded-full bg-red-600/10 border border-red-500/30">
            <Lock className="w-12 h-12 text-red-500" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
        >
          Access Denied
        </motion.h1>

        {/* Message */}
        <p className="mt-4 text-gray-400">
          🚫 You are not authorized to access this page. <br />
          Please check your permissions or contact support.
        </p>

        {/* CTA */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow-lg hover:shadow-red-700/50 transition"
        >
          Go Back Home
        </motion.a>
      </motion.div>
    </div>
  );
}
