"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faCalendar, faNotesMedical, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  first_name: string;
  last_name: string;
  email: string;
//   phone: string;
//   birth_date: string;
//   medical_history: string;
}

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#001E80] mb-4">Карточка пациента</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3 border p-3 rounded-lg">
          <FontAwesomeIcon icon={faUser} className="text-[#001E80]" />
          <input
            type="text"
            value={`${user.first_name} ${user.last_name}`}
            className="flex-1 outline-none bg-transparent"
            disabled
          />
        </div>

        <div className="flex items-center gap-3 border p-3 rounded-lg">
          <FontAwesomeIcon icon={faEnvelope} className="text-[#001E80]" />
          <input
            type="email"
            value={user.email}
            className="flex-1 outline-none bg-transparent"
            disabled
          />
        </div>
      </div>

      {/* Recent Appointments Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-[#001E80] flex items-center gap-2">
          <FontAwesomeIcon icon={faClipboardList} /> Последние консультации
        </h3>
        <ul className="mt-3 text-gray-700 text-sm">
          <li>📅 20.02.2025 - Д-р Иванов (Терапевт)</li>
          <li>📅 15.02.2025 - Д-р Смирнова (Кардиолог)</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDetails;