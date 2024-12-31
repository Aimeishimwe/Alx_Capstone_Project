import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/screens/WelcomePage";
import Onboarding1 from "./components/screens/Onboarding1";
import Onboarding2 from "./components/screens/Onboarding2";
import Onboarding3 from "./components/screens/Onboarding3";
import LogIn from "./components/screens/LogIn";
import SignUp from "./components/screens/SignUp";
import ForgotPassword from "./components/screens/ForgotPassword";
import SetupPassword from "./components/screens/SetupPassword";
import HomePage from "./components/screens/HomePage";
import LogWorkout from "./components/screens/LogWorkout";
import WorkoutHistory from "./components/screens/WorkoutHistory";
import UserProfile from "./components/screens/UserProfile";
import NutritionTracking from "./components/screens/NutritionTracking";
import ProgressTracking from "./components/screens/ProgressTracking";
import WorkoutPlan from "./components/screens/WorkoutPlan";
import CreateWorkoutPlan from "./components/screens/CreateWorkoutPlan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Onboarding1" element={<Onboarding1 />} />
        <Route path="/Onboarding2" element={<Onboarding2 />} />
        <Route path="/Onboarding3" element={<Onboarding3 />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/SetupPassword" element={<SetupPassword />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/LogWorkout" element={<LogWorkout />} />
        <Route path="/WorkoutHistory" element={<WorkoutHistory />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/NutritionTracking" element={<NutritionTracking />} />
        <Route path="/ProgressTracking" element={<ProgressTracking />} />
        <Route path="/WorkoutPlan" element={<WorkoutPlan />} />
        <Route path="/CreateWorkoutPlan" element={<CreateWorkoutPlan />} />
      </Routes>
    </Router>
  );
}
export default App;
