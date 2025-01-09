import { create } from "zustand";

// Helper functions for local storage
const getLoggedInUser = () =>
  JSON.parse(localStorage.getItem("loggedInUser")) || null;

const getUserData = (email) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email);
  return (
    user || {
      loggedWorkouts: [], // Fallback to empty array if no user is found
      workoutPlans: [], // Fallback to empty array if no user is found
    }
  );
};

const saveUserData = (email, data) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.map((user) =>
    user.email === email ? { ...user, ...data } : user
  );
  if (!updatedUsers.some((user) => user.email === email)) {
    updatedUsers.push({ email, ...data });
  }
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

// Zustand store
const useWorkoutStore = create((set) => ({
  // State
  loggedWorkouts: [],
  workoutPlans: [],
  history: [],
  combinedWorkouts: [], // This is just for filtering, not for display

  // Initialize store with data from local storage
  initializeStore: () => {
    const user = getLoggedInUser();
    if (user) {
      const userData = getUserData(user.email);
      const loggedWorkouts = userData.loggedWorkouts || [];
      const workoutPlans = userData.workoutPlans || [];
      set({
        loggedWorkouts: loggedWorkouts,
        workoutPlans: workoutPlans,
        history: [
          ...loggedWorkouts, // Include logged workouts directly into history
          ...workoutPlans, // Include workout plans directly into history
        ],
        combinedWorkouts: [
          ...loggedWorkouts, // Combine logged workouts and plans for filtering
          ...workoutPlans,
        ],
      });
    }
  },

  // Log a workout
  logWorkout: (workout) => {
    set((state) => {
      const user = getLoggedInUser();
      if (user) {
        const updatedLoggedWorkouts = [...state.loggedWorkouts, workout];
        const updatedHistory = [...state.history, workout]; // Add workout directly to history
        const updatedCombinedWorkouts = [...state.combinedWorkouts, workout];
        saveUserData(user.email, { loggedWorkouts: updatedLoggedWorkouts });
        return {
          loggedWorkouts: updatedLoggedWorkouts,
          history: updatedHistory, // Updated history
          combinedWorkouts: updatedCombinedWorkouts, // For filtering purposes
        };
      }
      return state;
    });
  },

  // Add a workout plan
  addWorkoutPlan: (plan) => {
    set((state) => {
      const user = getLoggedInUser();
      if (user) {
        const updatedWorkoutPlans = [...state.workoutPlans, plan];
        const updatedHistory = [...state.history, plan]; // Add plan directly to history
        const updatedCombinedWorkouts = [...state.combinedWorkouts, plan];
        saveUserData(user.email, { workoutPlans: updatedWorkoutPlans });
        return {
          workoutPlans: updatedWorkoutPlans,
          history: updatedHistory, // Updated history
          combinedWorkouts: updatedCombinedWorkouts, // For filtering purposes
        };
      }
      return state;
    });
  },

  // Clear all history
  clearHistory: () => {
    set(() => {
      const user = getLoggedInUser();
      if (user) {
        saveUserData(user.email, { loggedWorkouts: [], workoutPlans: [] });
        return {
          loggedWorkouts: [],
          workoutPlans: [],
          history: [],
          combinedWorkouts: [],
        };
      }
      return {};
    });
  },

  // Delete a specific workout
  deleteWorkout: (timestamp) => {
    set((state) => {
      const user = getLoggedInUser();
      if (user) {
        const updatedLoggedWorkouts = state.loggedWorkouts.filter(
          (workout) => workout.timestamp !== timestamp
        );
        const updatedHistory = state.history.filter(
          (item) => item.timestamp !== timestamp
        );
        const updatedCombinedWorkouts = state.combinedWorkouts.filter(
          (item) => item.timestamp !== timestamp
        );
        saveUserData(user.email, { loggedWorkouts: updatedLoggedWorkouts });
        return {
          loggedWorkouts: updatedLoggedWorkouts,
          history: updatedHistory,
          combinedWorkouts: updatedCombinedWorkouts,
        };
      }
      return state;
    });
  },

  // Delete a specific workout plan
  deleteWorkoutPlan: (timestamp) => {
    set((state) => {
      const user = getLoggedInUser();
      if (user) {
        const updatedWorkoutPlans = state.workoutPlans.filter(
          (plan) => plan.timestamp !== timestamp
        );
        const updatedHistory = state.history.filter(
          (item) => item.timestamp !== timestamp
        );
        const updatedCombinedWorkouts = state.combinedWorkouts.filter(
          (item) => item.timestamp !== timestamp
        );
        saveUserData(user.email, { workoutPlans: updatedWorkoutPlans });
        return {
          workoutPlans: updatedWorkoutPlans,
          history: updatedHistory,
          combinedWorkouts: updatedCombinedWorkouts,
        };
      }
      return state;
    });
  },

  // Group workouts by exercise
  groupWorkoutsByExercise: () => {
    const user = getLoggedInUser();
    if (user) {
      const workouts = getUserData(user.email).loggedWorkouts || [];
      return workouts.reduce((grouped, workout) => {
        const { exercise } = workout;
        if (!grouped[exercise]) grouped[exercise] = [];
        grouped[exercise].push(workout);
        return grouped;
      }, {});
    }
    return {};
  },

  // Group workout plans by type
  groupWorkoutPlansByType: () => {
    const user = getLoggedInUser();
    if (user) {
      const plans = getUserData(user.email).workoutPlans || [];
      return plans.reduce((grouped, plan) => {
        const { type } = plan;
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(plan);
        return grouped;
      }, {});
    }
    return {};
  },
}));

export default useWorkoutStore;
