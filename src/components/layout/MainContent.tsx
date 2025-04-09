"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export const MainContent = ({ activeTab, children }: { activeTab: string; children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Имитация загрузки
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full min-h-[300px] relative"
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-[#001E80] animate-spin" />
          </div>
        ) : (
          children
        )}
      </motion.div>
    </AnimatePresence>
  );
};
