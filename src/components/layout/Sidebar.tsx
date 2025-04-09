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
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";

export const Sidebar = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user, logoutUser } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onClose(); // Закрываем на мобиле
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-[#001E80] text-white p-2 rounded-full shadow-lg"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Mobile Overlay */}
      {(sidebarOpen || isOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed z-50 sm:relative top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#001E80] to-[#3A50FF] text-white transform transition-transform duration-300 flex flex-col ${
          isOpen || sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center px-4 py-3 sm:hidden">
          <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2">
            <Image src={Logo} alt="Logo" width={120} height={40} priority />
          </Link>
          <button onClick={() => setSidebarOpen(false)}>
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden sm:flex items-center justify-center px-6 py-6">
          <Link href="/" className="transition-transform duration-300 hover:scale-105">
            <Image src={Logo} alt="Logo" width={160} height={50} priority />
          </Link>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 text-center border-b border-blue-400 relative">
          <div className="relative w-20 h-20 bg-white text-[#001E80] rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
            {user.first_name.charAt(0)}
            <FontAwesomeIcon
              icon={faCircle}
              className="absolute bottom-1 right-1 text-green-500 animate-pulse"
            />
          </div>
          <p className="text-sm uppercase font-bold text-gray-200 mt-2">
            {user.role === "doctor"
              ? "Доктор"
              : user.role === "admin"
              ? "Администратор"
              : "Пациент"}
          </p>
          <h2 className="text-lg font-semibold mt-1">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-sm text-gray-200 break-words">{user.email}</p>
        </div>

        {/* Menu */}
        <nav className="mt-6 space-y-2 px-4 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeTab === item.id
                  ? "bg-white text-[#001E80] font-semibold shadow-md"
                  : "hover:bg-white hover:text-[#001E80]"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              {item.title}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 px-4 py-3 rounded-lg text-white font-medium flex items-center gap-3 hover:opacity-85 transition"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Выйти
          </button>
        </div>
      </aside>
    </>
  );
};
