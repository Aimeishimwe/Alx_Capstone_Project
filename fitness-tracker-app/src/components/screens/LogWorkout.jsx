import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Sidebar from "../common/Sidebar";

const LogWorkout = () => {
  const [exercises, setExercises] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exercises from WGER API
    fetch("https://wger.de/api/v2/exercise/")
      .then((response) => response.json())
      .then((data) => setExercises(data.results))
      .catch((error) => console.error("Error fetching exercises:", error));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    exercise: Yup.string().required("Please select an exercise."),
    sets: Yup.number()
      .required("Please enter the number of sets.")
      .min(1, "Sets must be at least 1."),
    reps: Yup.number()
      .required("Please enter the number of reps.")
      .min(1, "Reps must be at least 1."),
    weights: Yup.number()
      .required("Please enter the weight.")
      .min(0, "Weight cannot be negative."),
    notes: Yup.string(),
  });

  // Initial Values
  const initialValues = {
    exercise: "",
    sets: "",
    reps: "",
    weights: "",
    notes: "",
  };

  // Form Submit Handler
  const handleSubmit = (values, { resetForm }) => {
    const workoutEntry = {
      ...values,
      timestamp: new Date().toISOString(),
    };

    console.log("Workout Saved:", workoutEntry);

    // Optionally save the workout to localStorage or backend
    const storedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    localStorage.setItem(
      "workouts",
      JSON.stringify([...storedWorkouts, workoutEntry])
    );

    resetForm(); // Clear the form after submission
    navigate("/WorkoutHistory"); // Redirect to Workout History screen
  };

  return (
    <div className="flex h-screen">
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
        <h1 className="text-3xl font-bold mb-4 text-center sm:text-4xl">
          Log Workout
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto">
              {/* Exercise Field */}
              <div className="mb-4">
                <label
                  htmlFor="exercise"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Exercise
                </label>
                <Field
                  as="select"
                  name="exercise"
                  id="exercise"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select an exercise</option>
                  {exercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.name}>
                      {exercise.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="exercise"
                  component="p"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Sets, Reps, Weights, Notes Fields */}
              {["sets", "reps", "weights"].map((field, index) => (
                <div className="mb-4" key={index}>
                  <label
                    htmlFor={field}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <Field
                    type="number"
                    name={field}
                    id={field}
                    placeholder={`Enter ${field}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name={field}
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              ))}

              {/* Notes Field */}
              <div className="mb-4">
                <label
                  htmlFor="notes"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Notes (optional)
                </label>
                <Field
                  as="textarea"
                  name="notes"
                  id="notes"
                  placeholder="Enter any additional notes"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 w-full sm:w-auto"
              >
                {isSubmitting ? "Saving..." : "Save Workout"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LogWorkout;
