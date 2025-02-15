import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext"; 
import { AuthProvider } from "@/context/AuthContext"; 
import AuthPopup from "@/components/AuthPopup"; 

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
        url: "/opengraph-zhancare.png",
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
      <head>
        {/* Default Meta Tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ZhanCare AI Team" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="ZhanCare AI - Будущее телемедицины" />
        <meta property="og:description" content="ZhanCare AI предоставляет современные технологии для медицинской помощи." />
        <meta property="og:image" content="/opengraph-zhancare.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zhan.care/" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ZhanCare AI - Будущее телемедицины" />
        <meta name="twitter:description" content="ZhanCare AI предоставляет современные технологии для медицинской помощи." />
        <meta name="twitter:image" content="/opengraph-zhancare.png" />

        {/* Canonical URL for SEO */}
        <link rel="canonical" href="https://zhan.care/" />
      </head>
      <body className={twMerge(dmSans.className, "antialiased bg-[#F8FAFF]")}>
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
