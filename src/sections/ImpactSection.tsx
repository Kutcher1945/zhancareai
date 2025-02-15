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

// 📊 Основные достижения стартапа
const statistics = [
  { value: "100+", description: "Проведенных демо онлайн-консультаций", icon: faVideo },
  { value: "50+", description: "Сертифицированных врачей", icon: faUserMd },
  { value: "2+", description: "Стран, знающих о ZhanCare.AI", icon: faClinicMedical },
  { value: "95%", description: "Более быстрая диагностика с ИИ", icon: faChartLine },
];

// 🤖 AI-Возможности
const features = [
  {
    title: "ИИ-диагностика",
    description: "Моментальный анализ симптомов для ускоренного принятия решений.",
    icon: faStethoscope,
  },
  {
    title: "Мониторинг здоровья в реальном времени",
    description: "Отслеживание жизненно важных показателей пациента 24/7.",
    icon: faHeartbeat,
  },
  {
    title: "Безопасные цифровые медкарты",
    description: "Зашифрованный облачный доступ к медицинской истории.",
    icon: faNotesMedical,
  },
  {
    title: "Умные напоминания",
    description: "Автоматическое уведомление о приёмах и лекарствах.",
    icon: faBell,
  },
  {
    title: "Персонализированные рекомендации по лекарствам",
    description: "ИИ-анализ дозировки и совместимости медикаментов.",
    icon: faPills,
  },
  {
    title: "Автоматизированные отчеты для врачей",
    description: "Генерация подробных медицинских отчетов на основе данных пациентов.",
    icon: faChartLine,
  },
];


// 🚀 Истории успеха
const successStories = [
  {
    icon: faClock, // ⏳ Иконка времени
    title: "Врачи экономят 20+ часов в неделю",
    description: "ИИ-автоматизация сокращает время на административные задачи, позволяя врачам сосредоточиться на пациентах.",
  },
  {
    icon: faGlobe, // 🌍 Иконка доступа
    title: "3x быстрее доступ к врачам в удаленных районах",
    description: "Телемедицина устраняет разрыв в здравоохранении, помогая пациентам получать медпомощь из любой точки.",
  },
];

export const ImpactSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        
        {/* 📊 Основные достижения */}
        <div className="text-center mb-12">
          <h2 className="section-title">Почему выбирают ZhanCare.AI?</h2>
          <p className="section-des mt-5">Мы масштабируем умное здравоохранение с помощью ИИ.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FontAwesomeIcon icon={stat.icon} className="text-4xl text-blue-600 mb-3" />
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 🤖 AI-Возможности */}
        <div className="text-center mt-16 mb-12">
          <h2 className="section-title">ИИ, который меняет медицину</h2>
          <p className="section-des mt-5">Интеллектуальная, автоматизированная и доступная медицинская помощь.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-blue-100 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FontAwesomeIcon icon={feature.icon} className="text-3xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 🚀 Истории успеха */}
        <div className="text-center mt-16 mb-12">
          <h2 className="section-title">Реальные результаты</h2>
          <p className="section-des mt-5">Как может ZhanCare.AI поменять здравоохранение.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-lg flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              {/* Заменяем текст на иконку слева */}
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full">
                <FontAwesomeIcon icon={story.icon} className="text-2xl" />
              </div>
          
              <div>
                <h3 className="text-lg font-bold">{story.title}</h3>
                <p className="text-gray-600">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
