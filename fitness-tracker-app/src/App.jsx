import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import screens
import WelcomePage from "./components/screens/Onboarding/WelcomePage";
import Onboarding1 from "./components/screens/Onboarding/Onboarding1";
import Onboarding2 from "./components/screens/Onboarding/Onboarding2";
import Onboarding3 from "./components/screens/Onboarding/Onboarding3";
import LogInPage from "./components/screens/Auth/LogInPage";
import SignUpPage from "./components/screens/Auth/SignUpPage";
import ForgotPasswordPage from "./components/screens/Auth/ForgotPasswordPage";
import SetupPasswordPage from "./components/screens/Auth/SetupPasswordPage";
import HomePage from "./components/screens/Main/HomePage";
import LogWorkoutPage from "./components/screens/Main/LogWorkoutPage";
import WorkoutHistoryPage from "./components/screens/Main/WorkoutHistoryPage";
import UserProfilePage from "./components/screens/Main/UserProfilePage";
import NutritionTrackingPage from "./components/screens/Main/NutritionTrackingPage";
import ProgressTrackingPage from "./components/screens/Main/ProgressTrackingPage";
import CreateWorkoutPlanPage from "./components/screens/Main/CreateWorkoutPlanPage";
import LogNutritionPage from "./components/screens/Main/LogNutritionPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Onboarding routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="/onboarding3" element={<Onboarding3 />} />

        {/* Authentication routes */}
        <Route path="/Auth/LogInPage" element={<LogInPage />} />
        <Route path="/Auth/SignUpPage" element={<SignUpPage />} />
        <Route
          path="/Auth/ForgotPasswordPage"
          element={<ForgotPasswordPage />}
        />
        <Route path="/Auth/setupPassword" element={<SetupPasswordPage />} />

        {/* Main app routes */}
        <Route path="/Main/HomePage" element={<HomePage />} />
        <Route path="/Main/LogWorkoutPage" element={<LogWorkoutPage />} />
        <Route
          path="/Main/WorkoutHistoryPage"
          element={<WorkoutHistoryPage />}
        />
        <Route path="/Main/UserProfilePage" element={<UserProfilePage />} />
        <Route
          path="/Main/NutritionTrackingPage"
          element={<NutritionTrackingPage />}
        />
        <Route
          path="/Main/ProgressTrackingPage"
          element={<ProgressTrackingPage />}
        />
        <Route
          path="/Main/CreateWorkoutPlanPage"
          element={<CreateWorkoutPlanPage />}
        />
        <Route path="/Main/LogNutritionPage" element={<LogNutritionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
