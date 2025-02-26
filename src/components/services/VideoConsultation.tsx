"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const VideoConsultation: React.FC = () => {
  const { user, token } = useAuth();
  const router = useRouter();
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<{ id: number; name: string; email: string } | null>(null);
  const [doctors, setDoctors] = useState<{ id: number; name: string; email: string }[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [waitingForDoctor, setWaitingForDoctor] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (waitingForDoctor && meetingId) {
      pollForDoctorAcceptance();
    }
  }, [waitingForDoctor, meetingId]);

  // 🔹 Получение доступных врачей
  const fetchDoctors = async () => {
    setError(null);
    try {
      if (!token) {
        setError("🚫 Вы не авторизованы! Пожалуйста, войдите в систему.");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/v1/auth/doctor/available/", {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 200) {
        setDoctors(response.data.doctors || []);
      } else {
        setError("⚠️ Нет доступных врачей.");
      }
    } catch (error: any) {
      console.error("❌ Ошибка загрузки врачей:", error);
      setError("⚠️ Ошибка загрузки списка врачей. Попробуйте позже.");
    }
  };

  // 🔹 Начало консультации (пациент вызывает врача)
  const handleStartCall = async () => {
    if (!selectedDoctorId) {
      setError("⚠️ Пожалуйста, выберите врача перед началом звонка.");
      return;
    }
  
    setError(null);
    setLoading(true);
    setWaitingForDoctor(true); // ✅ Show "Waiting for Doctor" message
    
    try {
      if (!token) {
        setError("🚫 Вы не авторизованы! Пожалуйста, войдите в систему.");
        setLoading(false);
        setWaitingForDoctor(false);
        return;
      }
  
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/consultations/start/",
        { doctor_id: selectedDoctorId },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
  
      if (response.status === 200 && response.data) {
        setDoctor(response.data.doctor);
        setMeetingId(response.data.meeting_id);
        toast.success("Консультация запрошена! Ожидаем подтверждения врача.");
      } else {
        setError("⚠️ Не удалось начать консультацию.");
        setWaitingForDoctor(false);
      }
    } catch (error: any) {
      console.error("❌ Ошибка начала консультации:", error);
      setError("⚠️ Ошибка при запуске звонка. Попробуйте позже.");
      setWaitingForDoctor(false);
    }
  
    setLoading(false);
  };
  

  // 🔹 Ожидание подтверждения врача
  const pollForDoctorAcceptance = () => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/consultations/status/?meeting_id=${meetingId}`,
          { headers: { Authorization: `Token ${token}` } }
        );

        if (response.status === 200 && response.data.status === "ongoing") {
          toast.success("Доктор принял звонок! Подключаемся...");
          setWaitingForDoctor(false);
          clearInterval(interval); // ✅ Останавливаем проверку
          router.push(`/video-call?meetingId=${meetingId}`);
        }
      } catch (error) {
        console.error("Ошибка проверки статуса консультации:", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-[#001E80]">Видео консультация</h2>
      <p className="text-gray-600 mt-2">Выберите врача для онлайн-видеозвонка.</p>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* 🔹 Выбор врача */}
      <div className="mt-4">
        <label className="block text-gray-700">Выберите доступного врача:</label>
        <select
          className="w-full p-2 border rounded-lg mt-2"
          value={selectedDoctorId || ""}
          onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
        >
          <option value="">-- Выберите врача --</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name} ({doc.email})
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Кнопка начала консультации */}
      <button
        onClick={handleStartCall}
        className={`mt-4 bg-[#001E80] text-white px-6 py-3 rounded-lg transition ${
          loading || waitingForDoctor ? "opacity-50 cursor-not-allowed" : "hover:opacity-85"
        }`}
        disabled={loading || !selectedDoctorId || waitingForDoctor}
      >
        {waitingForDoctor ? "Ожидание врача..." : "Начать звонок"}
      </button>
    </div>
  );
};

export default VideoConsultation;
