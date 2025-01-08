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
      navigate("/LogIn");
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Titles and Paragraph */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold sm:text-4xl text-white">
          Set Password
        </h1>
        <p className="text-gray-400 mb-6 sm:text-lg">
          Enter and confirm your new password
        </p>
      </div>

      {/* Card containing the form */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full sm:w-96 mb-6">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* New Password Input */}
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700">
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="newPassword"
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
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
