import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import useWorkoutStore from "../../../store/useWorkoutStore";
import { fetchExercises } from "../../../services/apiService";

const LogWorkoutPage = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();
  const logWorkout = useWorkoutStore((state) => state.logWorkout);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExercises();
        setExerciseList(data.results);
      } catch (error) {
        setFetchError("Failed to fetch exercises. Please try again.");
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

  const initialValues = {
    exercise: "",
    sets: "",
    reps: "",
    weights: "",
    notes: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const workoutEntry = {
      ...values,
      timestamp: new Date().toISOString(),
    };

    try {
      await logWorkout(workoutEntry);
      resetForm();
      navigate("/Main/WorkoutHistoryPage");
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const InputField = ({ name, label, type = "number", ...rest }) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <Field
        type={type}
        name={name}
        id={name}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...rest}
      />
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs italic"
      />
    </div>
  );

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 p-6 transition-all duration-300 ${
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

        {fetchError && (
          <p className="text-red-500 text-center mb-4">{fetchError}</p>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto">
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
                  {exerciseList.map((exercise) => (
                    <option key={exercise.id} value={exercise.name}>
                      {exercise.name} - {exercise.muscle_group}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="exercise"
                  component="p"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <InputField name="sets" label="Sets" />
              <InputField name="reps" label="Reps" />
              <InputField name="weights" label="Weight" />

              <div className="mb-4">
                <label
                  htmlFor="notes"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Notes (Optional)
                </label>
                <Field
                  as="textarea"
                  name="notes"
                  id="notes"
                  placeholder="Add any notes"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Log Workout"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LogWorkoutPage;
