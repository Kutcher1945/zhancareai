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
              className="relative bg-white shadow-xl rounded-lg p-6 text-left transition-all duration-300 group hover:bg-blue-100 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg mr-4">
                  <FontAwesomeIcon
                    icon={iconMapping[service.icon]}
                    className="text-2xl"
                  />
                </div>
                <div>
                  <h5 className="text-xl font-bold text-gray-800">
                    {service.title}
                  </h5>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>

              {/* Expandable Content */}
              <div className="overflow-hidden max-h-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <ul className="list-disc pl-8 text-gray-800 bg-white p-4 rounded-lg shadow-md">
                  {service.details.map((detail, i) => (
                    <li key={i} className="text-gray-700 text-sm">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
