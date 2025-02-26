"use client";
import heroVideo from "@/assets/hero-video.mp4"; // Import the video file
import Logo from "@/assets/logosaas.png";
import MenuIcon from "@/assets/menu.svg";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/context/AuthContext"
import { faTimes, faUserMd, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons"; // ✅ Import faUserMd
import { useLanguage } from "@/context/LanguageContext"; // Import Language Context
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";
import AuthPopup from '@/components/AuthPopup'
import dynamic from "next/dynamic";
import { toast, ToastContainer as ReactToastContainer } from "react-toastify";


// Lazy load ToastContainer to avoid Next.js SSR issues
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
)
export const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { isAuthOpen, setIsAuthOpen, user, logoutUser } = useAuth();  // ✅ Get user from AuthContext 
  const { language, setLanguage } = useLanguage(); // Get current language and toggle function
  const translations = language === "ru" ? ru.hero : kz.hero; // Use appropriate translations
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logoutUser(); // Call the logout function from AuthContext
    setIsDropdownOpen(false); // Close the dropdown after logout
    toast.success("Вы успешно вышли!", { position: "top-right", autoClose: 3000 });
  };  
  
  

  const handleScrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false); // Close the menu after clicking
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const statsAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } },
  };

  const navigationKeys = Object.keys(translations.navigation) as Array<
    keyof typeof translations.navigation
  >;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <section className="relative pb-20 md:pb-10 overflow-hidden" id="hero">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-screen h-[110vh] object-cover -z-10"
      >
        <source src={heroVideo} type="video/mp4" />
        {translations.content.videoNotSupported}
      </video>

      {/* Darker Gradient Overlay */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/10 -z-9"></div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#1D1D2F]/80 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="py-4">
          <div className="container mx-auto flex items-center justify-between px-4">
            <Image src={Logo} alt="Logo" height={300} width={300} />

            <button className="md:hidden text-white cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuIcon className="h-6 w-6" />
            </button>

            <nav className="hidden md:flex gap-6 text-white items-center">
            {Object.keys(translations.navigation).map((key) => (
              <button
                key={key}
                className="hover:text-gray-300 transition"
                onClick={() => handleScrollToSection(key)}
              >
                {translations.navigation[key as keyof typeof translations.navigation]}  {/* ✅ FIX: Explicitly cast */}
              </button>
              ))}

              {/* Language Switcher */}
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition" onClick={() => setLanguage(language === "ru" ? "kz" : "ru")}>
                {language === "ru" ? "Қазақша" : "Русский"}
              </button>

              {/* ✅ Show User Icon + First Name after login */}
              {user ? (
                user.first_name ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white rounded-lg px-5 py-2 flex items-center gap-2"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <FontAwesomeIcon icon={faUserMd} className="text-xl" />
                      {user.first_name}
                    </button>
                
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden">
                        {/* Redirect to appropriate profile page */}
                        <a href={user.role === "doctor" ? "/doctor-profile" : "/profile"} className="block px-4 py-3 hover:bg-gray-200 flex items-center gap-2 cursor-pointer">
                          <FontAwesomeIcon icon={faUser} />
                          Личный кабинет
                        </a>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-3 hover:bg-gray-200 flex items-center gap-2">
                          <FontAwesomeIcon icon={faSignOutAlt} />
                          Выйти
                        </button>
                      </div>
                    )}
                  </div>
                ) : null
              ) : (
                <button onClick={() => setIsAuthOpen(true)} className="bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white rounded-lg px-5 py-2">
                  {language === "ru" ? "Войти" : "Кіру"}
                </button>
              )}
              <ToastContainer />
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center text-white">
          <button className="absolute top-4 right-4 text-white cursor-pointer" onClick={() => setIsMenuOpen(false)}>
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
          <nav className="flex flex-col gap-8 text-center">
          {Object.keys(translations.navigation).map((key) => (
              <button
                key={key}
                className="hover:text-gray-300 transition"
                onClick={() => handleScrollToSection(key)}
              >
                {translations.navigation[key as keyof typeof translations.navigation]}  {/* ✅ FIX: Explicitly cast */}
              </button>
              ))}

            {/* Language Switcher */}
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition" onClick={() => setLanguage(language === "ru" ? "kz" : "ru")}>
              {language === "ru" ? "Қазақша" : "Русский"}
            </button>

            {/* ✅ Mobile User Icon + First Name after login */}
            {user ? (
              <button className="bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white rounded-lg px-6 py-3 font-medium flex items-center gap-2">
                <FontAwesomeIcon icon={faUserMd} className="text-xl" /> {user.first_name}
              </button>
            ) : (
              <button onClick={() => setIsAuthOpen(true)} className="bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white rounded-lg px-6 py-3 font-medium">
                {language === "ru" ? "Войти" : "Кіру"}
              </button>
            )}
          </nav>
        </div>
      )}


      {/* Overlay */}
  <div className="absolute inset-0 bg-black/80 md:bg-black/70 -z-10"></div>

    {/* Hero Content */}
    <div className="relative z-10 container mx-auto text-white px-4">
      <motion.div
        className="md:flex items-center"
        initial="hidden"
        animate="visible"
        variants={textAnimation}
      >
        <div className="md:w-[50%] pt-20 pb-20">
          <motion.h1
            className="text-3xl md:text-5xl font-light tracking-tighter leading-tight mt-10 md:mt-20"
            initial="hidden"
            animate="visible"
            variants={textAnimation}
          >
            {translations.content.heroHeading}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-4 md:mt-6 font-extralight leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={textAnimation}
          >
            {translations.content.heroDescription}
          </motion.p>
          <motion.div
            className="flex gap-4 items-center mt-6 md:mt-8"
            initial="hidden"
            animate="visible"
            variants={textAnimation}
          >
            <button
              className="bg-gradient-to-r from-[#001E80] to-[#3A50FF] text-white px-6 py-3 rounded-lg font-medium hover:opacity-85 transition"
              onClick={() => (window.location.href = "")}
            >
              {translations.content.openDataButton}
            </button>
          </motion.div>
        </div>
      </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          initial="hidden"
          whileInView="visible"
          variants={statsAnimation}
          viewport={{ once: true }}
        >
          {translations.statistics.map((stat, index) => (
            <motion.div key={index} variants={statsAnimation}>
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-lg text-gray-200">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
