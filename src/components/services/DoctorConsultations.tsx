"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const statusTranslations: Record<string, string> = {
  pending: "⏳ В ожидании",
  ongoing: "🟢 В процессе",
  completed: "✅ Завершено",
  cancelled: "❌ Отменено",
};

interface Consultation {
  id: number;
  patient_name: string;
  patient_email: string;
  status: "pending" | "ongoing" | "completed" | "cancelled";
}

const DoctorConsultations: React.FC = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [newConsultation, setNewConsultation] = useState<Consultation | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seenConsultationIds = useRef(new Set<number>());
  const isSoundPlaying = useRef(false);
  const dismissedConsultations = useRef(new Set<number>());

  useEffect(() => {
    fetchConsultations();
    const interval = setInterval(() => {
      fetchNewConsultations();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchConsultations = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/consultations/", {
        headers: { Authorization: `Token ${token}` },
      });

      setConsultations(response.data);
    } catch (error) {
      console.error("Ошибка загрузки консультаций:", error);
      setError("Ошибка загрузки консультаций.");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    stopSound();
    if (newConsultation) {
      dismissedConsultations.current.add(newConsultation.id);
    }
    setNewConsultation(null);
  };

  const fetchNewConsultations = async () => {
    try {
      const response = await axios.get<Consultation[]>("http://127.0.0.1:8000/api/v1/consultations/", {
        headers: { Authorization: `Token ${token}` },
      });

      const newConsultations = response.data.filter(
        (consultation) =>
          consultation.status === "pending" &&
          !seenConsultationIds.current.has(consultation.id) &&
          !dismissedConsultations.current.has(consultation.id)
      );

      if (newConsultations.length > 0 && !newConsultation) {
        setNewConsultation(newConsultations[0]);
        newConsultations.forEach((c) => seenConsultationIds.current.add(c.id));
        setConsultations((prev) => [...prev, ...newConsultations]);

        if (!isSoundPlaying.current) {
          playSound();
        }
      }
    } catch (error) {
      console.error("Ошибка загрузки новых консультаций:", error);
    }
  };

  const playSound = () => {
    if (!isSoundPlaying.current) {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/notification.mp3");
        audioRef.current.loop = true;
      }

      audioRef.current
        .play()
        .then(() => {
          isSoundPlaying.current = true;
        })
        .catch((error) => console.error("Ошибка воспроизведения звука:", error));
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      isSoundPlaying.current = false;
    }
  };

  const handleAccept = async (consultationId: number) => {
    stopSound();
    dismissedConsultations.current.add(consultationId);
    setNewConsultation(null);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/consultations/${consultationId}/accept/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      if (response.status === 200) {
        const { meeting_id } = response.data;
        toast.success("Консультация принята! Переход к видеозвонку...");

        setConsultations((prev) => prev.filter((c) => c.id !== consultationId));
        seenConsultationIds.current.delete(consultationId);
        setTimeout(fetchConsultations, 3000);

        router.push(`/video-call?meetingId=${meeting_id}`);
      } else {
        toast.error("Ошибка при принятии консультации.");
      }
    } catch (error) {
      toast.error("Ошибка при принятии консультации.");
    }
  };

  const handleReject = async (consultationId: number) => {
    stopSound();
    dismissedConsultations.current.add(consultationId);
    setNewConsultation(null);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v1/consultations/${consultationId}/reject/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      toast.info("Консультация отклонена.");
      setConsultations((prev) => prev.filter((c) => c.id !== consultationId));
      seenConsultationIds.current.delete(consultationId);
      setTimeout(fetchConsultations, 3000);
    } catch (error) {
      toast.error("Ошибка при отклонении консультации.");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-xl relative">
      <h2 className="text-2xl font-semibold text-[#001E80]">Мои Консультации</h2>
      <p className="text-gray-600 mt-2">Список всех запланированных консультаций.</p>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* ✅ Popup */}
      {newConsultation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 px-4">
          <div className="bg-white w-full sm:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-[#001E80]">🆕 Новая консультация</h3>
            <p className="mt-2 text-lg">
              Пациент: <strong>{newConsultation.patient_name}</strong>
            </p>
            <p className="text-gray-600">📧 {newConsultation.patient_email}</p>
            <p className="text-gray-600 mt-2">
              📅 Статус:{" "}
              <strong>{statusTranslations[newConsultation.status]}</strong>
            </p>

            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => handleAccept(newConsultation.id)}
                className="bg-green-500 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
              >
                ✅ Принять
              </button>
              <button
                onClick={() => handleReject(newConsultation.id)}
                className="bg-red-500 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
              >
                ❌ Отклонить
              </button>
              <button
                onClick={closePopup}
                className="bg-gray-500 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
              >
                ❌ Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm sm:text-base border-collapse border min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Пациент</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Статус</th>
              <th className="border p-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {consultations
              .filter((c, i, self) => i === self.findIndex((t) => t.id === c.id))
              .map((consultation) => (
                <tr key={consultation.id} className="border">
                  <td className="border p-2">{consultation.patient_name}</td>
                  <td className="border p-2">{consultation.patient_email}</td>
                  <td className="border p-2">
                    <span className="px-2 py-1 rounded-lg bg-gray-200 text-sm">
                      {statusTranslations[consultation.status] || consultation.status}
                    </span>
                  </td>
                  <td className="border p-2">
                    {consultation.status === "pending" && (
                      <button
                        onClick={() => handleAccept(consultation.id)}
                        className="bg-green-500 px-4 py-1.5 rounded-md text-white text-sm"
                      >
                        ✅ Принять
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorConsultations;
