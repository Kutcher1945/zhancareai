"use client";

import { Clock } from "lucide-react";

const activities = [
  { time: "08:30", description: "Вы успешно записались на консультацию к доктору Иванову." },
  { time: "09:00", description: "Доктор подтвердил вашу консультацию." },
  { time: "10:15", description: "Консультация началась." },
  { time: "11:00", description: "Консультация завершена. Рекомендации отправлены на почту." },
];

export const ActivityLog = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6 space-y-4 border border-gray-100">
      <h2 className="text-2xl font-bold text-[#001E80] mb-4 flex items-center gap-2">
        <Clock className="w-6 h-6" />
        История активности
      </h2>

      <ul className="space-y-4">
        {activities.map((activity, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="text-[#001E80] font-bold">{activity.time}</div>
            <div className="text-gray-700">{activity.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
