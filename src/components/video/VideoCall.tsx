"use client";

import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

interface VideoCallProps {
  meetingId: string;
  doctor: string;
  onEndCall: () => void;
  isDoctor: boolean;
  userName: string;
  jwtToken?: string;
}

const VideoCall: React.FC<VideoCallProps> = ({
  meetingId,
  doctor,
  onEndCall,
  isDoctor,
  userName,
  jwtToken,
}) => {
  const safeUserName = userName || "guest";
  const userEmail = `${safeUserName.toLowerCase().replace(/\s+/g, "")}@example.com`;

  return (
    <div className="min-h-screen bg-[#001E80] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full lg:max-w-[1280px] xl:max-w-[1440px] p-4 sm:p-8 flex flex-col space-y-6">
        <h2 className="text-3xl font-bold text-[#001E80] text-center">
          {isDoctor ? "Вы ведете консультацию" : `Звонок с доктором ${doctor || "Неизвестный врач"}`}
        </h2>

        <p className="text-gray-500 text-sm text-center break-words">Meeting ID: {meetingId}</p>

        <div className="w-full h-[75vh] sm:h-[80vh] rounded-lg overflow-hidden border border-gray-200">
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={meetingId}
            userInfo={{
              displayName: safeUserName,
              email: userEmail,
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
                // Removed "hangup" to use our own
              ],
            }}
            jwt={jwtToken}
            getIFrameRef={(node) => {
              const iframe = node as HTMLIFrameElement;
              iframe.style.height = "100%";
              iframe.style.width = "100%";
              iframe.allow = "camera; microphone; display-capture";
            }}
          />
        </div>

        <button
          onClick={onEndCall}
          className="self-center mt-4 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          Завершить звонок
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
