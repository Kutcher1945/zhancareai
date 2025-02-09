"use client";

import { useAuth } from "@/context/AuthContext"; // Import Auth Context
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logosaas.png";
import { motion, AnimatePresence } from "framer-motion";

const AuthPopup = () => {
  const { isAuthOpen, setIsAuthOpen } = useAuth(); // Use auth state from context
  const [activeTab, setActiveTab] = useState("login");

  if (!isAuthOpen) return null; // Don't render if popup is closed

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg w-[750px] relative"
          >
            <button
              className="absolute top-3 text-3xl right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setIsAuthOpen(false)} // Close popup
            >
              &times;
            </button>

            <div className="flex p-8 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Добро пожаловать в Ситуационный Центр!
                </h2>
                <p className="text-gray-600 mt-6 text-sm max-w-96">
                  Войдите на сайт, если вы зарегистрированы, или создайте аккаунт в пару кликов!
                </p>
              </div>

              <div>
                {/* Tabs: Login / Register */}
                <div className="flex border-b mb-4 w-[350px]">
                  <button 
                    className={`flex-1 text-center py-2 font-medium ${activeTab === "login" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"}`} 
                    onClick={() => setActiveTab("login")}
                  >
                    Войти на сайт
                  </button>
                  <button 
                    className={`flex-1 text-center py-2 font-medium ${activeTab === "register" ? "border-b-2 text-black border-black" : "text-gray-500 hover:text-black"}`} 
                    onClick={() => setActiveTab("register")}
                  >
                    Зарегистрироваться
                  </button>
                </div>

                {/* Login / Register Forms */}
                <div className="text-black mt-6">
                  {activeTab === "login" ? (
                    <>
                      <input type="email" placeholder="Электронная почта" className="w-full px-4 py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="password" placeholder="Пароль" className="w-full px-4 py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <div className="text-right text-sm mb-4">
                        <a href="#" className="text-gray-500 hover:underline">Забыли пароль?</a>
                      </div>
                      <button className="bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white py-3 px-8 rounded-lg font-medium hover:opacity-85">
                        Войти
                      </button>
                    </>
                  ) : (
                    <>
                      <input type="text" placeholder="Фамилия" className="w-full px-4 py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="text" placeholder="Имя" className="w-full px-4 py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="email" placeholder="Электронная почта" className="w-full px-4 py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="password" placeholder="Пароль" className="w-full px-4 py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <input type="password" placeholder="Подтвердить пароль" className="w-full px-4 py-4 rounded-lg mb-3 bg-gray-100 focus:outline-none" />
                      <button className="mt-6 bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white py-4 px-8 rounded-lg font-medium hover:opacity-85">
                        Зарегистрироваться
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="mt-4 text-center text-gray-500 text-sm">
              <Image src={Logo} alt="Lokoplane Logo" width={100} height={20} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthPopup;
