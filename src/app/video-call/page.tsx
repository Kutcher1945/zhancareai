"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { PhoneOff, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

const API_KEY = "QqkMxELY0YVGkCx17Vya04Sq9nGvCahu";
const ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

const FullVideoCallPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const meetingId = searchParams.get("meetingId");
  const doctor = searchParams.get("doctor") || "Неизвестный врач";
  const userRole = searchParams.get("role") || "patient";
  const userName = searchParams.get("name") || "Гость";

  const [callActive, setCallActive] = useState(true);
  const [otherPartyJoined, setOtherPartyJoined] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<{ user: string; response: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDoctor = userRole === "doctor";
  const safeUserName = userName || "guest";
  const userEmail = `${safeUserName.toLowerCase().replace(/\s+/g, "")}@example.com`;
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = language === "ru" ? ru.chat : kz.chat;

  const handleEndCall = () => {
    setCallActive(false);
    router.push("/profile");
  };

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

  function formatResponse(text: string): string {
    // Add line breaks after periods followed by capital letters
    const formatted = text
      .replace(/\n/g, "<br/>") // preserve manual newlines
      .replace(/([•\-–]\s+)/g, "<br/><strong>$1</strong>") // make bullet points bold
      .replace(/(\d+\.\s+)/g, "<br/><strong>$1</strong>") // numbered steps
      .replace(/([А-ЯA-Z][^:]{2,}):/g, "<br/><strong>$1:</strong>"); // bold any headers before colon
    return formatted;
  }
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    const timeout = setTimeout(() => setOtherPartyJoined(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (!meetingId) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold text-xl">
        ❌ Ошибка: Отсутствует идентификатор встречи!
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 relative">
      {/* Floating Badge */}
      <div className="absolute top-4 left-4 bg-blue-700 text-white px-4 py-2 rounded-full shadow-md text-xs sm:text-sm z-10">
        {isDoctor ? "👨‍⚕️ Вы врач" : `👨‍⚕️ Врач: ${doctor}`}
      </div>

      {/* Header */}
      <header className="bg-white shadow p-4 text-center">
        <h1 className="text-xl font-bold">{isDoctor ? "Вы ведете консультацию" : `Звонок с доктором ${doctor}`}</h1>
        <p className="text-sm text-gray-500">ID встречи: {meetingId}</p>
      </header>

      {callActive ? (
        <>
          {/* Main Content */}
          <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* Video Section */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden relative">
              {otherPartyJoined ? (
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
                    TOOLBAR_BUTTONS: ["microphone", "camera", "chat", "tileview", "fullscreen"],
                  }}
                  getIFrameRef={(node) => {
                    const iframe = node as HTMLIFrameElement;
                    iframe.style.width = "100%";
                    iframe.style.height = "100%";
                    iframe.allow = "camera; microphone; display-capture";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg text-gray-700">
                  {isDoctor ? "⏳ Ожидание пациента..." : "⏳ Ожидание врача..."}
                </div>
              )}
            </div>

            {/* AI Chat */}
            <div className="col-span-1 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
              <div className="bg-blue-700 text-white px-4 py-3 text-sm font-semibold">
                🤖 {t.title}
              </div>
              <div ref={chatBoxRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 text-sm">
                {messages.map((msg, idx) => (
                  <div key={idx}>
                    <div className="text-right">
                      <div className="inline-block bg-blue-500 text-white p-2 rounded-lg max-w-[80%]">
                        {msg.user}
                      </div>
                    </div>
                    {msg.response && (
                      <div className="text-left mt-1">
                        <div
                          className="inline-block bg-gray-200 text-gray-900 p-3 rounded-xl max-w-[90%] whitespace-pre-wrap leading-relaxed text-sm"
                          dangerouslySetInnerHTML={{ __html: formatResponse(msg.response) }}
                        />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="text-left mt-1">
                    <div className="inline-block bg-gray-200 text-gray-700 p-2 rounded-lg max-w-[80%]">
                      {t.typing}...
                    </div>
                  </div>
                )}
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
              <div className="p-3 border-t bg-white flex items-center space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
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
          </main>

          {/* Footer */}
          <footer className="sticky bottom-0 bg-white border-t p-4 flex justify-center">
            <button
              onClick={handleEndCall}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg"
            >
              <PhoneOff className="w-5 h-5" />
              Завершить звонок
            </button>
          </footer>
        </>
      ) : (
        <div className="text-center mt-20 text-xl font-semibold text-gray-700">
          📞 Звонок завершен
        </div>
      )}
    </div>
  );
};

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
