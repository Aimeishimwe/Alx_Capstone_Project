import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Sidebar from "../../common/Sidebar";
import useWorkoutStore from "../../../store/useWorkoutStore";

const WorkoutHistoryPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Zustand store actions and state
  const initializeStore = useWorkoutStore((state) => state.initializeStore);
  const workouts = useWorkoutStore((state) => state.loggedWorkouts) || [];
  const workoutPlans = useWorkoutStore((state) => state.workoutPlans) || [];
  const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);
  const deleteWorkoutPlan = useWorkoutStore((state) => state.deleteWorkoutPlan);
  const clearHistory = useWorkoutStore((state) => state.clearHistory);

  useEffect(() => {
    // Initialize the store on component mount
    initializeStore();
  }, [initializeStore]);

  // Local state for filters
  const [filterValues, setFilterValues] = useState({
    search: "",
    exercise: "",
    date: "",
  });

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Combine workouts and completed plans
  const combinedWorkouts = useMemo(() => {
    const allWorkouts = [
      ...workouts,
      ...workoutPlans.filter((plan) => plan.completed),
    ];
    return allWorkouts;
  }, [workouts, workoutPlans]);

  // Filter workouts based on search and selected values
  const filteredWorkouts = useMemo(() => {
    const { search, exercise, date } = filterValues;
    return combinedWorkouts.filter((workout) => {
      const workoutDate = new Date(workout.timestamp)
        .toISOString()
        .split("T")[0];

      return (
        (search === "" ||
          workout.notes?.toLowerCase().includes(search.toLowerCase())) &&
        (exercise === "" || workout.exercise === exercise) &&
        (date === "" || workoutDate === date)
      );
    });
  }, [combinedWorkouts, filterValues]);

  // Handle clearing all workout history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all workout history?")) {
      clearHistory();
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-white transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        {/* Button to open Sidebar */}
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
            onSubmit={(values) => setFilterValues(values)}
          >
            {() => (
              <Form className="space-y-4">
                {/* Search by notes */}
                <Field
                  name="search"
                  placeholder="Search by notes"
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Filter by exercise */}
                <Field
                  as="select"
                  name="exercise"
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Exercises</option>
                  {[...new Set(combinedWorkouts.map((w) => w.exercise))].map(
                    (exercise) => (
                      <option key={exercise} value={exercise}>
                        {exercise}
                      </option>
                    )
                  )}
                </Field>
                {/* Filter by date */}
                <Field
                  type="date"
                  name="date"
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Submit button for filters */}
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

        {/* History Section */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-8 flex flex-wrap gap-4">
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Workout History
            </h2>
            {filteredWorkouts.length === 0 ? (
              <p className="text-gray-600">
                No workouts found based on the selected filters.
              </p>
            ) : (
              <ul>
                {/* Display each workout entry */}
                {filteredWorkouts.map((workout) => (
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
                    {/* Delete button for workout */}
                    <button
                      onClick={() =>
                        workout.exercise
                          ? deleteWorkout(workout.timestamp)
                          : deleteWorkoutPlan(workout.timestamp)
                      }
                      className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Created Plans Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Created Plans
            </h2>
            {workoutPlans.length === 0 ? (
              <p className="text-gray-600">No workout plans found.</p>
            ) : (
              <ul>
                {/* Display each created workout plan */}
                {workoutPlans.map((plan) => (
                  <li
                    key={plan.timestamp}
                    className="mb-4 p-4 bg-white shadow-md rounded"
                  >
                    <h3 className="font-semibold">Plan: {plan.name}</h3>
                    <ul>
                      {plan.exercises.map((exercise, index) => (
                        <li key={index}>
                          <p>
                            <strong>Exercise:</strong> {exercise.name}
                          </p>
                          <p>
                            <strong>Sets:</strong> {exercise.sets}
                          </p>
                          <p>
                            <strong>Reps:</strong> {exercise.reps}
                          </p>
                          <p>
                            <strong>Notes:</strong> {exercise.notes}
                          </p>
                        </li>
                      ))}
                    </ul>
                    {/* Delete button for workout plan */}
                    <button
                      onClick={() => deleteWorkoutPlan(plan.timestamp)}
                      className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Clear History Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleClearHistory}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistoryPage;
