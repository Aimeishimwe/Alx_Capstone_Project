import React from "react";
import Button from "../common/Button";
import backgroundImage from "../../assets/Images/Background1.jpg"; // Import the image

function WelcomePage() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-fixed text-white flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Use the imported image
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
        PulsePoint
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl mt-4 text-center">
        Let's Track Your Fitness
      </p>
      <div className="mt-6">
        <Button label="Get Started" to="/Onboarding1" />
      </div>
    </div>
  );
}

export default WelcomePage;
