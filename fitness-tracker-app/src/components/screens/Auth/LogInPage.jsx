import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
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

const LogInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { email, password } = values;

    try {
      // Retrieve users array from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find the user by matching email and password
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Prevent account recreation or duplicate login
        if (localStorage.getItem("isAuthenticated") === "true") {
          alert("You are already logged in.");
          return;
        }

        // Set authentication flag in localStorage to true
        localStorage.setItem("isAuthenticated", "true");

        // Store the logged-in user's data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        navigate("/Main/HomePage");
      } else {
        alert("Invalid credentials, please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Titles */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold sm:text-4xl text-white">Log In</h1>
        <h2 className="text-xl mt-2 sm:text-2xl text-white">Welcome Back</h2>
        <p className="text-white mb-6 sm:text-lg">Please log in to continue</p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full sm:w-96">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
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

              {/* Forgot Password Link */}
              <div className="text-center mb-4">
                <Link
                  to="/Auth/ForgotPasswordPage"
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
        <Link to="/Auth/SignUpPage" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LogInPage;
