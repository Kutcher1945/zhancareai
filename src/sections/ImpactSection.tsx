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
  faUserMd, faStethoscope, faHeartbeat, faNotesMedical, faVideo,
  faChartLine, faClinicMedical, faBell, faPills, faClock, faGlobe,
};

export const ImpactSection = () => {
  const { language } = useLanguage();
  const translations = language === "kz" ? kz.impactSection : ru.impactSection;

  return (
    <section className="bg-white py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">

        {/* 📊 Key Achievements */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">{translations.title}</h2>
          <p className="text-gray-600 mt-4">{translations.description}</p>
        </div>

        {/* 🔹 Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
          {translations.statistics.map((stat, index) => {
            const icon = iconMapping[stat.icon as IconName] || faChartLine;
            return (
              <motion.div
                key={index}
                className="p-5 md:p-6 bg-gray-100 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <FontAwesomeIcon icon={icon} className="text-3xl md:text-4xl text-blue-600 mb-2 md:mb-3" />
                <h3 className="text-2xl md:text-3xl font-bold">{stat.value}</h3>
                <p className="text-gray-600 text-sm md:text-base">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* 🤖 AI Features */}
        <div className="text-center mt-12 md:mt-16 mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">{translations.features.title}</h2>
          <p className="text-gray-600 mt-4">{translations.features.description}</p>
        </div>

        {/* 🔹 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translations.features.list.map((feature, index) => {
            const icon = iconMapping[feature.icon as IconName] || faStethoscope;
            return (
              <motion.div
                key={index}
                className="p-5 md:p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-blue-100 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <FontAwesomeIcon icon={icon} className="text-3xl md:text-4xl text-blue-600 mb-3" />
                <h3 className="text-lg md:text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* 🚀 Success Stories */}
        <div className="text-center mt-12 md:mt-16 mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">{translations.successStories.title}</h2>
          <p className="text-gray-600 mt-4">{translations.successStories.description}</p>
        </div>

        {/* 🔹 Success Stories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {translations.successStories.stories.map((story, index) => {
            const icon = iconMapping[story.icon as IconName] || faGlobe;
            return (
              <motion.div
                key={index}
                className="p-5 md:p-6 bg-gray-100 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4 hover:bg-blue-100 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <div className="flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full">
                  <FontAwesomeIcon icon={icon} className="text-xl md:text-2xl" />
                </div>
            
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold">{story.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{story.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
