import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [exercisesToShow, setExercisesToShow] = useState(6); // To limit the exercises shown initially
  const [nextPageUrl, setNextPageUrl] = useState(""); // URL for next page
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the first page of exercises from WGER API
    fetch("https://wger.de/api/v2/exercise/?limit=6")
      .then((response) => response.json())
      .then((data) => {
        setExercises(data.results);
        setFilteredExercises(data.results); // Set the first 6 exercises initially
        setNextPageUrl(data.next); // Set the URL for the next page
      })
      .catch((error) => console.error("Error fetching exercises:", error));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleExerciseClick = (exerciseId) => {
    navigate(`/ExerciseDetails/${exerciseId}`);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      if (!isNaN(query)) {
        // Search exercises by muscle group (numeric query assumed to be muscle group ID)
        fetch(`https://wger.de/api/v2/exercise/?muscle=${query}`)
          .then((response) => response.json())
          .then((data) => {
            setFilteredExercises(data.results);
          })
          .catch((error) =>
            console.error("Error fetching exercises by muscle:", error)
          );
      } else {
        // Search exercises by name or description (word-based search)
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

  const loadMoreExercises = () => {
    if (nextPageUrl) {
      fetch(nextPageUrl)
        .then((response) => response.json())
        .then((data) => {
          setExercises((prevExercises) => [...prevExercises, ...data.results]);
          setFilteredExercises((prevExercises) => [
            ...prevExercises,
            ...data.results,
          ]);
          setNextPageUrl(data.next);
        })
        .catch((error) =>
          console.error("Error fetching more exercises:", error)
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
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

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search exercises by name or muscle group..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-3/4 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => handleExerciseClick(exercise.id)}
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

        {/* Load More Button */}
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
