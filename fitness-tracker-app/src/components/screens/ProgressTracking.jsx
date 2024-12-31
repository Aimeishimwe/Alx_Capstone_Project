import React, { useState, useMemo, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Sidebar from "../common/Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useWorkoutStore from "../../store/useWorkoutStore"; // Import Zustand store

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressTracking = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch workouts from Zustand store
  const workouts = useWorkoutStore((state) => state.workouts) || []; // Fallback to empty array

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Data preparation for the charts
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (workouts.length === 0) return; // Ensure workouts data is available before proceeding

    const workoutData = workouts.map((workout) => ({
      timestamp: new Date(workout.timestamp),
      sets: workout.sets,
      reps: workout.reps,
      weights: workout.weights,
    }));

    // Grouping by exercise name
    const groupedWorkouts = workoutData.reduce((acc, workout) => {
      const dateKey = workout.timestamp.toLocaleDateString(); // Using locale date for grouping
      if (!acc[dateKey]) {
        acc[dateKey] = { sets: [], reps: [], weights: [] };
      }
      acc[dateKey].sets.push(workout.sets);
      acc[dateKey].reps.push(workout.reps);
      acc[dateKey].weights.push(workout.weights);
      return acc;
    }, {});

    // Create data arrays for the chart
    const dates = Object.keys(groupedWorkouts);
    const sets = dates.map((date) => Math.max(...groupedWorkouts[date].sets));
    const reps = dates.map((date) => Math.max(...groupedWorkouts[date].reps));
    const weights = dates.map((date) =>
      Math.max(...groupedWorkouts[date].weights)
    );

    // Only update chart data if data is available
    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Sets",
          data: sets,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
          label: "Reps",
          data: reps,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
          label: "Weights",
          data: weights,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    });
  }, [workouts]);

  return (
    <div className="flex h-screen flex-col">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${
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
        <h1 className="text-3xl font-bold text-center mb-6">
          Progress Tracking
        </h1>

        {/* Chart Container */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Workout Progress (Sets, Reps, Weights)
          </h2>
          {chartData.datasets && chartData.datasets.length > 0 ? (
            <Line data={chartData} options={{ responsive: true }} />
          ) : (
            <p className="text-gray-600">No data available to display.</p>
          )}
        </div>

        {/* Optional: Add more charts or insights */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Insight: Workout Intensity
          </h2>
          <p className="text-gray-600">
            Visualize your workout intensity trends and make improvements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
