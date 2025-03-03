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
  faEdit,
  faLock,
  faHistory,
  faFileMedical
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Import service pages
import VideoConsultation from "@/components/services/VideoConsultation";
import Appointments from "@/components/services/Appointments";
import MedicalHistory from "@/components/services/MedicalHistory";
import ChatDoctors from "@/components/services/ChatDoctors";
import ProfileDetails from "@/components/services/ProfileDetails";

const ProfilePage = function () {
  const { user, logoutUser, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(function () {
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

  // Ensure the user object contains all necessary fields
  const userProfile = {
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    // phone: user.phone || "",
    // birth_date: user.birth_date || "",
    // medical_history: user.medical_history || ""
  };

  function handleLogout() {
    toast.success("Вы успешно вышли!", { position: "top-right", autoClose: 3000 });

    setTimeout(function () {
      logoutUser();
      router.replace("/");
    }, 1000);
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ✅ Sidebar Navigation */}
      <aside className="w-64 bg-[#001E80] text-white min-h-screen p-6 fixed left-0 top-0 bottom-0">
        {/* ✅ Logo */}
        <div className="flex items-center">
          <Image src={Logo} alt="Logo" width={130} height={40} className="h-10 w-auto" />
        </div>

        {/* ✅ User Profile */}
        <div className="mt-6 text-center">
          <div className="w-20 h-20 bg-white text-[#001E80] rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
            {user.first_name.charAt(0)}
          </div>

          {/* ✅ User Role */}
          <span className="text-sm uppercase font-bold text-gray-300 mt-2 block">
            {user.role === "doctor" ? "Доктор" : user.role === "admin" ? "Администратор" : "Пациент"}
          </span>

          {/* ✅ User Name & Email */}
          <h2 className="text-lg font-semibold mt-3">{user.first_name} {user.last_name}</h2>
          <p className="text-sm text-gray-200">{user.email}</p>
        </div>

        {/* ✅ Navigation Menu */}
        <nav className="mt-6 space-y-4">
          {[
            { id: "profile", icon: faUser, title: "Профиль" },
            { id: "video", icon: faVideo, title: "Видео консультация" },
            { id: "appointments", icon: faCalendar, title: "Запись на прием" },
            { id: "history", icon: faNotesMedical, title: "Медицинская история" },
            { id: "chat", icon: faComment, title: "Чат с врачами" },
            { id: "documents", icon: faFileMedical, title: "Документы" },
            { id: "activity", icon: faHistory, title: "Активность" },
          ].map(function (item) {
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === item.id ? "bg-white text-[#001E80] font-semibold shadow-md" : "hover:bg-white hover:text-[#001E80]"
                }`}
                onClick={function () { setActiveTab(item.id); }}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                {item.title}
              </button>
            );
          })}
        </nav>

        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 px-4 py-3 rounded-lg text-white font-medium flex items-center gap-3 hover:opacity-85 transition"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Выйти
        </button>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-6 ml-64">
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
