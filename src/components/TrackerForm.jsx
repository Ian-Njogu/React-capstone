import React, { useState, useEffect } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/LocalStorage"; // Update the import path
import StatCard from "./StatCard.jsx";
import FormInput from "./FormInput";

const STORAGE_KEY = "fitnessData";

export const TrackerDashboard = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    steps: "",
    calories: "",
    workoutMinutes: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadedData = loadFromLocalStorage();
    setEntries(loadedData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      id: Date.now(),
      steps: Number(formData.steps),
      calories: Number(formData.calories),
      workoutMinutes: Number(formData.workoutMinutes),
    };
    
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveToLocalStorage(updatedEntries);
    setFormData({ date: "", steps: "", calories: "", workoutMinutes: "" });
  };

  // Calculate totals for dashboard metrics
  const totalSteps = entries.reduce((sum, entry) => sum + (entry.steps || 0), 0);
  const totalCalories = entries.reduce((sum, entry) => sum + (entry.calories || 0), 0);
  const totalMinutes = entries.reduce((sum, entry) => sum + (entry.workoutMinutes || 0), 0);
  const avgSteps = entries.length > 0 ? Math.round(totalSteps / entries.length) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Fitness Dashboard</h1>
          <p className="text-gray-600">Track your health and wellness journey</p>
        </header>

        {/* Stats Cards - These will now update automatically */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Steps" 
            value={totalSteps.toLocaleString()} 
            icon="👣" 
            color="bg-blue-100 text-blue-600"
          />
          <StatCard 
            title="Calories Burned" 
            value={totalCalories.toLocaleString()} 
            icon="🔥" 
            color="bg-orange-100 text-orange-600"
          />
          <StatCard 
            title="Workout Minutes" 
            value={totalMinutes} 
            icon="⏱️" 
            color="bg-purple-100 text-purple-600"
          />
          <StatCard 
            title="Avg Steps/Day" 
            value={avgSteps.toLocaleString()} 
            icon="📊" 
            color="bg-green-100 text-green-600"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Entry Card */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Steps"
                type="number"
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                required
                min="0"
              />
              <FormInput
                label="Calories (kcal)"
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                required
                min="0"
              />
              <FormInput
                label="Workout Minutes"
                type="number"
                name="workoutMinutes"
                value={formData.workoutMinutes}
                onChange={handleChange}
                required
                min="0"
              />
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Add Entry
              </button>
            </form>
          </div>

          {/* Recent Entries Card */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Entries</h2>
            {entries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Steps</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {entries.slice(0, 5).map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.steps.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.calories.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.workoutMinutes} mins
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No entries yet. Add your first entry to see data here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable components (StatCard and FormInput) remain the same as before