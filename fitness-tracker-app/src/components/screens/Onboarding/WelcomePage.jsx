import React from "react";
import Button from "../../common/Button";

function WelcomePage() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-fixed text-black flex flex-col items-center justify-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: `url(assets/Images/Background1.jpg)` }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
        PulsePoint
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-4 text-center">
        Let's Track Your Fitness
      </p>
      <div className="mt-6">
        <Button
          label="Get Started"
          to="/Onboarding1"
          className="py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-sm sm:text-base md:text-lg"
        />
      </div>
    </div>
  );
}

export default WelcomePage;
