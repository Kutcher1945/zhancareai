"use client";

import Image from "next/image";
import Logo from "@/assets/logosaas.png";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center bg-white border-b p-4 shadow-sm sticky top-0 z-30">
      {/* Left - Mobile Menu Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="sm:hidden bg-[#001E80] text-white p-2 rounded-md shadow-md"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {/* <Image src={Logo} alt="Logo" width={140} height={40} className="hidden sm:block" /> */}
        {/* <span className="text-[#001E80] font-semibold hidden sm:block">
          Личный кабинет
        </span> */}
      </div>

      {/* Right - Notifications & User */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-[#001E80] transition">
          <FontAwesomeIcon icon={faBell} className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* <div className="text-sm text-gray-700">
          
          {user?.first_name} {user?.last_name}
        </div> */}
      </div>
    </header>
  );
};
