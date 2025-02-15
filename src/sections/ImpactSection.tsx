"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faStethoscope,
  faHeartbeat,
  faNotesMedical,
  faVideo,
  faChartLine,
  faClinicMedical,
  faBell,
  faPills,
  faClock,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/context/LanguageContext";
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

// ✅ Define Icon Name Type
type IconName =
  | "faUserMd"
  | "faStethoscope"
  | "faHeartbeat"
  | "faNotesMedical"
  | "faVideo"
  | "faChartLine"
  | "faClinicMedical"
  | "faBell"
  | "faPills"
  | "faClock"
  | "faGlobe";

// ✅ Map Icons to FontAwesome
const iconMapping: Record<IconName, any> = {
  faUserMd,        // Certified Doctors
  faStethoscope,   // AI Diagnostics
  faHeartbeat,     // Real-time Health Monitoring
  faNotesMedical,  // Secure Medical Records
  faVideo,         // Video Consultations
  faChartLine,     // Automated Reports & Analytics
  faClinicMedical, // Remote Telemedicine Access
  faBell,          // Smart Reminders
  faPills,         // Medication Recommendations
  faClock,         // Time-saving for Doctors
  faGlobe,         // Expanding Global Access
};

export const ImpactSection = () => {
  const { language } = useLanguage();
  const translations = language === "kz" ? kz.impactSection : ru.impactSection;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        
        {/* 📊 Основные достижения */}
        <div className="text-center mb-12">
          <h2 className="section-title">{translations.title}</h2>
          <p className="section-des mt-5">{translations.description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {translations.statistics.map((stat, index) => {
            const icon = iconMapping[stat.icon as IconName] || faChartLine; // ✅ Default Fallback
            return (
              <motion.div
                key={index}
                className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-blue-100 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <FontAwesomeIcon icon={icon} className="text-4xl text-blue-600 mb-3" />
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* 🤖 AI-Возможности */}
        <div className="text-center mt-16 mb-12">
          <h2 className="section-title">{translations.features.title}</h2>
          <p className="section-des mt-5">{translations.features.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translations.features.list.map((feature, index) => {
            const icon = iconMapping[feature.icon as IconName] || faStethoscope; // ✅ Default Fallback
            return (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-blue-100 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <FontAwesomeIcon icon={icon} className="text-3xl text-blue-600 mb-4" />
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* 🚀 Истории успеха */}
        <div className="text-center mt-16 mb-12">
          <h2 className="section-title">{translations.successStories.title}</h2>
          <p className="section-des mt-5">{translations.successStories.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {translations.successStories.stories.map((story, index) => {
            const icon = iconMapping[story.icon as IconName] || faGlobe; // ✅ Default Fallback
            return (
              <motion.div
                key={index}
                className="p-6 bg-gray-100 rounded-lg shadow-lg flex items-center gap-6 hover:bg-blue-100 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full">
                  <FontAwesomeIcon icon={icon} className="text-2xl" />
                </div>
            
                <div>
                  <h3 className="text-lg font-bold">{story.title}</h3>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
