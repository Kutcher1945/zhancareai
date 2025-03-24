"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const Appointments = () => {
  const { token } = useAuth();
  const [doctors, setDoctors] = useState<{ id: number; name: string; email: string }[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fetchingDoctors, setFetchingDoctors] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setFetchingDoctors(true);
    try {
      const response = await axios.get("https://zhancareai-back.vercel.app/api/v1/auth/doctor/available/", {
        headers: { Authorization: `Token ${token}` },
      });
      setDoctors(response.data.doctors || []);
    } catch (err) {
      console.error("Ошибка загрузки врачей:", err);
      setError("⚠️ Не удалось загрузить список врачей.");
    } finally {
      setFetchingDoctors(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDoctor || !appointmentTime) {
      toast.error("Пожалуйста, выберите врача и время приема.");
      return;
    }

    if (new Date(appointmentTime) <= new Date()) {
      toast.error("Пожалуйста, выберите дату и время в будущем.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(
        "https://zhancareai-back.vercel.app/api/v1/appointments/",
        {
          doctor_id: selectedDoctor,
          appointment_time: appointmentTime,
        },
        { headers: { Authorization: `Token ${token}` } }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("✅ Запись успешно создана!");
        setSelectedDoctor(null);
        setAppointmentTime("");
      } else {
        toast.error("❌ Не удалось создать запись.");
      }
    } catch (err: any) {
      console.error("Ошибка создания записи:", err);
      toast.error(err?.response?.data?.error || "Ошибка сервера.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full sm:max-w-3xl sm:mx-auto px-4 sm:px-0 py-8">
      <div className="p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-[#001E80]">📅 Запись на прием</h2>
        <p className="text-gray-600 mt-2">Выберите удобное время для консультации с врачом.</p>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Doctor Selection */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Выберите врача:</label>
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={selectedDoctor || ""}
            onChange={(e) => setSelectedDoctor(Number(e.target.value))}
          >
            <option value="">-- Выберите врача --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.email})
              </option>
            ))}
          </select>

          {fetchingDoctors && (
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Загрузка списка врачей...
            </p>
          )}
        </div>

        {/* Appointment Time */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Дата и время:</label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            min={new Date().toISOString().slice(0, 16)} // prevent past dates
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-6 bg-[#001E80] text-white px-6 py-3 rounded-lg transition font-medium ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#0030d8]"
          }`}
        >
          {loading ? "Создание записи..." : "Записаться"}
        </button>
      </div>
    </div>
  );
};

export default Appointments;
