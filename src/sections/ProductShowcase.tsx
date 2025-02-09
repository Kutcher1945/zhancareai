"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import product1 from "@/assets/hero1212.png";
import product2 from "@/assets/hero1213.png";
import product3 from "@/assets/hero1214.png";
import product4 from "@/assets/hero1215.png";

const images: {
  hero1212: string;
  hero1213: string;
  hero1214: string;
  hero1215: string;
} = {
  hero1212: product1.src,
  hero1213: product2.src,
  hero1214: product3.src,
  hero1215: product4.src,
};

import { useLanguage } from "@/context/LanguageContext"; // Import Language Context
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

export const ProductShowcase = () => {
  const { language } = useLanguage(); // Get current language from context
  const translations = language === "ru" ? ru.productShowcase : kz.productShowcase; // Select appropriate translations

  const [activeContent, setActiveContent] = useState(translations.contentData[0]);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleContentChange = (contentId: number) => {
    const selectedContent = translations.contentData.find(
      (content) => content.id === contentId
    );
    if (selectedContent) {
      setActiveContent(selectedContent);
    }
  };

  return (
    <section
      id="modules"
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip relative"
    >
      <motion.img
        className="absolute -left-30 bottom-0 z-0 hidden lg:block object-contain"
        style={{
          height: "400px",
          width: "auto",
          translateY,
        }}
      />
      <motion.img
        className="absolute -right-10 top-0 z-0 hidden lg:block object-contain"
        style={{
          height: "400px",
          width: "auto",
          translateY,
        }}
      />

      <div className="container mx-auto relative z-10 max-w-7xl px-8">
        <div className="bg-white p-10 rounded-lg shadow-xl">
          {/* Top text section */}
          <div className="text-center mb-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {translations.title}
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl">
              {translations.description}
            </p>
          </div>
          {/* Buttons and Image section */}
          <div className="flex flex-wrap md:flex-nowrap items-start relative z-10">
            {/* Left Column: Buttons */}
            <div className="w-full md:w-1/3 flex flex-col gap-6 pr-8">
              {translations.contentData.map((content) => (
                <button
                  key={content.id}
                  onClick={() => handleContentChange(content.id)}
                  className={`p-6 text-left border-2 rounded-lg transition-all duration-300 ${
                    activeContent.id === content.id
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-gray-800 border-gray-300 hover:border-blue-700"
                  }`}
                >
                  <span className="font-bold text-lg">{content.title} →</span>
                  {activeContent.id === content.id && (
                    <p className="mt-2 text-sm">{content.description}</p>
                  )}
                </button>
              ))}
            </div>

            {/* Right Column: Image */}
            <div className="w-full md:w-2/3 mt-6 md:mt-0 flex justify-center relative">
              <Image
                src={images[activeContent.imageSrc as keyof typeof images]}
                alt={activeContent.title}
                width={800}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
