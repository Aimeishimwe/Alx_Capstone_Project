import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link, useLocation } from "react-router-dom";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (
      isAuthenticated === "true" &&
      location.pathname !== "/LogIn" &&
      location.pathname !== "/SignUp"
    ) {
      navigate("/HomePage"); // Redirect to home if already logged in
    }
  }, [navigate, location.pathname]);

  const handleSubmit = (values) => {
    const { email, password } = values;

    // Retrieve users array from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user by matching email and password
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Set authentication flag in localStorage
      localStorage.setItem("isAuthenticated", "true");

      // Store the logged-in user's data in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Retrieve user's workout data or initialize if not available
      const userWorkouts =
        JSON.parse(localStorage.getItem(`user_workouts_${email}`)) || [];
      localStorage.setItem(
        `user_workouts_${email}`,
        JSON.stringify(userWorkouts)
      );

      alert("Login successful!");
      navigate("/HomePage"); // Redirect to home page after successful login
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Titles and Paragraph */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold sm:text-4xl text-white">Log In</h1>
        <h2 className="text-xl mt-2 sm:text-2xl text-white">Welcome Back</h2>
        <p className="text-white mb-6 sm:text-lg">Please log in to continue</p>
      </div>

      {/* Card containing the form */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full sm:w-96 mb-6">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  Log In
                </button>
              </div>
              {/* Forgot Password */}
              <div className="text-center mb-4">
                <Link
                  to="/ForgotPassword"
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Registration Link */}
      <div className="text-center">
        <span className="text-white">Don't have an account? </span>
        <Link to="/SignUp" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
