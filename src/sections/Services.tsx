import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faStethoscope,
  faNotesMedical,
  faBell,
  faUserMd,
  faHeartbeat,
  faPills,
  faClinicMedical,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/context/LanguageContext";
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

// Map icon names to FontAwesome objects
const iconMapping = {
  faVideo, // Video Consultations
  faStethoscope, // AI Diagnostics
  faNotesMedical, // Electronic Medical Records
  faBell, // Reminders & Notifications
  faUserMd, // Doctor Support
  faHeartbeat, // Health Monitoring
  faPills, // Medication Recommendations
  faClinicMedical, // Remote Telemedicine
  faChartLine, // Medical Data Analytics
} as const;

type IconName = keyof typeof iconMapping;

interface Service {
  icon: IconName;
  title: string;
  description: string;
  details: string[];
}

export const Services = () => {
  const { language } = useLanguage();
  const translations = language === "ru" ? ru.services : kz.services;

  // Ensure icon property is correctly cast to IconName
  const services: Service[] = translations.list.map((service) => ({
    ...service,
    icon: service.icon as IconName,
  }));

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            {translations.servicesHeader}
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            {translations.servicesDescription}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                relative bg-white shadow-xl rounded-2xl p-6 text-center transition-all duration-500 
                group cursor-pointer hover:scale-[1.05] hover:shadow-2xl
              "
            >
              {/* Animated Overlay with Gradient */}
              <div
                className="
                  absolute inset-0 
                  bg-gradient-to-r from-[#001E80] to-[#3A50FF] 
                  transform scale-0 
                  opacity-0 transition-all duration-[800ms] ease-in-out
                  group-hover:scale-100 group-hover:opacity-100 
                  rounded-2xl flex flex-col items-center justify-center
                  shadow-lg border border-[#ffffff]
                "
              >
                {/* Hover View: Centered Details List with Animated Items */}
                <ul className="list-none text-white text-lg space-y-3 opacity-0 transition-opacity duration-[500ms] delay-300 group-hover:opacity-100">
                  {service.details.map((detail, i) => (
                    <li 
                      key={i} 
                      className="opacity-0 transform translate-y-4 transition-all duration-500 ease-out delay-[100ms] group-hover:opacity-100 group-hover:translate-y-0"
                      style={{ transitionDelay: `${i * 100 + 200}ms` }} // Staggered animation
                    >
                      - {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content (placed above the overlay) */}
              <div className="relative z-10">
                {/* Default View: Icon, Title, Description */}
                <div
                  className="
                    flex flex-col items-center 
                    transition-opacity duration-[600ms] ease-in-out
                    group-hover:opacity-0 
                  "
                >
                  <div className="p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg mb-4">
                    <FontAwesomeIcon icon={iconMapping[service.icon]} className="text-2xl" />
                  </div>
                  <h5 className="text-2xl font-semibold text-gray-900 tracking-wide">{service.title}</h5>
                  <p className="text-gray-600 mt-2 text-md tracking-wide leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
