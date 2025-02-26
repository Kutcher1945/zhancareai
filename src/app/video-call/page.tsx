"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import VideoCall from "@/components/video/VideoCall";

const VideoCallPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const meetingId = searchParams.get("meetingId");
  const doctor = searchParams.get("doctor") || "Неизвестный врач"; // Ensure we always have a doctor name

  const [callActive, setCallActive] = useState(true);

  // ✅ Handle ending the call
  const handleEndCall = () => {
    setCallActive(false);
    router.push("/profile"); // Redirect back to the profile page
  };

  // ✅ Ensure we only render content if `meetingId` is available
  if (!meetingId) {
    return <div className="text-center text-red-500 mt-6">❌ Ошибка: Отсутствует идентификатор встречи!</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      {callActive ? (
        <VideoCall meetingId={meetingId} doctor={doctor} onEndCall={handleEndCall} />
      ) : (
        <div className="text-center text-gray-600 mt-6">📞 Звонок завершен</div>
      )}
    </div>
  );
};

const VideoCallPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="text-center mt-6">🔄 Загрузка...</div>}>
      <VideoCallPageContent />
    </Suspense>
  );
};

export default VideoCallPage;
