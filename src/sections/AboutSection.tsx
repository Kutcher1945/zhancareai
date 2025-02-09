"use client";
import React from "react";
import Image from "next/image";
import donutImage from "@/assets/tube.png"; // Update with the correct image path

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-16 bg-gradient-to-br from-[#1E34A0] to-[#1C212C] text-white"
    >
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-8 relative z-10">
        {/* Left Column: Text Content */}
        <div className="bg-white text-black p-8 rounded-xl shadow-lg max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Возможности Ситуационного Центра</h2>
          <p className="text-lg mb-6">
            Центр отслеживает в режиме реального времени городские процессы,
            выявляет угрозы и помогает оперативно принимать управленческие
            решения для обеспечения безопасности и устойчивого развития.
          </p>
          <a
            href="#open-data"
            className="inline-block bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-semibold shadow-md hover:bg-blue-800 transition duration-300"
          >
            Перейти к данным
          </a>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold text-base">01. Анализ и прогнозирование данных</h4>
              <p className="text-sm text-gray-600">
                Применение аналитических алгоритмов для анализа данных и
                прогнозирования возможных происшествий.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base">02. Визуализация данных</h4>
              <p className="text-sm text-gray-600">
                Данные визуализируются на интерактивных панелях и картах, что
                облегчает анализ ситуации и позволяет видеть полную картину
                происходящего в городе.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base">03. Прозрачность и отчетность</h4>
              <p className="text-sm text-gray-600">
                Центр предоставляет отчеты и статистику, которые повышают
                прозрачность работы и способствуют доверию граждан к городским
                службам и руководству.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Image */}
      <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3">
        <Image
          src={donutImage}
          alt="Decorative 3D Donut"
          width={300}
          height={300}
          className="animate-spin-slow" // Optional animation
        />
      </div>
    </section>
  );
};
