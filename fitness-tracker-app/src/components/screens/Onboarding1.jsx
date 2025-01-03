import React from "react";
import Button from "../common/Button";
import backgroundImage from "../../assets/Images/Onboarding_1.jpg";

function Onboarding1() {
  return (
    <div className="h-screen flex flex-col">
      {/* Image Section */}
      <div
        className="h-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Text Section */}
      <div className="h-1/2 flex flex-col items-center justify-center bg-gray-900 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
          Track Your Goals
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 text-center mt-4">
          Don't worry if you have trouble determining your goals. We are here to
          support you along the journey.
        </p>
        <div className="mt-4">
          <Button label="Next" to="/Onboarding2" />
        </div>
      </div>
    </div>
  );
}

export default Onboarding1;
