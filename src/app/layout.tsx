import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext"; // Import Language Provider
import { AuthProvider, useAuth } from "@/context/AuthContext"; // Import Auth Provider
import AuthPopup from "@/components/AuthPopup"; // Import AuthPopup

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ситуационный Центр Алматы",
  description:
    "Ситуационный центр Алматы — это инновационный инструмент мониторинга и анализа городских процессов, который помогает улучшить безопасность и устойчивость города.",
  keywords: [
    "Ситуационный центр",
    "Алматы",
    "Городские процессы",
    "Мониторинг",
    "Анализ данных",
    "Безопасность города",
    "Инфраструктура",
    "Прозрачность",
    "Устойчивое развитие",
    "Технологии города",
  ],
  openGraph: {
    title: "Ситуационный Центр Алматы",
    description:
      "Ситуационный центр Алматы отслеживает в реальном времени городские процессы, выявляет угрозы и помогает принимать оперативные управленческие решения.",
    images: [
      {
        url: "/opengraph-image.png", // Replace with your image
        width: 1200,
        height: 630,
        alt: "Ситуационный Центр Алматы",
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
      <body className={twMerge(dmSans.className, "antialiased bg-[#EAEEFE]")}>
        {/* Wrapping the entire app in the LanguageProvider */}
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
