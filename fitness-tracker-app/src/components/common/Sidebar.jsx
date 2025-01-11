import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate(); // Import and use navigate hook

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white transition-transform duration-300 ${
        isSidebarOpen ? "transform-none" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">PulsePoint</h1>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none hover:bg-gray-700 rounded p-2"
        >
          Close
        </button>
      </div>
      <nav className="mt-6 space-y-2">
        {/* Navigation Links */}
        <NavLink
          to="/Main/HomePage"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/Main/LogWorkoutPage"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Log Workout
        </NavLink>
        <NavLink
          to="/Main/CreateWorkoutPlanPage"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Create Workout Plan
        </NavLink>

        <NavLink
          to="/Main/WorkoutHistoryPage"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Workout History
        </NavLink>
        <NavLink
          to="/Main/ProgressTrackingPage"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Progress
        </NavLink>
        <NavLink
          to="/Main/NutritionTrackingPage"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Nutrition
        </NavLink>
        <NavLink
          to="/Main/LogNutritionPage"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Prepare Your Meal
        </NavLink>
        <NavLink
          to="/Main/UserProfilePage"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Profile
        </NavLink>
        {/* Add more links here */}

        {/* Log Out Button */}
        <button
          onClick={() => {
            localStorage.setItem("isAuthenticated", "false"); // Set isAuthenticated to false
            navigate("/"); // Redirect to the Welcome Page
          }}
          className="block w-full px-4 py-2 hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
