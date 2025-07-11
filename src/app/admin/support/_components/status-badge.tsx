import React from "react";
export const StatusBadge = ({ status }: any) => {
  const statusStyles = {
    open: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
    pending: "bg-purple-100 text-purple-800",
  };
  const statusLabels = {
    open: "Open",
    "in-progress": "In Progress",
    resolved: "Resolved",
    closed: "Closed",
    pending: "Pending",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {statusLabels[status] || "Unknown"}
    </span>
  );
};
