import React from "react";
import Button from "../common/Button";
import backgroundImage from "../common/Images/Background1.jpg"; // Import the image

function WelcomePage() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-fixed text-white flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Use the imported image
    >
      <h1 className="text-4xl font-bold">PulsePoint</h1>
      <p className="text-lg mt-4">Let's Track Your Fitness</p>
      <Button label="Get Started" to="/Onboarding1" />
    </div>
  );
}

export default WelcomePage;
