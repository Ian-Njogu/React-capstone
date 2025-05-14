import React from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

const ChartDisplay = ({ data = [] }) => {
  // Safely handle non-array or undefined data
  const chartData = Array.isArray(data) ? data : [];
  const sortedData = [...chartData].sort((a, b) => {
    try {
      return new Date(a.date) - new Date(b.date);
    } catch {
      return 0;
    }
  });

  // Custom tooltip style
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-800">
            {label ? new Date(label).toLocaleDateString() : 'No date'}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="flex items-center" style={{ color: entry.color }}>
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
              {entry.name}: <span className="font-semibold ml-1">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Show empty state if no valid data
  if (sortedData.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Fitness Progress
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
          No fitness data available. Add some entries to see your progress.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Fitness Progress
        <span className="block w-16 h-1 bg-indigo-500 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Steps Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            Steps Per Day
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedData}>
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6B7280' }}
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                width={40}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: '#E5E7EB', fillOpacity: 0.3 }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB" 
              />
              <Bar 
                dataKey="steps" 
                fill="#4F46E5" 
                radius={[4, 4, 0, 0]}
                name="Daily Steps"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Calories & Workout Line Chart */}
        <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            <span className="inline-flex space-x-2">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
              <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
            </span>
            Calories & Workout Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sortedData}>
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6B7280' }}
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                width={40}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB" 
              />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Calories (kcal)"
              />
              <Line 
                type="monotone" 
                dataKey="workoutMinutes" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Workout (mins)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;