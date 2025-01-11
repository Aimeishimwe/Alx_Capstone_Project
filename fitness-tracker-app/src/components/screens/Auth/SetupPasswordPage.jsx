import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const SetupPasswordPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { newPassword } = values;

    try {
      // Retrieve users and reset email from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const email = localStorage.getItem("resetEmail");

      if (email) {
        const updatedUsers = users.map((user) =>
          user.email === email ? { ...user, password: newPassword } : user
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.removeItem("resetEmail");

        alert(
          "Password successfully reset! Please log in with your new password."
        );
        navigate("/Auth/LogInPage"); // Redirect to login page
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      alert(
        "An error occurred while resetting your password. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Titles */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold sm:text-4xl text-white">
          Set Password
        </h1>
        <p className="text-gray-400 sm:text-lg">
          Enter and confirm your new password
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full sm:w-96">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* New Password Input */}
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 font-medium"
                >
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-medium"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="confirmPassword"
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

export default SetupPasswordPage;
