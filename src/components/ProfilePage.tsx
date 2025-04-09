"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MainContent } from "@/components/layout/MainContent";

import VideoConsultation from "@/components/services/VideoConsultation";
import Appointments from "@/components/services/Appointments";
import MedicalHistory from "@/components/services/MedicalHistory";
import ChatDoctors from "@/components/services/ChatDoctors";
import ProfileDetails from "@/components/services/ProfileDetails";
import { ActivityLog } from "@/components/services/ActivityLog";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, logoutUser, loading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");

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

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileDetails user={userProfile} />;
      case "video":
        return <VideoConsultation />;
      case "appointments":
        return <Appointments />;
      case "history":
        return <MedicalHistory />;
      case "chat":
        return <ChatDoctors />;
      case "documents":
        return <div>📄 Раздел документов в разработке...</div>;
      case "activity":
        return <ActivityLog />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Container */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-50">
          {/* Breadcrumbs */}
          <Breadcrumb activeTab={activeTab} />

          {/* Animated Content */}
          <MainContent activeTab={activeTab}>
            {renderContent()}
          </MainContent>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
