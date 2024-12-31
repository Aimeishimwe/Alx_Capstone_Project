import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Sidebar from "../common/Sidebar";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and profile picture from local storage
    const storedData = JSON.parse(localStorage.getItem("userData")) || {};
    setProfilePicture(storedData.profilePicture || "");
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, profilePicture: reader.result })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePicture = () => {
    setProfilePicture("");
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userData, profilePicture: "" })
    );
  };

  const saveChanges = (values) => {
    const updatedData = { ...values, profilePicture };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    alert("Profile updated successfully!");
  };

  const deleteAccount = () => {
    localStorage.removeItem("userData");
    alert("Account successfully deleted!");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-white transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        {/* Sidebar Toggle Button */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-white bg-gray-800 hover:bg-gray-700 rounded p-2 fixed top-4 left-4"
          >
            Open
          </button>
        )}

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
              />
            ) : (
              <p>No profile picture</p>
            )}
            {!profilePicture && (
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="mt-2"
              />
            )}
            {profilePicture && (
              <button
                onClick={deletePicture}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
              >
                Delete Picture
              </button>
            )}
          </div>

          {/* Form */}
          <Formik
            initialValues={{
              name: "",
              weight: "",
              fitnessGoals: "",
              bio: "",
              ...JSON.parse(localStorage.getItem("userData")), // Pre-fill with existing data
            }}
            onSubmit={saveChanges}
          >
            {() => (
              <Form className="space-y-4">
                <Field
                  name="name"
                  placeholder="Name"
                  className="block w-full p-3 rounded-lg border"
                />
                <Field
                  name="weight"
                  placeholder="Weight (kg)"
                  className="block w-full p-3 rounded-lg border"
                />
                <Field
                  name="fitnessGoals"
                  placeholder="Fitness Goals"
                  className="block w-full p-3 rounded-lg border"
                />
                <Field
                  as="textarea"
                  name="bio"
                  placeholder="Bio"
                  className="block w-full p-3 rounded-lg border"
                  rows="3"
                />

                <div className="flex justify-between items-center mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Delete Account Button */}
          <div className="flex justify-between mt-8">
            <button
              onClick={deleteAccount}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
