"use client";

export const TabSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-6 bg-gray-200 rounded w-1/2" />
      <div className="h-40 bg-gray-200 rounded" />
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-6 bg-gray-200 rounded w-2/4" />
    </div>
  );
};
