import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import useWorkoutStore from "../../store/useWorkoutStore"; // Import the store

const WorkoutPlan = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Access the workout plans from the Zustand store
  const {
    workoutPlans,
    initializeWorkouts,
    markPlanAsComplete,
    deleteWorkoutPlan,
  } = useWorkoutStore();

  useEffect(() => {
    initializeWorkouts(); // Initialize workouts and workout plans when the component is mounted
  }, [initializeWorkouts]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handler for marking a plan as complete
  const handleMarkComplete = (timestamp) => {
    markPlanAsComplete(timestamp);
  };

  // Handler for deleting a workout plan
  const handleDeletePlan = (timestamp) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plan?"
    );
    if (confirmDelete) {
      deleteWorkoutPlan(timestamp);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-white bg-gray-800 hover:bg-gray-700 rounded p-2 fixed top-4 left-4"
          >
            Open
          </button>
        )}

        <h1 className="text-3xl font-bold text-center mb-6">Workout Plans</h1>
        <button
          onClick={() => navigate("/CreateWorkoutPlan")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          + Create New Plan
        </button>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workoutPlans.length > 0 ? (
            workoutPlans.map((plan, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl"
              >
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <p>{plan.exercises.length} exercises</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleMarkComplete(plan.timestamp)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Mark Complete
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.timestamp)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete Plan
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No workout plans available. Create one now!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;
