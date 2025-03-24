"use client";

import React, { useState, useEffect, useRef } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useLanguage } from "@/context/LanguageContext";
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

interface VideoCallProps {
  meetingId: string;
  doctor: string;
  onEndCall: () => void;
  isDoctor: boolean;
  userName: string;
  jwtToken?: string;
}

const API_KEY = "QqkMxELY0YVGkCx17Vya04Sq9nGvCahu";
const ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

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

  const [messages, setMessages] = useState<{ user: string; response: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const { language } = useLanguage();
  const t = language === "ru" ? ru.chat : kz.chat;

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { user: userInput, response: "" };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);
    setError("");

    try {
      const payload = {
        model: "open-mistral-nemo",
        temperature: 0.3,
        top_p: 1,
        max_tokens: 500,
        messages: [
          { role: "system", content: t.assistantInstruction },
          { role: "user", content: userInput },
        ],
      };

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(t.fetchError);

      const data = await res.json();

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return [...prev.slice(0, -1), { ...last, response: data.choices[0].message.content }];
      });
    } catch (err) {
      setError(t.genericError);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="min-h-screen bg-[#001E80] flex flex-col overflow-hidden">
      {/* 🔵 Header */}
      <div className="bg-[#001E80] text-white text-center py-4 text-lg font-semibold">
        {isDoctor
          ? "Вы ведете консультацию"
          : `Звонок с доктором ${doctor || "Неизвестный врач"}`}
        <p className="text-sm text-gray-200">Meeting ID: {meetingId}</p>
      </div>

      {/* ⚙️ Main Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* 📹 Video Container */}
        <div className="flex-1 bg-black min-w-0">
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={meetingId}
            userInfo={{ displayName: safeUserName, email: userEmail }}
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
            jwt={jwtToken}
            getIFrameRef={(node) => {
              const iframe = node as HTMLIFrameElement;
              iframe.style.height = "100%";
              iframe.style.width = "100%";
              iframe.style.border = "none";
              iframe.allow = "camera; microphone; display-capture";
            }}
          />
        </div>

        {/* 💬 AI Chat Container */}
        <div className="w-[360px] min-w-[320px] max-w-sm bg-white flex flex-col border-l border-gray-200 shadow-xl">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3 text-sm font-semibold">
            {t.title}
          </div>

          {/* Chat Messages */}
          <div
            ref={chatBoxRef}
            className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 text-sm"
          >
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div className="text-right">
                  <div className="inline-block bg-blue-600 text-white rounded-lg p-2 max-w-[85%]">
                    {msg.user}
                  </div>
                </div>
                {msg.response && (
                  <div className="text-left mt-1">
                    <div className="inline-block bg-[#001E80] text-white rounded-lg p-2 max-w-[85%]">
                      {msg.response}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-left mt-1">
                <div className="inline-block bg-[#001E80] text-white rounded-lg p-2 max-w-[85%]">
                  {t.typing}...
                </div>
              </div>
            )}
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t bg-white flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              placeholder={t.placeholder}
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? t.sending : t.sendButton}
            </button>
          </div>
        </div>
      </div>

      {/* 🔴 End Call Button */}
      <div className="bg-[#001E80] py-3 flex justify-center">
        <button
          onClick={onEndCall}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Завершить звонок
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
