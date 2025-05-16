// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Sidebar from './components/Sidebar';
import { TrackerDashboard } from './components/TrackerForm';
import ChartDisplay from './components/ChartDisplay';
import Signup from './components/Register';
import Login from './components/login'
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-auto md:ml-64">
            <Routes>
              <Route path="/" element={<TrackerDashboard />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Signup />} />
              <Route path="/ChartDisplay" element={<ChartDisplay />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;