"use client";

import Image from "next/image";
import Logo from "@/assets/logosaas_new2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const notificationCount = 3; // 🔔 Можно будет подключить из бэка

  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-6 py-4 border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={120} height={40} />
      </div>

      {/* Notifications */}
      <div className="relative">
        <FontAwesomeIcon icon={faBell} className="text-gray-600 text-xl cursor-pointer" />
        {notificationCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {notificationCount}
          </span>
        )}
      </div>
    </header>
  );
};
