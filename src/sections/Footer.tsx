"use client";
import logo from "@/assets/logosaas.png";
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedin from "@/assets/social-linkedin.svg";
import SocialPin from "@/assets/social-pin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext"; // Import Language Context
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

export const Footer = () => {
  const { language } = useLanguage(); // Get current language from context
  const translations = language === "ru" ? ru.footer : kz.footer; // Select appropriate translations

  return (
    <footer className="bg-gradient-to-br from-[#1D1D2F] to-[#1A1A2E] text-gray-400 text-sm py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="">
            <Image src={logo} alt="Логотип компании" height={90} className="mx-auto md:mx-0" />
          </div>
          <p className="mt-4 text-gray-400 leading-6">{translations.companyTagline}</p>
          <p className="mt-4 text-blue-400 font-semibold hover:underline cursor-pointer">
            <a href="#hero">{translations.learnMore}</a>
          </p>
        </div>


        {/* Navigation Links */}
        <nav>
          <h4 className="text-white text-lg font-semibold mb-4 border-b pb-2 border-gray-700">
            {translations.navigation.title}
          </h4>
          <ul className="space-y-3">
            {translations.navigation.links.map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:text-blue-400 transition duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Information */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4 border-b pb-2 border-gray-700">
            {translations.contact.title}
          </h4>
          <p className="text-gray-400 leading-6">
            <span className="font-semibold">Адрес:</span> {translations.contact.address}
          </p>
          <p className="text-gray-400 mt-4">
            <span className="font-semibold">Email:</span>{" "}
            <a
              href={`mailto:${translations.contact.email}`}
              className="hover:text-blue-400 transition duration-300"
            >
              {translations.contact.email}
            </a>
          </p>
          <p className="text-blue-400 mt-4 font-semibold hover:underline cursor-pointer">
            <a href="#contact-form">{translations.contact.contactUs}</a>
          </p>
        </div>

        {/* Map Section */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4 border-b pb-2 border-gray-700">
            {translations.map.title}
          </h4>
          <div className="w-full h-48 rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.112740921332!2d76.94777831509592!3d43.23557467913664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x388369c12f12345b%3A0x123456789abcdef!2sAbay%20Ave%2090%2C%20Almaty%2C%20Kazakhstan!5e0!3m2!1sen!2skz!4v1698349393001!5m2!1sen!2skz"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4 border-b pb-2 border-gray-700">
            {translations.social.title}
          </h4>
          <div className="flex justify-center md:justify-start gap-6">
            <a href="#" aria-label="Социальная сеть X" className="hover:scale-125 transition-transform duration-300">
              <SocialX className="h-6 w-6 text-gray-400 hover:text-blue-400" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:scale-125 transition-transform duration-300">
              <SocialInsta className="h-6 w-6 text-gray-400 hover:text-blue-400" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:scale-125 transition-transform duration-300">
              <SocialLinkedin className="h-6 w-6 text-gray-400 hover:text-blue-400" />
            </a>
            <a href="#" aria-label="Pinterest" className="hover:scale-125 transition-transform duration-300">
              <SocialPin className="h-6 w-6 text-gray-400 hover:text-blue-400" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:scale-125 transition-transform duration-300">
              <SocialYoutube className="h-6 w-6 text-gray-400 hover:text-blue-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} {translations.rights}
      </div>
    </footer>
  );
};
