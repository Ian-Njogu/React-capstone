
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiActivity, FiUserPlus, FiLogIn, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../Context/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 bg-white shadow-lg`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center py-6">
            <h1 className="text-xl font-bold text-indigo-600">FitTrack</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <FiHome className="mr-3" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/ChartDisplay"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <FiActivity className="mr-3" />
              <span>Progress Charts</span>
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <FiLogOut className="mr-3" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <FiUserPlus className="mr-3" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </nav>

          {/* User section */}
          <div className="pb-4 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                {user ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <FiUserPlus />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {user ? user.name : 'Welcome!'}
                </p>
                <p className="text-xs text-gray-500">
                  {user ? user.email : 'Fitness Tracker'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;