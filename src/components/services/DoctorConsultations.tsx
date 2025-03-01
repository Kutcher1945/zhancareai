"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DoctorConsultations: React.FC = () => {
  const { user, token } = useAuth();
  const router = useRouter();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConsultations(); // Initial fetch

    const interval = setInterval(() => {
      fetchConsultations(); // Background fetch
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchConsultations = async () => {
    setError(null);

    try {
      const response = await axios.get("https://zhancareai-back.vercel.app/api/v1/consultations/", {
        headers: { Authorization: `Token ${token}` },
      });

      // ✅ Only update state if there's new data
      if (JSON.stringify(response.data) !== JSON.stringify(consultations)) {
        setConsultations(response.data);
      }
    } catch (error) {
      setError("Ошибка загрузки консультаций.");
    }
  };

  const handleAccept = async (consultationId: number) => {
    try {
      const response = await axios.post(
        `https://zhancareai-back.vercel.app/api/v1/consultations/${consultationId}/accept/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Консультация принята! Уведомляем пациента...");

        const notifyResponse = await axios.post(
          `https://zhancareai-back.vercel.app/api/v1/consultations/${consultationId}/notify-patient/`,
          {},
          { headers: { Authorization: `Token ${token}` } }
        );

        if (notifyResponse.status === 200) {
          toast.success("Пациент уведомлен! Начинаем звонок...");
          router.push(`/video-call?meetingId=${notifyResponse.data.meeting_id}`);
        } else {
          toast.error("Не удалось уведомить пациента.");
        }
      } else {
        toast.error("Не удалось принять консультацию.");
      }
    } catch (error) {
      toast.error("Ошибка при принятии консультации.");
    }
  };

  const handleReject = async (consultationId: number) => {
    try {
      await axios.post(
        `https://zhancareai-back.vercel.app/api/v1/consultations/${consultationId}/reject/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      toast.info("Консультация отклонена.");
      fetchConsultations();
    } catch (error) {
      toast.error("Ошибка при отклонении консультации.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-[#001E80]">Мои Консультации</h2>
      <p className="text-gray-600 mt-2">Список всех запланированных консультаций.</p>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {consultations.length === 0 ? (
        <p className="text-gray-600 mt-4">Нет запланированных консультаций.</p>
      ) : (
        <ul>
          {consultations.map((consultation) => (
            <li key={consultation.id} className="mt-4 p-4 border rounded-lg">
              <p>🧑 Пациент: {consultation.patient.name} ({consultation.patient.email})</p>
              <p>📅 Статус: <span className="font-semibold">{consultation.status}</span></p>

              {consultation.status === "pending" && (
                <div className="mt-2">
                  <button 
                    onClick={() => handleAccept(consultation.id)} 
                    className="bg-green-500 px-4 py-2 rounded-lg text-white mr-2"
                  >
                    ✅ Принять и начать звонок
                  </button>

                  <button 
                    onClick={() => handleReject(consultation.id)} 
                    className="bg-red-500 px-4 py-2 rounded-lg text-white"
                  >
                    ❌ Отклонить
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorConsultations;
