"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faBus,
  faLeaf,
  faCity,
  faUsers,
  faChartLine,
  faRoad,
  faShieldAlt,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/context/LanguageContext";
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

// Map icon names to FontAwesome objects
const iconMapping = {
  faMapMarkerAlt,
  faBus,
  faLeaf,
  faCity,
  faUsers,
  faChartLine,
  faRoad,
  faShieldAlt,
  faLightbulb,
} as const;

type IconName = keyof typeof iconMapping;

interface Service {
  icon: IconName; // Ensure icon matches the IconName type
  title: string;
  description: string;
  details: string[];
}

export const Services = () => {
  const { language } = useLanguage(); // Get the current language from context
  const translations = language === "ru" ? ru.services : kz.services; // Select the appropriate translations

  // Explicitly type the list as an array of Service
  const services: Service[] = translations.list.map((service) => ({
    ...service,
    icon: service.icon as IconName, // Ensure the icon matches the type
  }));

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            {translations.servicesHeader}
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            {translations.servicesDescription}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-xl rounded-lg p-6 text-left group transition-all duration-300 hover:bg-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg mr-4">
                  {/* Safely map the icon */}
                  <FontAwesomeIcon
                    icon={iconMapping[service.icon]}
                    className="text-2xl"
                  />
                </div>
                <div>
                  <h5 className="text-xl font-bold text-gray-800">
                    {service.title}
                  </h5>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>

              {/* Animated Details */}
              <ul className="list-disc pl-8 text-gray-800 bg-blue-200 p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {service.details.map((detail, i) => (
                  <li key={i} className="text-gray-700 text-sm">
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
