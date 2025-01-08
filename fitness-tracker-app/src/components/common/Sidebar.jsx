import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  isDarkMode,
  toggleDarkMode,
}) => {
  if (!isSidebarOpen) return null; // Only render if open

  const navigate = useNavigate(); // Import and use navigate hook

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white">
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
          to="/HomePage"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/LogWorkout"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Log Workout
        </NavLink>
        <NavLink
          to="/CreateWorkoutPlan"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Create Workout Plan
        </NavLink>
        <NavLink
          to="/WorkoutPlan"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          View workout Plans
        </NavLink>
        <NavLink
          to="/WorkoutHistory"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Workout History
        </NavLink>
        <NavLink
          to="/ProgressTracking"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Progress
        </NavLink>
        <NavLink
          to="/NutritionTracking"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Nutrition
        </NavLink>
        <NavLink
          to="/LogNutrition"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Prepare Your Meal
        </NavLink>
        <NavLink
          to="/UserProfile"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Profile
        </NavLink>
        {/* Add more links here */}

        {/* Log Out Button */}
        <button
          onClick={() => navigate("/")} // Redirect to Welcome Page
          className="block w-full px-4 py-2 hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
