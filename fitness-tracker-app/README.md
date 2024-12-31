# Fitness Tracker

A fitness tracker web application that allows users to log their workouts, track progress, and stay motivated. The app integrates with the WGER Workout Manager API to provide comprehensive workout data, including exercise suggestions, workout templates, muscle information, and more. The app is built with React, styled using Tailwind CSS, and designed to be responsive and user-friendly.

## Features

- **Workout Logging**: Users can log their daily workouts and track progress.
- **Exercise Database**: Provides a wide variety of exercises with detailed instructions and muscle group information.
- **Customizable Workouts**: Users can select workout templates based on their fitness level and goals.
- **Progress Tracking**: Users can visualize their progress over time through charts or logs.
- **Responsive Design**: Optimized for both mobile and desktop views using Tailwind CSS.

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
   This will run the app locally on http://localhost:517.
   Configuration
   The WGER Workout Manager API is used for fetching workout and exercise data. All API calls are made from the backend to ensure security and performance. You'll need an API key to access the data, which you can sign up for at WGER API website.

### Usage

Once the app is running, users can:

Log Workouts: Add details like exercise type, duration, repetitions, and sets.
View Exercise Database: Search through available exercises and get detailed information.
Track Progress: View past workouts, see trends, and monitor improvements.
Customize Workouts: Choose from workout templates based on fitness goals (e.g., strength training, weight loss).

### File Structure

fitness-tracker/
│
├── public/
│ └── index.html
│
├── src/
│ ├── assets/ # Images and static assets
│ ├── components/ # Reusable React components
│ ├── pages/ # App pages (e.g., Home, Exercise List)
│ ├── services/ # API calls and business logic
│ ├── App.jsx # Main application component
│ ├── index.jsx # Entry point for the app
│ └── index.css # Global styles (Tailwind CSS)
│
├── tailwind.config.js # Tailwind CSS configuration
├── package.json # Project metadata and dependencies
├── README.md # Project documentation
└── .gitignore # Files to exclude from Git

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

![Local Setup](screenshoots/Local%20Setup.PNG)
![Localserver](screenshoots/Local%20server.PNG)

### Welcome to support lives and make the World a better place for all
