import axios from "axios";

// Base URL for the API from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use VITE_ prefix

// Function to fetch exercises with optional pagination
export const fetchExercises = async (limit = 60, url = API_BASE_URL) => {
  try {
    const response = await axios.get(url, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
};

// Function to fetch exercises by muscle group ID
export const fetchExercisesByMuscle = async (muscleId) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        muscle: muscleId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises by muscle:", error);
    throw error;
  }
};
