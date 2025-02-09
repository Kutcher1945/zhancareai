"use client";
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext"; // Assuming a LanguageContext exists

// Translation files
import ru from "@/locales/ru.json";
import kz from "@/locales/kz.json";

export const ChatComponent = ({ onClose }: { onClose: () => void }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<{ user: string; response: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { language } = useLanguage();
  const translations = language === "ru" ? ru.chat : kz.chat;

  const API_KEY = "QqkMxELY0YVGkCx17Vya04Sq9nGvCahu";
  const ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { user: userInput, response: "" };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);
    setError("");

    try {
      const assistant_instruction = translations.assistantInstruction;

      const payload = {
        model: "open-mistral-nemo",
        temperature: 0.3,
        top_p: 1,
        max_tokens: 500,
        messages: [
          { role: "system", content: assistant_instruction },
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

      if (!res.ok) {
        const errorDetails = await res.json();
        throw new Error(translations.fetchError);
      }

      const data = await res.json();

      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        return [...prev.slice(0, -1), { ...lastMessage, response: data.choices[0].message.content }];
      });
    } catch (err) {
      setError(translations.genericError);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[90%] max-w-xs sm:max-w-lg bg-white shadow-lg rounded-lg overflow-hidden z-50"
      style={{ maxHeight: "60vh" }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 sm:p-3 flex justify-between items-center rounded-t-lg">
        <h2 className="text-xs sm:text-lg font-semibold">{translations.title}</h2>
        <button className="text-white hover:text-gray-300 text-sm sm:text-lg" onClick={onClose}>
          ✕
        </button>
      </div>

      <div ref={messageContainerRef} className="h-[40vh] overflow-y-auto p-2 sm:p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white p-2 sm:p-3 rounded-lg max-w-[70%] text-xs sm:text-sm">
                {msg.user}
              </div>
            </div>
            {msg.response && (
              <div className="flex justify-start mt-2">
                <div
                  className="text-white p-2 sm:p-3 rounded-lg max-w-[70%] text-xs sm:text-sm"
                  style={{
                    background: "linear-gradient(to right, #001E80, #3A50FF)",
                  }}
                >
                  {msg.response}
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mt-2">
            <div
              className="text-white p-2 sm:p-3 rounded-lg max-w-[70%] flex items-center"
              style={{
                background: "linear-gradient(to right, #001E80, #3A50FF)",
              }}
            >
              <span>{translations.typing}</span>
              <span className="ml-2 flex space-x-1">
                <span className="animate-bounce w-1.5 h-1.5 bg-white rounded-full"></span>
                <span className="animate-bounce delay-150 w-1.5 h-1.5 bg-white rounded-full"></span>
                <span className="animate-bounce delay-300 w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>

      <div className="border-t p-2 sm:p-4 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            placeholder={translations.placeholder}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 text-xs sm:text-sm"
            disabled={loading}
          />
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? translations.sending : translations.sendButton}
          </button>
        </div>
      </div>
    </div>
  );
};
