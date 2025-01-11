import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import useWorkoutStore from "../../../store/useWorkoutStore"; // Import the store

const CreateWorkoutPlanPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", notes: "" }, // Includes notes
  ]);
  const navigate = useNavigate();

  // Access the addWorkoutPlan method from the store
  const { addWorkoutPlan } = useWorkoutStore();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", notes: "" }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const savePlan = () => {
    if (!name.trim()) {
      alert("Plan name is required!");
      return;
    }

    // Validate exercise fields
    for (let exercise of exercises) {
      if (
        !exercise.name.trim() ||
        !exercise.sets.trim() ||
        !exercise.reps.trim()
      ) {
        alert("Please fill out all fields for each exercise!");
        return;
      }
    }

    const timestamp = Date.now(); // Generate a unique timestamp
    const newPlan = { name, exercises, timestamp };

    // Add the new workout plan to the store
    addWorkoutPlan(newPlan);

    // Clear the form after saving
    setName("");
    setExercises([{ name: "", sets: "", reps: "", notes: "" }]);

    // Navigate to WorkoutHistory screen
    navigate("/Main/WorkoutHistoryPage");
  };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 p-6 bg-white transition-all duration-300 ${
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

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Workout Plan
        </h1>

        <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Plan Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border"
              placeholder="Enter plan name"
            />
          </div>

          {exercises.map((exercise, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-lg font-bold">Exercise {index + 1}</h2>
              <div className="flex space-x-4 mt-2">
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(index, "name", e.target.value)
                  }
                  className="flex-1 p-3 rounded-lg border"
                  placeholder="Exercise Name"
                />
                <input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) =>
                    handleExerciseChange(index, "sets", e.target.value)
                  }
                  className="w-24 p-3 rounded-lg border"
                  placeholder="Sets"
                />
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseChange(index, "reps", e.target.value)
                  }
                  className="w-24 p-3 rounded-lg border"
                  placeholder="Reps"
                />
              </div>

              <div className="mt-4">
                <label className="block text-lg font-medium mb-2">Notes</label>
                <textarea
                  value={exercise.notes}
                  onChange={(e) =>
                    handleExerciseChange(index, "notes", e.target.value)
                  }
                  className="w-full p-3 rounded-lg border"
                  placeholder="Enter notes for this exercise"
                  rows="4"
                />
              </div>
            </div>
          ))}

          <div className="flex space-x-4 mb-6">
            <button
              onClick={addExercise}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 w-1/2"
            >
              + Add Exercise
            </button>
            <button
              onClick={savePlan}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 w-1/2"
            >
              Save Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkoutPlanPage;
