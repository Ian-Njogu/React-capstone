import React from "react";

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 h-12 w-12 rounded-full ${color} flex items-center justify-center text-xl mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;