"use client"; // This directive is required for using React hooks

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext({
  language: "ru", // Default language
  setLanguage: (lang: string) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState("ru");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
