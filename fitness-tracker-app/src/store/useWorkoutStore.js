import { create } from "zustand";

// Helper function: Get logged-in user
const getLoggedInUser = () =>
  JSON.parse(localStorage.getItem("loggedInUser")) || null;

// Helper function: Get workouts or plans for a specific user
const getUserData = (email) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email);
  return user || {};
};

const useWorkoutStore = create((set) => ({
  workouts: [], // Array for logged workouts
  workoutPlans: [], // Array for custom workout plans
  completedPlans: [], // Array for completed workout plans
  historyPlans: [], // Array for historical workout plans

  // Initialize workouts and workout plans
  initializeWorkouts: () => {
    const user = getLoggedInUser();
    if (user) {
      const userData = getUserData(user.email);
      const workouts = userData.workouts || [];
      const workoutPlans = userData.workoutPlans || [];
      set({ workouts, workoutPlans });
    }
  },

  // Add logged workout
  addWorkout: (workout) =>
    set((state) => {
      const user = getLoggedInUser();
      if (user) {
        const updatedWorkouts = [...state.workouts, workout];

        // Update user data in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
          u.email === user.email ? { ...u, workouts: updatedWorkouts } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { workouts: updatedWorkouts };
      }
      return state;
    }),

  // Add custom workout plan
  addWorkoutPlan: (workoutPlan) =>
    set((state) => {
      const user = getLoggedInUser();
      if (user) {
        const updatedWorkoutPlans = [...state.workoutPlans, workoutPlan];

        // Update user data in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
          u.email === user.email
            ? { ...u, workoutPlans: updatedWorkoutPlans }
            : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { workoutPlans: updatedWorkoutPlans };
      }
      return state;
    }),

  // Delete logged workout
  deleteWorkout: (timestamp) =>
    set((state) => {
      const user = getLoggedInUser();
      if (user) {
        const updatedWorkouts = state.workouts.filter(
          (workout) => workout.timestamp !== timestamp
        );

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
          u.email === user.email ? { ...u, workouts: updatedWorkouts } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { workouts: updatedWorkouts };
      }
      return state;
    }),

  // Delete custom workout plan
  deleteWorkoutPlan: (timestamp) =>
    set((state) => {
      const user = getLoggedInUser();
      if (user) {
        const updatedWorkoutPlans = state.workoutPlans.filter(
          (plan) => plan.timestamp !== timestamp
        );

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
          u.email === user.email
            ? { ...u, workoutPlans: updatedWorkoutPlans }
            : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { workoutPlans: updatedWorkoutPlans };
      }
      return state;
    }),

  // Mark workout plan as complete and send to history and progress
  markPlanAsComplete: (timestamp) =>
    set((state) => {
      const user = getLoggedInUser();
      if (user) {
        // Find the plan that is being marked as complete
        const updatedWorkoutPlans = state.workoutPlans.filter(
          (plan) => plan.timestamp !== timestamp
        );

        const completedPlan = state.workoutPlans.find(
          (plan) => plan.timestamp === timestamp
        );

        // Add the completed plan to history and progress
        const updatedCompletedPlans = [...state.completedPlans, completedPlan];

        const updatedHistoryPlans = [
          ...state.historyPlans,
          { ...completedPlan, completed: true },
        ];

        // Update user data in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
          u.email === user.email
            ? {
                ...u,
                workoutPlans: updatedWorkoutPlans,
                completedPlans: updatedCompletedPlans,
                historyPlans: updatedHistoryPlans,
              }
            : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return {
          workoutPlans: updatedWorkoutPlans,
          completedPlans: updatedCompletedPlans,
          historyPlans: updatedHistoryPlans,
        };
      }
      return state;
    }),

  // Group logged workouts by exercise
  groupWorkoutsByExercise: () => {
    const user = getLoggedInUser();
    if (user) {
      const workouts = getUserData(user.email).workouts || [];
      return workouts.reduce((grouped, workout) => {
        const { exercise } = workout;
        if (!grouped[exercise]) {
          grouped[exercise] = [];
        }
        grouped[exercise].push(workout);
        return grouped;
      }, {});
    }
    return {};
  },

  // Group workout plans by type (or other criteria)
  groupWorkoutPlansByType: () => {
    const user = getLoggedInUser();
    if (user) {
      const workoutPlans = getUserData(user.email).workoutPlans || [];
      return workoutPlans.reduce((grouped, plan) => {
        const { type } = plan; // Assuming 'type' is a property of each workout plan
        if (!grouped[type]) {
          grouped[type] = [];
        }
        grouped[type].push(plan);
        return grouped;
      }, {});
    }
    return {};
  },
}));

export default useWorkoutStore;
