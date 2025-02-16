"use client";
import React from "react";
import Image from "next/image";
import robotImage from "@/assets/robosit.png";
import { useLanguage } from "@/context/LanguageContext";
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

const Features = () => {
  const { language } = useLanguage(); // Get current language from context
  const translations = language === "ru" ? ru.features : kz.features; // Select appropriate translations

  return (
    <div
      id="features"
      style={{
        background: "radial-gradient(circle, #1E34A0 0%, #1C212C 100%)",
        padding: "20px 0",
        color: "white",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          width: "100%",
          flexWrap: "nowrap",
          flexDirection: "row",
        }}
      >
        {/* Left Column: Text Content */}
        <div
          style={{
            flex: "1",
            padding: "10px",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "10px",
              lineHeight: "1.4",
            }}
          >
            {translations.title}
          </h2>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "15px",
              lineHeight: "1.6",
            }}
          >
            {translations.description}
          </p>
          <a
            href="https://www.zhan.care/"
            style={{
              backgroundColor: "#0d47a1",
              color: "white",
              padding: "8px 16px",
              borderRadius: "5px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "bold",
              display: "inline-block",
              marginBottom: "20px",
            }}
          >
            {translations.buttonText}
          </a>
          <div>
            {translations.featuresList.map((feature, index) => (
              <div style={{ marginBottom: "15px" }} key={index}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "#d1d5db",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Robot Image */}
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={robotImage.src}
            alt="Robot"
            width={400}
            height={400}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Media Query for Mobile View */}
      <style jsx>{`
        @media (max-width: 768px) {
          #features > div {
            flex-direction: column !important;
          }
          #features img {
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Features;
