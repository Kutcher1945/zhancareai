import React from "react";
import { motion } from "framer-motion";

export const ChatButton = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white p-5 rounded-full shadow-2xl flex items-center justify-center cursor-pointer z-50"
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      style={{
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Enhanced shadow effect
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01M21 15.72A2.01 2.01 0 0119 17H6l-3 3V7a2 2 0 012-2h14a2 2 0 012 2v8.72z"
        />
      </svg>
    </motion.div>
  );
};
