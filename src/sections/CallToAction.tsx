"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext"; // Import Language Context
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

export const CallToAction = () => {
  const { language } = useLanguage(); // Get current language from context
  const translations = language === "ru" ? ru.callToAction : kz.callToAction; // Select appropriate translations

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const handleEmailRedirect = () => {
    window.location.href = "mailto:example@example.com"; // Replace with your email address
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(translations.alertMessage); // Display translated alert message
  };

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="bg-gradient-to-b from-[#D2DCFF] to-[#1D1D2F] py-16 sm:py-24 overflow-x-clip relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="section-heading relative text-center mb-8 sm:mb-10">
          <h2 className="section-title text-2xl sm:text-3xl font-bold">
            {translations.title}
          </h2>
          <p className="section-des mt-4 sm:mt-5 text-base sm:text-lg">
            {translations.description}
          </p>

          {/* Decorative Images */}
          <motion.img
            src={starImage.src}
            alt="звезда"
            width={260}
            className="absolute -left-[200px] -top-[100px] hidden sm:block"
            style={{
              translateY,
            }}
          />
          <motion.img
            src={springImage.src}
            alt="весна"
            width={260}
            className="absolute -right-[200px] -top-[50px] hidden sm:block"
            style={{
              translateY,
            }}
          />
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-lg sm:max-w-2xl mx-auto relative z-10">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {translations.form.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {translations.form.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                {translations.form.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              ></textarea>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all text-sm sm:text-base"
              >
                {translations.form.submitButton}
              </button>
              <button
                type="button"
                className="w-full sm:w-auto bg-gray-100 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                onClick={handleEmailRedirect}
              >
                <span>{translations.form.contactButton}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
