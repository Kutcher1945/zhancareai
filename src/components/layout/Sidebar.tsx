"use client";

import Image from "next/image";
import Logo from "@/assets/logosaas.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faVideo,
  faCalendar,
  faNotesMedical,
  faComment,
  faFileMedical,
  faHistory,
  faSignOutAlt,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

export const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const { user, logoutUser } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null; // ✅ Гарантия, что user точно есть

  const menuItems = [
    { id: "profile", icon: faUser, title: "Профиль" },
    { id: "video", icon: faVideo, title: "Видео консультация" },
    { id: "appointments", icon: faCalendar, title: "Запись на прием" },
    { id: "history", icon: faNotesMedical, title: "Медицинская история" },
    { id: "chat", icon: faComment, title: "Чат с врачами" },
    { id: "documents", icon: faFileMedical, title: "Документы" },
    { id: "activity", icon: faHistory, title: "Активность" },
  ];

  const handleLogout = () => {
    toast.success("Вы успешно вышли!", { position: "top-right", autoClose: 3000 });
    setTimeout(() => {
      logoutUser();
      router.replace("/");
    }, 1000);
  };

  return (
    <aside className="w-64 bg-[#001E80] text-white flex flex-col p-4">
      {/* Logo */}
      {/* <div className="flex items-center mb-6">
        <Image src={Logo} alt="Logo" width={130} height={40} />
      </div> */}

      {/* User Info */}
      <div className="text-center mb-6 relative">
        <div className="relative w-20 h-20 bg-white text-[#001E80] rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
          {user.first_name.charAt(0)}
          <FontAwesomeIcon
            icon={faCircle}
            className="absolute bottom-1 right-1 text-green-500 animate-pulse"
          />
        </div>
        <span className="text-sm uppercase font-bold text-gray-300 mt-2 block">
          {user.role === "doctor" ? "Доктор" : user.role === "admin" ? "Администратор" : "Пациент"}
        </span>
        <h2 className="text-lg font-semibold mt-2">{user.first_name} {user.last_name}</h2>
        <p className="text-sm text-gray-200 break-words">{user.email}</p>
      </div>

      {/* Menu */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
              activeTab === item.id
                ? "bg-white text-[#001E80] font-semibold shadow-md"
                : "hover:bg-white hover:text-[#001E80]"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <FontAwesomeIcon icon={item.icon} className="text-lg" />
            {item.title}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full mt-4 bg-red-500 px-4 py-3 rounded-lg text-white font-medium flex items-center gap-3 hover:opacity-85 transition"
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
        Выйти
      </button>
    </aside>
  );
};
