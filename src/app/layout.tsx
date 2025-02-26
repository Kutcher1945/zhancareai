import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext"; 
import { AuthProvider } from "@/context/AuthContext"; 
import AuthPopup from "@/components/AuthPopup"; 
import { ToastContainer } from "react-toastify";  // ✅ Import Toastify
import "react-toastify/dist/ReactToastify.css";  // ✅ Import Toast styles

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://your-production-domain.com"), // Add this line
  title: "ZhanCare.AI - Будущее телемедицины",
  description:
    "ZhanCare.AI — инновационная платформа для дистанционных медицинских консультаций, ИИ-инструментов для врачей и удобной связи между пациентами и докторами.",
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
    title: "ZhanCare.AI - Будущее телемедицины",
    description:
      "ZhanCare.AI предоставляет современные технологии для повышения качества медицинской помощи, обеспечивая удобную коммуникацию между пациентами и врачами.",
    images: [
      {
        url: "/opengraph-zhancare.png",
        width: 1200,
        height: 630,
        alt: "ZhanCare.AI - Телемедицина будущего",
      },
    ],
    locale: "ru_RU",
    type: "website",
    siteName: "ZhanCare.AI",
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
        {/* Google Analytics Tag */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2ZF4XS6G3Y"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2ZF4XS6G3Y');
          `}
        </Script>
      </head>
      <body className={twMerge(dmSans.className, "antialiased bg-[#F8FAFF]")}>
        <AuthProvider>
          <LanguageProvider>
            <main>{children}</main>
            <AuthPopup />
          </LanguageProvider>
        </AuthProvider>

        {/* ✅ Toast Container for Global Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
