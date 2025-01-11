import React, { useState, useEffect } from "react";
import Sidebar from "../../common/Sidebar";
import useWorkoutStore from "../../../store/useWorkoutStore";

const ProgressTrackingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch workouts and plans from Zustand store, defaulting to empty arrays if undefined
  const workouts = useWorkoutStore((state) => state.workouts) || [];
  const workoutPlans = useWorkoutStore((state) => state.workoutPlans) || [];

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // State for progress
  const [progress, setProgress] = useState({
    activePercentage: 0, // Default to 0 to avoid undefined errors
    completionPercentage: 0,
  });

  const getTrackingPeriodDays = (days) => {
    const today = new Date();
    const periodDays = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      periodDays.push(date.toDateString());
    }
    return periodDays;
  };

  useEffect(() => {
    // Load progress from local storage
    const storedProgress = localStorage.getItem("progress");
    if (storedProgress) {
      try {
        setProgress(JSON.parse(storedProgress)); // Restore from localStorage if available
      } catch (e) {
        console.error("Failed to parse progress from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (workouts.length === 0 && workoutPlans.length === 0) return;

    const calculateProgress = () => {
      // Active Days Calculation
      const activeDays = new Set();
      workouts.forEach((workout) => {
        const workoutDate = new Date(workout.timestamp);
        activeDays.add(workoutDate.toLocaleDateString());
      });
      workoutPlans.forEach((plan) => {
        const planDate = new Date(plan.timestamp);
        activeDays.add(planDate.toLocaleDateString());
      });

      const totalActiveDays = activeDays.size;
      const trackingPeriodDays = getTrackingPeriodDays(30);
      const totalDays = trackingPeriodDays.length;

      const activePercentage = (totalActiveDays / totalDays) * 100;

      // Completion Percentage Calculation
      const totalPlannedExercises = workoutPlans.reduce(
        (acc, plan) => acc + plan.exercises.length,
        0
      );
      const completedExercises = workouts.length + workoutPlans.length; // Review this calculation logic
      const completionPercentage =
        totalPlannedExercises > 0
          ? (completedExercises / totalPlannedExercises) * 100
          : 0;

      // Only update the state if progress has changed
      setProgress((prevProgress) => {
        if (
          prevProgress.activePercentage !== activePercentage ||
          prevProgress.completionPercentage !== completionPercentage
        ) {
          const newProgress = {
            activePercentage,
            completionPercentage,
          };

          // Save the progress to localStorage with updated key
          localStorage.setItem("progress", JSON.stringify(newProgress));

          return newProgress;
        }
        return prevProgress; // No state update if values are the same
      });
    };

    calculateProgress();
  }, [workouts, workoutPlans]); // Only trigger effect when workouts or workoutPlans change

  return (
    <div className="flex h-screen flex-col ">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-white transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        {/* Sidebar Toggle Button */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-white bg-gray-800 hover:bg-gray-700 rounded p-2 fixed top-4 left-4"
          >
            Open
          </button>
        )}

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Progress Tracking Dashboard
        </h1>

        {/* Overall Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-white mb-4">
            <div className="w-1/2 px-4 py-2 bg-green-500 rounded-xl">
              <h2 className="text-lg font-semibold">Active Days</h2>
              <div className="mt-2 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-700 h-4 rounded-full"
                  style={{
                    width: `${progress.activePercentage}%`,
                  }}
                ></div>
              </div>
              <p className="mt-2 text-center">
                {isNaN(progress.activePercentage)
                  ? 0
                  : progress.activePercentage.toFixed(2)}
                %
              </p>
            </div>
            <div className="w-1/2 px-4 py-2 bg-blue-500 rounded-xl">
              <h2 className="text-lg font-semibold">Completion</h2>
              <div className="mt-2 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-700 h-4 rounded-full"
                  style={{
                    width: `${progress.completionPercentage}%`,
                  }}
                ></div>
              </div>
              <p className="mt-2 text-center">
                {isNaN(progress.completionPercentage)
                  ? 0
                  : progress.completionPercentage.toFixed(2)}
                %
              </p>
            </div>
          </div>
        </div>

        {/* Recent Workouts */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Workouts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {workouts.slice(0, 6).map((workout, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">
                  {workout.exerciseName}
                </h3>
                <p className="text-gray-600">Sets: {workout.sets}</p>
                <p className="text-gray-600">Reps: {workout.reps}</p>
                <p className="text-gray-600">Weight: {workout.weights} kg</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Plans */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Workout Plans
          </h2>
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200">Plan</th>
                <th className="px-4 py-2 bg-gray-200">Status</th>
                <th className="px-4 py-2 bg-gray-200">Exercises</th>
              </tr>
            </thead>
            <tbody>
              {workoutPlans && workoutPlans.length > 0 ? (
                workoutPlans.map((plan, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{plan.name}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          plan.status === "completed"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{plan.exercises.length}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-2 text-center text-gray-600"
                  >
                    No workout plans available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Insights Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Insights
          </h2>
          <p className="text-gray-600">
            Explore more about your progress and workout intensity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackingPage;
