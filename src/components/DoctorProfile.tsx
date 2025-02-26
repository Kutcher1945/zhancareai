"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logosaas.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faNotesMedical, faUser, faSignOutAlt, faVideo } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorConsultations from "@/components/services/DoctorConsultations"; // ✅ Import DoctorConsultations

const DoctorProfile = () => {
  const { user, logoutUser, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("appointments");

  useEffect(() => {
    if (!loading && user?.role !== "doctor") {
      router.replace("/");
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

  const handleLogout = () => {
    toast.success("Вы успешно вышли!", { position: "top-right", autoClose: 3000 });

    setTimeout(() => {
      logoutUser();
      router.replace("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ✅ Sidebar Navigation */}
      <aside className="w-64 bg-[#001E80] text-white min-h-screen p-6 fixed left-0 top-0 bottom-0">
        <div className="flex items-center">
          <Image src={Logo} alt="Logo" width={130} height={40} className="h-10 w-auto" />
        </div>

        {/* ✅ Doctor Profile */}
        <div className="mt-6 text-center">
          <div className="w-20 h-20 bg-white text-[#001E80] rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
            {user.first_name.charAt(0)}
          </div>

          {/* ✅ Doctor Role */}
          <span className="text-sm uppercase font-bold text-gray-300 mt-2 block">
            Доктор
          </span>

          {/* ✅ Doctor Name & Email */}
          <h2 className="text-lg font-semibold mt-3">{user.first_name} {user.last_name}</h2>
          <p className="text-sm text-gray-200">{user.email}</p>
        </div>

        {/* ✅ Doctor Navigation Menu */}
        <nav className="mt-6 space-y-4">
          {[
            { id: "appointments", icon: faCalendar, title: "Мои Записи" },
            { id: "patients", icon: faNotesMedical, title: "История Пациентов" },
            { id: "consultations", icon: faVideo, title: "Мои Консультации" }, // ✅ NEW TAB
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                activeTab === item.id ? "bg-white text-[#001E80]" : "hover:bg-white hover:text-[#001E80]"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              {item.title}
            </button>
          ))}
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
        {activeTab === "appointments" && <h1 className="text-2xl font-semibold text-[#001E80]">Ваши запланированные консультации</h1>}
        {activeTab === "patients" && <h1 className="text-2xl font-semibold text-[#001E80]">История пациентов</h1>}
        {activeTab === "consultations" && <DoctorConsultations />} {/* ✅ Show the consultations page */}
      </main>
    </div>
  );
};

export default DoctorProfile;
