import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import {
  fetchExercises,
  fetchExercisesByMuscle,
} from "../../../services/apiService";

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [exercisesToShow, setExercisesToShow] = useState(6);
  const [nextPageUrl, setNextPageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExercises(6);
        setExercises(data.results);
        setFilteredExercises(data.results);
        setNextPageUrl(data.next);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleSearchChange = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      if (!isNaN(query)) {
        try {
          const data = await fetchExercisesByMuscle(query);
          setFilteredExercises(data.results);
        } catch (error) {
          console.error("Error fetching exercises by muscle:", error);
        }
      } else {
        const filteredByNameOrDescription = exercises.filter((exercise) => {
          const nameMatch = exercise.name.toLowerCase().includes(query);
          const descriptionMatch =
            exercise.description &&
            exercise.description.toLowerCase().includes(query);
          return nameMatch || descriptionMatch;
        });

        setFilteredExercises(filteredByNameOrDescription);
      }
    } else {
      setFilteredExercises(exercises.slice(0, exercisesToShow));
    }
  };

  const loadMoreExercises = async () => {
    if (nextPageUrl) {
      try {
        const data = await fetchExercises(6, nextPageUrl);
        setExercises((prevExercises) => [...prevExercises, ...data.results]);
        setFilteredExercises((prevExercises) => [
          ...prevExercises,
          ...data.results,
        ]);
        setNextPageUrl(data.next);
      } catch (error) {
        console.error("Error fetching more exercises:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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

        <h1 className="text-3xl font-bold mb-6 text-center">
          Discover Exercises
        </h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search exercises by name or muscle group..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/3 p-4 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105 cursor-default"
              >
                <img
                  src={exercise.image || "/placeholder.jpg"}
                  alt={exercise.name}
                  className="rounded-t-lg w-full h-40 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {exercise.name}
                </h2>
                <p className="text-gray-600">
                  {exercise.description?.substring(0, 50)}...
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No exercises found.</p>
          )}
        </div>

        {nextPageUrl && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreExercises}
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

export default HomePage;
