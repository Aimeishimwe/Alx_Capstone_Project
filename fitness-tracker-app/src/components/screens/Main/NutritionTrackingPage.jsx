import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import { mealsData } from "../../../store/meals";

const NutritionTrackingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleMeals, setVisibleMeals] = useState(3); // Start with 3 meals

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Function to load more meals
  const loadMoreMeals = () => {
    setVisibleMeals((prev) => prev + 3); // Load 3 more meals
  };

  return (
    <div className="min-h-screen flex flex-col  text-gray-900">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        {/* Button to toggle sidebar visibility */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-white bg-gray-800 hover:bg-gray-700 rounded p-2 fixed top-4 left-4"
          >
            Open
          </button>
        )}

        <h1 className="text-3xl font-bold mb-4 text-center">
          Nutrition Tracking
        </h1>
        <p className="mb-6 text-center">
          Track your meals and monitor your dietary habits below.
        </p>

        {/* Meal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {mealsData.slice(0, visibleMeals).map((meal) => (
            <div
              key={meal.id}
              className="bg-white shadow-lg rounded-lg p-8 text-center max-w-sm mx-auto transition-transform transform hover:scale-105"
            >
              <img
                src={`https://via.placeholder.com/200?text=${meal.name}`}
                alt={meal.name}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {meal.name}
              </h2>
              <p className="mb-3 text-gray-600">
                Calories:{" "}
                <span className="font-semibold">{meal.calories} kcal</span>
              </p>
              <p className="mb-3 text-gray-600">
                Carbs: <span className="font-semibold">{meal.carbs} g</span>
              </p>
              <p className="mb-3 text-gray-600">
                Protein: <span className="font-semibold">{meal.protein} g</span>
              </p>
              <p className="mb-3 text-gray-600">
                Fats: <span className="font-semibold">{meal.fats} g</span>
              </p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleMeals < mealsData.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreMeals}
              className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionTrackingPage;
