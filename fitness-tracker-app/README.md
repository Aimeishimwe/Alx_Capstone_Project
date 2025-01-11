# Fitness Tracker

A fitness tracker web application that allows users to log their workouts, track progress, and stay motivated. The app integrates with the WGER Workout Manager API to provide comprehensive workout data, including exercise suggestions, workout templates, muscle information, and more. The app is built with React, styled using Tailwind CSS, and designed to be responsive and user-friendly.

## Features

**Workout Logging**: Users can log their daily workouts and track progress.
**Exercise Database**: Provides a wide variety of exercises with detailed instructions and muscle group information.
**Customizable Workouts**: Users can select workout templates based on their fitness level and goals.
**Progress Tracking**: Users can visualize their progress over time through charts or logs.
**Nutrition Tracking**: Allows users to log and track their nutritional intake.
**Responsive Design**: Optimized for both mobile and desktop views using Tailwind CSS.
**User Management**: Features such as login, signup, password recovery, and user profile management.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool for modern web apps.
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive designs.
- **WGER Workout Manager API**: API for accessing workout data and exercise information.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher): [Download Node.js](https://nodejs.org/)
- **npm**: Comes bundled with Node.js

### Setup

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   cd fitness-tracker
3. Install the project dependencies:
   npm install
4. Start the development server:
   npm run dev
   This will run the app locally on http://localhost:5173.

### Configuration

The WGER Workout Manager API is used for fetching workout and exercise data. All API calls are made from the backend to ensure security and performance. You'll need an API key to access the data, which you can sign up for at WGER API website.

### Usage

Once the app is running, users can:

Log Workouts: Add details like exercise type, duration, repetitions, and sets.
View Exercise Database: Search through available exercises and get detailed information.
Track Progress: View past workouts, see trends, and monitor improvements.
Customize Workouts: Choose from workout templates based on fitness goals (e.g., strength training, weight loss).

### File Structure

fitness-tracker/
├── node_modules/ # Dependency modules installed via npm
├── public/ # Publicly accessible files
│ ├── assets/ # Public assets like images or static files
│ │ └── images/ # Images used in the app
│ └── index.html # HTML template for the app
├── src/ # Source code for the application
│ ├── assets/ # App-specific static files
│ │ └── images/ # App-specific images
│ ├── components/ # Reusable components
│ │ ├── common/ # Generic reusable components
│ │ │ ├── Button.jsx
│ │ │ ├── Sidebar.jsx
│ │ │ └── ... # Other shared components
│ │ ├── layouts/ # Layout components (e.g., headers, footers)
│ │ └── screens/ # Individual pages or screens
│ │ ├── Auth/ # Authentication-related screens
│ │ │ ├── LoginPage.jsx
│ │ │ ├── SignUpPage.jsx
│ │ │ ├── ForgotPasswordPage.jsx
│ │ │ └── SetupPasswordPage.jsx
│ │ ├── Main/ # Main application screens
│ │ │ ├── HomePage.jsx
│ │ │ ├── LogWorkoutPage.jsx
│ │ │ ├── LogNutritionPage.jsx
│ │ │ ├── ProgressTrackingPage.jsx
│ │ │ ├── UserProfilePage.jsx
│ │ │ └── CreateWorkoutPlanPage.jsx
│ │ └── Onboarding/ # Onboarding flow screens
│ │ ├── OnboardingStep1.jsx
│ │ ├── OnboardingStep2.jsx
│ │ ├── OnboardingStep3.jsx
│ │ └── WelcomePage.jsx
│ ├── store/ # Zustand or other state management files
│ │ ├── useWorkoutStore.js # Zustand store for workout data
│ │ ├── mealStore.js # Zustand store for meal data
│ ├── App.jsx # Root application component
│ ├── main.jsx # Entry point for the React app
│ ├── index.css # Tailwind and global styles entry point
│ └── App.css # Global styles
├── .gitignore # Git ignore configuration
├── eslint.config.js # ESLint configuration
├── package.json # Project metadata and dependencies
├── postcss.config.js # PostCSS configuration for Tailwind CSS
├── README.md # Project documentation
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js # Vite configuration file

### Contributing

We welcome contributions to this project! If you find a bug or have an idea for a feature, feel free to open an issue or submit a pull request.

### Fork the repository.

### Create a new branch.

### Make your changes.

### Test your changes.

### Submit a pull request with a detailed description.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments

WGER Workout Manager API for providing comprehensive fitness data.
Tailwind CSS for making responsive design quick and easy.
Vite for a fast and efficient development environment.

## Local Setup

Here’s a screenshot of the app running locally:

![Welcome Screen](/public/assets/Images/Welcome_Screen%20.png)
![Login Page](/public/assets/Images/LogIn_Screen.png)

### Welcome to support lives and make the World a better place for all
