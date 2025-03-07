"use client";

import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

interface VideoCallProps {
  meetingId: string;
  doctor: string;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ meetingId, doctor, onEndCall }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-[#001E80]">Звонок с доктором {doctor}</h2>
      <p className="text-gray-600">Meeting ID: {meetingId}</p>

      <div className="w-full mt-4">
        <JitsiMeeting
          roomName={meetingId}
          configOverwrite={{
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            disableModeratorIndicator: true,
            enableClosePage: false,
          }}
          interfaceConfigOverwrite={{
            SHOW_JITSI_WATERMARK: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            TOOLBAR_BUTTONS: ["microphone", "camera", "chat", "hangup"], // Customize buttons
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "600px";
            iframeRef.style.width = "100%";
          }}
        />
      </div>

      <button
        className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:opacity-85 transition"
        onClick={onEndCall}
      >
        Завершить звонок
      </button>
    </div>
  );
};

export default VideoCall;
