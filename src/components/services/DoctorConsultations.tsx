"use client";

import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion";

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
    const interval = setInterval(fetchNewConsultations, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchConsultations = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.get<Consultation[]>("/consultations/");
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
      const response = await api.get<Consultation[]>("/consultations/");
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
      const response = await api.post<{ meeting_id: string }>(`/consultations/${consultationId}/accept/`, {});
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
      console.error("Ошибка при принятии консультации:", error);
      toast.error("Ошибка при принятии консультации.");
    }
  };

  const handleReject = async (consultationId: number) => {
    stopSound();
    dismissedConsultations.current.add(consultationId);
    setNewConsultation(null);

    try {
      await api.post(`/consultations/${consultationId}/reject/`, {});
      toast.info("Консультация отклонена.");
      setConsultations((prev) => prev.filter((c) => c.id !== consultationId));
      seenConsultationIds.current.delete(consultationId);
      setTimeout(fetchConsultations, 3000);
    } catch (error) {
      console.error("Ошибка при отклонении консультации:", error);
      toast.error("Ошибка при отклонении консультации.");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-xl rounded-2xl relative">
      <h2 className="text-2xl font-bold text-[#001E80]">Мои Консультации</h2>
      <p className="text-gray-600 mt-2">Список всех запланированных консультаций.</p>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* ✅ Popup */}
      <AnimatePresence>
  {newConsultation && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 px-4"
    >
      <div className="bg-gradient-to-r from-[#001E80] to-[#3A50FF] w-full sm:w-1/2 lg:w-1/3 p-6 rounded-xl shadow-xl space-y-4">
        <h3 className="text-xl font-bold text-white">🆕 Новая консультация</h3>
        <p className="text-lg text-white">
          Пациент: <strong>{newConsultation.patient_name}</strong>
        </p>
        <p className="text-gray-200">📧 {newConsultation.patient_email}</p>
        <p className="text-gray-200">
          📅 Статус: <strong>{statusTranslations[newConsultation.status]}</strong>
        </p>

        <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={() => handleAccept(newConsultation.id)}
            className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-2 rounded-lg text-white w-full sm:w-auto hover:opacity-90 transition"
          >
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Принять
          </button>
          <button
            onClick={() => handleReject(newConsultation.id)}
            className="bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg text-white w-full sm:w-auto hover:opacity-90 transition"
          >
            <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
            Отклонить
          </button>
          <button
            onClick={closePopup}
            className="bg-gray-500 px-4 py-2 rounded-lg text-white w-full sm:w-auto hover:opacity-85 transition"
          >
            <FontAwesomeIcon icon={faWindowClose} className="mr-2" />
            Закрыть
          </button>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      {/* ✅ Table */}
      <div className="mt-6 overflow-x-auto">
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
            {consultations.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Консультации отсутствуют.
                </td>
              </tr>
            ) : (
              consultations
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
                          className="bg-gradient-to-r from-green-600 to-green-500 px-3 py-1.5 rounded-md text-white text-sm hover:opacity-90 transition"
                        >
                          ✅ Принять
                        </button>
                      )}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorConsultations;
