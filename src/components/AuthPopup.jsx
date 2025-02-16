"use client";

import { useAuth } from "@/context/AuthContext"; 
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logoLogin.png";
import { motion, AnimatePresence } from "framer-motion";
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

const AuthPopup = () => {
  const { isAuthOpen, setIsAuthOpen } = useAuth();
  const { language } = useLanguage();
  const translations = language === "ru" ? ru.auth : kz.auth;
  const [activeTab, setActiveTab] = useState("login");

  if (!isAuthOpen) return null;

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[90%] sm:max-w-[450px] md:max-w-[750px] relative"
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-3xl"
              onClick={() => setIsAuthOpen(false)}
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row p-4 md:p-8 gap-6 md:gap-8 items-center">
              {/* Text Section (Mobile Stacks on Top, Desktop Side-by-Side) */}
              <div className="text-center md:text-left w-full md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {translations.welcome}
                </h2>
                <p className="text-gray-600 mt-2 md:mt-6 text-sm">
                  {translations.description}
                </p>
              </div>

              {/* Form Section */}
              <div className="w-full md:w-1/2">
                {/* Tabs: Login / Register */}
                <div className="flex border-b mb-4 w-full">
                  <button 
                    className={`flex-1 text-center py-2 font-medium ${activeTab === "login" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"}`} 
                    onClick={() => setActiveTab("login")}
                  >
                    {translations.login}
                  </button>
                  <button 
                    className={`flex-1 text-center py-2 font-medium ${activeTab === "register" ? "border-b-2 text-black border-black" : "text-gray-500 hover:text-black"}`} 
                    onClick={() => setActiveTab("register")}
                  >
                    {translations.register}
                  </button>
                </div>

                {/* Login / Register Forms */}
                <div className="text-black mt-4 md:mt-6">
                  {activeTab === "login" ? (
                    <>
                      <input type="email" placeholder={translations.email} className="w-full px-4 py-3 md:py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="password" placeholder={translations.password} className="w-full px-4 py-3 md:py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <div className="text-right text-sm mb-4">
                        <a href="#" className="text-gray-500 hover:underline">{translations.forgotPassword}</a>
                      </div>
                      <button className="w-full bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white py-3 md:py-4 rounded-lg font-medium hover:opacity-85">
                        {translations.loginButton}
                      </button>
                    </>
                  ) : (
                    <>
                      <input type="text" placeholder={translations.lastName} className="w-full px-4 py-3 md:py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="text" placeholder={translations.firstName} className="w-full px-4 py-3 md:py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="email" placeholder={translations.email} className="w-full px-4 py-3 md:py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="password" placeholder={translations.password} className="w-full px-4 py-3 md:py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="password" placeholder={translations.confirmPassword} className="w-full px-4 py-3 md:py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <button className="w-full mt-4 md:mt-6 bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white py-3 md:py-4 rounded-lg font-medium hover:opacity-85">
                        {translations.registerButton}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Logo Section */}
            <div className="mt-4 text-center text-gray-500 text-sm">
              <Image src={Logo} alt="ZhanCare.AI Logo" width={100} height={20} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthPopup;
