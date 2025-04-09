"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Breadcrumb = ({ activeTab }: { activeTab: string }) => {
  const titles: Record<string, string> = {
    profile: "Профиль",
    video: "Видео консультация",
    appointments: "Запись на прием",
    history: "Медицинская история",
    chat: "Чат с врачами",
    documents: "Документы",
    activity: "Активность",
  };

  return (
    <nav className="text-gray-600 text-sm flex items-center space-x-2 mb-6">
      <FontAwesomeIcon icon={faHome} />
      <span className="text-gray-400">
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
      <span className="font-medium text-[#001E80]">{titles[activeTab]}</span>
    </nav>
  );
};
