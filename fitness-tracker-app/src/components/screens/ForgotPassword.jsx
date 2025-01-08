import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { email } = values;

    // Retrieve registered users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email exists in the users array
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      // Store the email in localStorage for use in SetupPassword
      localStorage.setItem("resetEmail", email);

      // Simulate email verification or API call
      console.log("Email verification sent to:", email);
      alert("Verification email sent. Please check your inbox.");
      navigate("/SetupPassword");
    } else {
      // Show error message if the email is not registered
      alert("Email not found. Please check and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Title and Paragraph */}
      <div className="text-center mb-4">
        <h1 className="text-white text-3xl font-bold sm:text-4xl">
          Forgot Password
        </h1>
        <p className="text-white mb-6 sm:text-lg">
          Enter your email to reset your password
        </p>
      </div>

      {/* Card containing the form */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full sm:w-96 mb-6">
        <Formik
          initialValues={{ email: "" }}
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
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="email"
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
                  Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
