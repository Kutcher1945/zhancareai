"use client";

import React, { useEffect, useRef, useState } from "react";

interface VideoCallProps {
  meetingId: string;
  doctor: string;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ meetingId, doctor, onEndCall }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startVideoCall = async () => {
      try {
        console.log("📹 Запрос доступа к камере...");
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        
        setStream(userStream);
        if (localVideoRef.current) localVideoRef.current.srcObject = userStream;
      } catch (error: any) {
        if (error.name === "NotReadableError") {
          setError("🚫 Ваша камера уже используется другим приложением.");
        } else if (error.name === "NotAllowedError") {
          setError("🚫 Доступ к камере и микрофону запрещен. Разрешите доступ в настройках.");
        } else {
          setError("❌ Ошибка доступа к камере: " + error.message);
        }
        console.error("Error accessing webcam:", error);
      }
    };

    startVideoCall();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleEndCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    onEndCall();
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-[#001E80]">Звонок с доктором {doctor}</h2>
      <p className="text-gray-600">Meeting ID: {meetingId}</p>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex gap-6 mt-6">
        <video ref={localVideoRef} autoPlay playsInline className="w-64 h-64 bg-black rounded-lg shadow-lg" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-64 h-64 bg-black rounded-lg shadow-lg" />
      </div>

      <button
        className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:opacity-85 transition"
        onClick={handleEndCall}
      >
        Завершить звонок
      </button>
    </div>
  );
};

export default VideoCall;
