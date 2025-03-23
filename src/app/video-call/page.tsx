"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { PhoneOff, Loader2 } from "lucide-react";

const FullVideoCallPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const meetingId = searchParams.get("meetingId");
  const doctor = searchParams.get("doctor") || "Неизвестный врач";
  const userRole = searchParams.get("role") || "patient";
  const userName = searchParams.get("name") || "Гость";

  const [callActive, setCallActive] = useState(true);
  const [otherPartyJoined, setOtherPartyJoined] = useState(false);

  const isDoctor = userRole === "doctor";

  const handleEndCall = () => {
    setCallActive(false);
    router.push("/profile");
  };

  useEffect(() => {
    const timeout = setTimeout(() => setOtherPartyJoined(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (!meetingId) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold text-xl">
        ❌ Ошибка: Отсутствует идентификатор встречи!
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#001E80] text-white flex flex-col p-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] relative overflow-hidden">
      {callActive ? (
        <>
          {/* Header */}
          <div className="text-center mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {isDoctor ? "Вы ведете консультацию" : `Звонок с доктором ${doctor}`}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 break-words">
              Meeting ID: {meetingId}
            </p>
          </div>

          {/* Video Section */}
          <div className="flex-1 w-full rounded-lg overflow-hidden border border-white/20 mb-4">
            {otherPartyJoined ? (
              <JitsiMeeting
                domain="meet.jit.si"
                roomName={meetingId}
                userInfo={{
                  displayName: userName,
                  email: `${userName.toLowerCase().replace(/\s+/g, "")}@example.com`,
                }}
                configOverwrite={{
                  prejoinPageEnabled: false,
                  startWithAudioMuted: false,
                  startWithVideoMuted: false,
                  enableClosePage: false,
                  disableModeratorIndicator: !isDoctor,
                }}
                interfaceConfigOverwrite={{
                  SHOW_JITSI_WATERMARK: false,
                  SHOW_BRAND_WATERMARK: false,
                  SHOW_WATERMARK_FOR_GUESTS: false,
                  TOOLBAR_BUTTONS: [
                    "microphone",
                    "camera",
                    "chat",
                    "tileview",
                    "fullscreen",
                  ],
                }}
                getIFrameRef={(node) => {
                  const iframe = node as HTMLIFrameElement;
                  iframe.style.width = "100%";
                  iframe.style.height = "100%";
                  iframe.style.minHeight = "100%"; // force full height
                  iframe.allow = "camera; microphone; display-capture";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl text-white">
                {isDoctor ? "⏳ Ожидание пациента..." : "⏳ Ожидание врача..."}
              </div>
            )}
          </div>

          {/* Footer Button */}
          <div className="w-full flex justify-center">
            <button
              onClick={handleEndCall}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white flex justify-center items-center gap-2 px-6 py-3 rounded-lg shadow-md transition"
            >
              <PhoneOff className="w-6 h-6" />
              Завершить звонок
            </button>
          </div>
        </>
      ) : (
        <div className="text-white text-xl font-semibold mt-10">📞 Звонок завершен</div>
      )}

      {/* Floating Role Badge */}
      <div className="absolute top-4 left-4 bg-white text-[#001E80] px-4 py-2 rounded-full shadow text-xs sm:text-sm font-semibold">
        🏥 {isDoctor ? "Вы врач" : `Врач: ${doctor}`}
      </div>
    </div>
  );
};

// Wrap with suspense to support useSearchParams
const VideoCallPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen text-[#001E80]">
          <Loader2 className="animate-spin w-8 h-8 mr-2" />
          Подключение к встрече...
        </div>
      }
    >
      <FullVideoCallPage />
    </Suspense>
  );
};

export default VideoCallPage;
