import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const SetupPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { newPassword } = values;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Simulate current user's email
    // You need to store the user's email temporarily during the forgotten password flow
    const email = localStorage.getItem("resetEmail");

    if (email) {
      // Find and update the user's password
      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, password: newPassword } : user
      );

      // Save updated users back to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Clear temporary email used for reset
      localStorage.removeItem("resetEmail");

      alert(
        "Password successfully reset! Please log in with your new password."
      );
      navigate("/LogIn"); // Redirect to LogIn page
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Set Password</h1>
        <p className="text-gray-600 mb-6 sm:text-lg">
          Enter and confirm your new password
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full sm:w-96 mb-6">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700">
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

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
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Reset Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SetupPassword;
