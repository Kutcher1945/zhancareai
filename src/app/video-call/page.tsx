"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import VideoCall from "@/components/video/VideoCall";
import { Loader2, PhoneOff } from "lucide-react";

const VideoCallPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const meetingId = searchParams.get("meetingId");
  const doctor = searchParams.get("doctor") || "Неизвестный врач"; // Default if missing
  const userRole = searchParams.get("role") || "patient"; // Check if user is a doctor or patient

  const [callActive, setCallActive] = useState(true);
  const [otherPartyJoined, setOtherPartyJoined] = useState(false); // Check if the other party is online

  // ✅ Handle ending the call
  const handleEndCall = () => {
    setCallActive(false);
    router.push("/profile"); // Redirect back to profile page after ending call
  };

  // ✅ Simulate checking if the other party joined
  useEffect(() => {
    // Simulated WebRTC event listener (replace with real WebRTC implementation)
    const checkOtherParty = setTimeout(() => {
      setOtherPartyJoined(true);
    }, 5000); // Assume the other person joins in 5 seconds

    return () => clearTimeout(checkOtherParty);
  }, []);

  if (!meetingId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        ❌ Ошибка: Отсутствует идентификатор встречи!
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#001E80]">
      {/* ✅ Video Call Container */}
      {callActive ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* 🔹 Render different UI for doctors and patients */}
          {userRole === "doctor" ? (
            <>
              {/* Doctor sees patient's video first */}
              {otherPartyJoined ? (
                <VideoCall meetingId={meetingId} doctor={doctor} onEndCall={handleEndCall} />
              ) : (
                <div className="text-white text-xl">⏳ Ожидание пациента...</div>
              )}
            </>
          ) : (
            <>
              {/* Patient sees doctor's video first */}
              {otherPartyJoined ? (
                <VideoCall meetingId={meetingId} doctor={doctor} onEndCall={handleEndCall} />
              ) : (
                <div className="text-white text-xl">⏳ Ожидание врача...</div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-xl font-semibold">
          📞 Звонок завершен
        </div>
      )}

      {/* ✅ Floating End Call Button */}
      {callActive && (
        <button
          onClick={handleEndCall}
          className="absolute bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition"
        >
          <PhoneOff className="w-5 h-5" />
          Завершить звонок
        </button>
      )}

      {/* ✅ Doctor Name */}
      <div className="absolute top-6 left-6 bg-white text-[#001E80] px-4 py-2 rounded-full shadow-md text-lg font-semibold">
        🏥 {userRole === "doctor" ? "Вы врач" : `Врач: ${doctor}`}
      </div>
    </div>
  );
};

const VideoCallPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen text-[#001E80]">
          <Loader2 className="animate-spin w-8 h-8 mb-4" />
          🔄 Подключение к встрече...
        </div>
      }
    >
      <VideoCallPageContent />
    </Suspense>
  );
};

export default VideoCallPage;
