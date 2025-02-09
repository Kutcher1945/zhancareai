import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext"; // Провайдер языка
import { AuthProvider } from "@/context/AuthContext"; // Провайдер аутентификации
import AuthPopup from "@/components/AuthPopup"; // Модальное окно авторизации

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZhanCare AI - Будущее телемедицины",
  description:
    "ZhanCare AI — инновационная платформа для дистанционных медицинских консультаций, ИИ-инструментов для врачей и удобной связи между пациентами и докторами.",
  keywords: [
    "телемедицина",
    "медицинские консультации",
    "ИИ в медицине",
    "онлайн-врачи",
    "диагностика",
    "электронные медицинские карты",
    "доступ к медицине",
    "здоровье",
    "мониторинг пациентов",
    "медицинские технологии",
  ],
  openGraph: {
    title: "ZhanCare AI - Будущее телемедицины",
    description:
      "ZhanCare AI предоставляет современные технологии для повышения качества медицинской помощи, обеспечивая удобную коммуникацию между пациентами и врачами.",
    images: [
      {
        url: "/opengraph-zhancare.png", // Обновите изображение
        width: 1200,
        height: 630,
        alt: "ZhanCare AI - Телемедицина будущего",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="relative">
      <body className={twMerge(dmSans.className, "antialiased bg-[#F8FAFF]")}> {/* Обновленный цвет фона */}
        <AuthProvider>
          <LanguageProvider>
            <main>{children}</main>
            <AuthPopup />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
