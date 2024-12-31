import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { name, email, password } = values;

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      alert("Email is already registered. Please log in.");
    } else {
      // Add new user to the list and store in localStorage
      const newUser = { name, email, password };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      alert("Registration successful! You can now log in.");
      navigate("/LogIn"); // Redirect to LogIn page
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Titles */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Sign Up</h1>
        <p className="text-gray-600 mb-6 sm:text-lg">Create your account</p>
      </div>

      {/* Card containing the form */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full sm:w-96 mb-6">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Already Have Account Link */}
      <div className="text-center mt-4">
        <span>Already have an account? </span>
        <Link to="/LogIn" className="text-blue-500 hover:underline">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
