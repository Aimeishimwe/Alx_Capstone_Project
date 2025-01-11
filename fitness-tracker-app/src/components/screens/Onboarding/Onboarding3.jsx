import React from "react";
import Button from "../../common/Button";

function Onboarding3() {
  return (
    <div className="h-screen flex flex-col">
      {/* Image Section */}
      <div
        className="h-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/Images/Nutr.jpg)` }}
      ></div>

      {/* Text Section */}
      <div className="h-1/2 flex flex-col items-center justify-center bg-gray-900 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
          Find Nutrition Tips That Fit Your Lifestyle
        </h1>
        <div className="mt-4">
          <Button label="Next" to="/Auth/LogInPage" />
        </div>
      </div>
    </div>
  );
}

export default Onboarding3;
