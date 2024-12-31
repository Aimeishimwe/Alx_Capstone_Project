import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Sidebar from "../common/Sidebar";
import useWorkoutStore from "../../store/useWorkoutStore"; // Import Zustand store

const WorkoutHistory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch workouts and completed plans from Zustand store
  const workouts = useWorkoutStore((state) => state.workouts) || []; // Fallback to empty array
  const workoutPlans = useWorkoutStore((state) => state.workoutPlans) || []; // Fallback to empty array
  const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout); // Function to delete individual workout
  const deleteWorkoutPlan = useWorkoutStore((state) => state.deleteWorkoutPlan); // Function to delete a workout plan
  const initializeWorkouts = useWorkoutStore(
    (state) => state.initializeWorkouts
  ); // Function to initialize workouts on component mount

  // Local state for filter form values
  const [filterValues, setFilterValues] = useState({
    search: "",
    exercise: "",
    date: "",
  });

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Initialize workouts on component mount
  useEffect(() => {
    initializeWorkouts(); // Ensure workouts are initialized when the component loads
  }, [initializeWorkouts]);

  // Filter workouts and completed plans based on the filter form values
  const filteredWorkouts = useMemo(() => {
    const allWorkouts = [
      ...workouts,
      ...workoutPlans.filter((plan) => plan.completed),
    ]; // Merge logged workouts and completed plans

    if (!Array.isArray(allWorkouts)) {
      return []; // Prevent error if the merged array is not an array
    }

    return allWorkouts.filter((workout) => {
      const { search, exercise, date } = filterValues;
      const workoutDate = new Date(workout.timestamp)
        .toISOString()
        .split("T")[0];

      // Apply filter conditions
      return (
        (search === "" ||
          workout.notes?.toLowerCase().includes(search.toLowerCase())) &&
        (exercise === "" || workout.exercise === exercise) &&
        (date === "" || workoutDate === date)
      );
    });
  }, [filterValues, workouts, workoutPlans]);

  // Clear all workouts and plans from the store and localStorage
  const clearHistory = () => {
    useWorkoutStore.getState().workouts = []; // Clear workouts from Zustand store
    useWorkoutStore.getState().workoutPlans = []; // Clear workout plans from Zustand store
    localStorage.removeItem("users"); // Remove users data from localStorage
  };

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
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-white bg-gray-800 hover:bg-gray-700 rounded p-2 fixed top-4 left-4"
          >
            Open
          </button>
        )}

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-6">Workout History</h1>

        {/* Filter Form */}
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Filter Workouts
          </h2>
          <Formik
            initialValues={filterValues}
            onSubmit={(values) => {
              setFilterValues(values); // Update filter state on submit
            }}
          >
            {() => (
              <Form className="space-y-4">
                <Field
                  name="search"
                  placeholder="Search by notes"
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Field
                  as="select"
                  name="exercise"
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Exercises</option>
                  <option value="exercise1">Exercise 1</option>
                  <option value="exercise2">Exercise 2</option>
                </Field>
                <Field
                  type="date"
                  name="date"
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Filter
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Exercise History */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Exercise History
          </h2>

          {/* Display Filtered Workouts */}
          {filteredWorkouts.length === 0 ? (
            <p className="text-gray-600">
              No workouts found based on the selected filters.
            </p>
          ) : (
            <ul>
              {filteredWorkouts.map((workout, index) => (
                <li
                  key={workout.timestamp}
                  className="mb-4 p-4 bg-white shadow-md rounded"
                >
                  <p>
                    <strong>Exercise:</strong> {workout.exercise}
                  </p>
                  <p>
                    <strong>Sets:</strong> {workout.sets}
                  </p>
                  <p>
                    <strong>Reps:</strong> {workout.reps}
                  </p>
                  <p>
                    <strong>Weight:</strong> {workout.weights} kg
                  </p>
                  {workout.notes && (
                    <p>
                      <strong>Notes:</strong> {workout.notes}
                    </p>
                  )}
                  <p>
                    <strong>Timestamp:</strong>{" "}
                    {new Date(workout.timestamp).toLocaleString()}
                  </p>
                  <button
                    onClick={() => {
                      if (workout.exercise) {
                        deleteWorkout(workout.timestamp);
                      } else {
                        deleteWorkoutPlan(workout.timestamp);
                      }
                    }}
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Clear History Button (Placed at the bottom) */}
        <div className="flex justify-center mb-8">
          <button
            onClick={clearHistory}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistory;
