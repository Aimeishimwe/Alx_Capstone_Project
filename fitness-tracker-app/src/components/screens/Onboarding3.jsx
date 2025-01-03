import React from "react";
import Button from "../common/Button";
import backgroundImage from "../../assets/Images/Nutr.jpg";

function Onboarding3() {
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
          Find Nutrition Tips That Fits Your Life Style
        </h1>
        <div className="mt-4">
          <Button label="Next" to="/LogIn" />
        </div>
      </div>
    </div>
  );
}

export default Onboarding3;
