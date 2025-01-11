import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "../../common/Sidebar";

const LogNutritionPage = () => {
  const [loggedMeals, setLoggedMeals] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Simulated logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  useEffect(() => {
    if (loggedInUser?.loggedMeals) {
      setLoggedMeals(loggedInUser.loggedMeals);
    }
  }, []); // Empty dependency array to prevent infinite re-renders

  const validationSchema = Yup.object().shape({
    mealType: Yup.string().required("Please select a meal type."),
    calories: Yup.number()
      .required("Please enter the number of calories.")
      .min(1, "Calories must be at least 1."),
    protein: Yup.number()
      .required("Please enter the amount of protein.")
      .min(0, "Protein cannot be negative."),
    carbs: Yup.number()
      .required("Please enter the amount of carbs.")
      .min(0, "Carbs cannot be negative."),
    fats: Yup.number()
      .required("Please enter the amount of fats.")
      .min(0, "Fats cannot be negative."),
    notes: Yup.string(),
  });

  const initialValues = {
    mealType: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    notes: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    if (!loggedInUser) return;

    const mealEntry = {
      ...values,
      id: Date.now(), // Unique ID for the meal
    };

    const updatedMeals = [...loggedMeals, mealEntry];
    setLoggedMeals(updatedMeals);

    // Update loggedInUser data in local storage
    const updatedUser = { ...loggedInUser, loggedMeals: updatedMeals };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    resetForm();
  };

  const handleDelete = (id) => {
    const updatedMeals = loggedMeals.filter((meal) => meal.id !== id);
    setLoggedMeals(updatedMeals);

    // Update loggedInUser data in local storage
    const updatedUser = { ...loggedInUser, loggedMeals: updatedMeals };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
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
          What Will You Eat Today?
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-6 max-w-2xl mx-auto">
              {/* Meal Type Field */}
              <div className="mb-4">
                <label
                  htmlFor="mealType"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Meal Type
                </label>
                <Field
                  as="select"
                  name="mealType"
                  id="mealType"
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a meal type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </Field>
                <ErrorMessage
                  name="mealType"
                  component="p"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Macronutrient and Calories Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["calories", "protein", "carbs", "fats"].map(
                  (field, index) => (
                    <div key={index} className="mb-4">
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
                        className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name={field}
                        component="p"
                        className="text-red-500 text-xs italic"
                      />
                    </div>
                  )
                )}
              </div>

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
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? "Saving..." : "Save Meal"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Meal Cards */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Logged Meals</h2>
          {loggedMeals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loggedMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white shadow-md rounded p-4 border border-gray-300"
                >
                  <h3 className="text-xl font-bold">{meal.mealType}</h3>
                  <p>Calories: {meal.calories} kcal</p>
                  <p>Protein: {meal.protein} g</p>
                  <p>Carbs: {meal.carbs} g</p>
                  <p>Fats: {meal.fats} g</p>
                  {meal.notes && <p>Notes: {meal.notes}</p>}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDelete(meal.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No meals logged yet. Start logging your meals!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default LogNutritionPage;
