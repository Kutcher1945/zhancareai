"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const DoctorDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://zhancareai-back.vercel.app/api/v1/consultations/", {
        headers: { Authorization: `Token ${token}` },
      });

      setConsultations(response.data);
    } catch (error) {
      setError("Ошибка загрузки консультаций.");
    }

    setLoading(false);
  };

  const handleAccept = async (consultationId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://zhancareai-back.vercel.app/api/v1/consultations/${consultationId}/accept/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      toast.success("Консультация принята! Начинаем звонок...");
      fetchConsultations();
    } catch (error) {
      toast.error("Ошибка при принятии консультации.");
    }
  };

  const handleReject = async (consultationId: number) => {
    try {
      const token = localStorage.getItem("token");
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
      <h2 className="text-2xl font-semibold text-[#001E80]">Панель врача</h2>
      <p className="text-gray-600 mt-2">Список ожидающих консультаций</p>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ul>
        {consultations.map((consultation) => (
          <li key={consultation.id} className="mt-4 p-4 border rounded-lg">
            <p>Пациент: {consultation.patient.name} ({consultation.patient.email})</p>
            <button onClick={() => handleAccept(consultation.id)} className="bg-green-500 px-4 py-2 rounded-lg text-white">Принять</button>
            <button onClick={() => handleReject(consultation.id)} className="bg-red-500 px-4 py-2 ml-2 rounded-lg text-white">Отклонить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
