import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Sidebar from "../../common/Sidebar";

const UserProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and profile picture from local storage
    const storedData = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    setProfilePicture(storedData.profilePicture || "");
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
        const userData = JSON.parse(localStorage.getItem("loggedInUser")) || {};
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...userData, profilePicture: reader.result })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePicture = () => {
    setProfilePicture("");
    const userData = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ ...userData, profilePicture: "" })
    );
  };

  const saveChanges = (values) => {
    const updatedData = { ...values, profilePicture };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
    alert("Profile updated successfully!");
    setIsEditing(false); // Exit edit mode after saving changes
  };

  const deleteAccount = () => {
    localStorage.removeItem("loggedInUser");
    alert("All account data has been successfully deleted!");
    navigate("/"); // Redirect to the homepage or login page
  };

  return (
    <div className="flex h-screen">
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
          {/* Form */}
          <Formik
            initialValues={{
              name: "",
              gender: "",
              weight: "",
              height: "",
              fitnessGoals: "",
              bio: "",
              ...JSON.parse(localStorage.getItem("loggedInUser")), // Pre-fill with existing data
            }}
            onSubmit={saveChanges}
          >
            {({ values }) => {
              const fields = [
                "name",
                "gender",
                "weight",
                "height",
                "fitnessGoals",
                "bio",
              ];
              const completedFields = fields.filter((field) =>
                values[field]?.trim()
              );
              const completionPercentage = Math.round(
                (completedFields.length / fields.length) * 100
              );

              return (
                <Form>
                  {/* Progress Bar */}
                  <div className="my-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-center mt-2 text-sm text-gray-600">
                      Profile Completion: {completionPercentage}%
                    </p>
                  </div>

                  {/* Edit Profile Button */}
                  <div className="flex justify-end mb-4">
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

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
                    {!profilePicture && isEditing && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePictureChange}
                        className="mt-2"
                      />
                    )}
                    {profilePicture && isEditing && (
                      <button
                        onClick={deletePicture}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                      >
                        Delete Picture
                      </button>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {[
                      {
                        name: "name",
                        label: "Name",
                        placeholder: "Enter your name",
                      },
                      {
                        name: "gender",
                        label: "Gender",
                        placeholder: "Select Gender",
                        as: "select",
                        options: ["Male", "Female", "Other"],
                      },
                      {
                        name: "weight",
                        label: "Weight (kg)",
                        placeholder: "Enter your weight",
                      },
                      {
                        name: "height",
                        label: "Height (cm)",
                        placeholder: "Enter your height",
                      },
                      {
                        name: "fitnessGoals",
                        label: "Fitness Goals",
                        placeholder: "Enter your fitness goals",
                      },
                      {
                        name: "bio",
                        label: "Bio",
                        placeholder: "Tell us about yourself",
                        as: "textarea",
                      },
                    ].map((field) => (
                      <div key={field.name} className="mb-4">
                        <label className="block font-medium">
                          {field.label}
                        </label>
                        <Field
                          name={field.name}
                          as={field.as || "input"}
                          placeholder={field.placeholder}
                          disabled={!isEditing}
                          className={`block w-full p-3 rounded-lg border ${
                            !isEditing ? "bg-gray-100" : ""
                          }`}
                        >
                          {field.options &&
                            field.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                        </Field>
                      </div>
                    ))}
                  </div>

                  {/* Save Changes Button */}
                  {isEditing && (
                    <div className="flex justify-between mt-6">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </Form>
              );
            }}
          </Formik>

          {/* Delete Account Button */}
          <div className="flex justify-between mt-8">
            <button
              onClick={deleteAccount}
              className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
