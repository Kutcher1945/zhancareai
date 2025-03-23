"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logosaas.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faSignOutAlt,
  faVideo,
  faCalendar,
  faNotesMedical,
  faComment,
  faUser,
  faHistory,
  faFileMedical,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import VideoConsultation from "@/components/services/VideoConsultation";
import Appointments from "@/components/services/Appointments";
import MedicalHistory from "@/components/services/MedicalHistory";
import ChatDoctors from "@/components/services/ChatDoctors";
import ProfileDetails from "@/components/services/ProfileDetails";

const ProfilePage = () => {
  const { user, logoutUser, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && user?.role === "doctor") {
      router.replace("/doctor-profile");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        🔄 Проверка авторизации...
      </div>
    );
  }

  if (!user) return null;

  const userProfile = {
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
  };

  const handleLogout = () => {
    toast.success("Вы успешно вышли!", { position: "top-right", autoClose: 3000 });
    setTimeout(() => {
      logoutUser();
      router.replace("/");
    }, 1000);
  };

  const menuItems = [
    { id: "profile", icon: faUser, title: "Профиль" },
    { id: "video", icon: faVideo, title: "Видео консультация" },
    { id: "appointments", icon: faCalendar, title: "Запись на прием" },
    { id: "history", icon: faNotesMedical, title: "Медицинская история" },
    { id: "chat", icon: faComment, title: "Чат с врачами" },
    { id: "documents", icon: faFileMedical, title: "Документы" },
    { id: "activity", icon: faHistory, title: "Активность" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row">
      {/* ✅ Mobile Header */}
      <header className="sm:hidden bg-[#001E80] text-white flex items-center justify-between px-4 py-3">
        <Image src={Logo} alt="Logo" width={110} height={40} />
        <button onClick={() => setSidebarOpen(true)}>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
      </header>

      {/* ✅ Sidebar */}
      <aside
        className={`
          fixed sm:relative sm:sticky top-0 sm:top-0
          h-full sm:h-screen sm:min-h-screen
          z-40 left-0 w-64 bg-[#001E80] text-white p-6
          overflow-y-auto transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 sm:flex-shrink-0
        `}
      >
        {/* Close (Mobile) */}
        <div className="sm:hidden flex justify-end mb-4">
          <button onClick={() => setSidebarOpen(false)}>
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <Image src={Logo} alt="Logo" width={130} height={40} />
        </div>

        {/* User Info */}
        <div className="mt-6 text-center">
          <div className="w-20 h-20 bg-white text-[#001E80] rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
            {user.first_name.charAt(0)}
          </div>
          <span className="text-sm uppercase font-bold text-gray-300 mt-2 block">
            {user.role === "doctor" ? "Доктор" : user.role === "admin" ? "Администратор" : "Пациент"}
          </span>
          <h2 className="text-lg font-semibold mt-3">{user.first_name} {user.last_name}</h2>
          <p className="text-sm text-gray-200 break-words">{user.email}</p>
        </div>

        {/* Menu */}
        <nav className="mt-6 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                activeTab === item.id ? "bg-white text-[#001E80] font-semibold shadow-md" : "hover:bg-white hover:text-[#001E80]"
              }`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false); // close drawer on mobile
              }}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              {item.title}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 px-4 py-3 rounded-lg text-white font-medium flex items-center gap-3 hover:opacity-85 transition"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Выйти
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-3">
        {activeTab === "profile" && <ProfileDetails user={userProfile} />}
        {activeTab === "video" && <VideoConsultation />}
        {activeTab === "appointments" && <Appointments />}
        {activeTab === "history" && <MedicalHistory />}
        {activeTab === "chat" && <ChatDoctors />}
        {activeTab === "documents" && <div>📄 Раздел документов в разработке...</div>}
        {activeTab === "activity" && <div>📊 История активности пользователя...</div>}
      </main>
    </div>
  );
};

export default ProfilePage;
