import React from "react";
import Button from "../common/Button";

function Onboarding3() {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('img.jpg')" }}
    >
      <div className="text-center text-black">
        <h1 className="text-4xl font-bold mb-4">
          Find Nutrition Tips That Fits Your Life Style
        </h1>
        <Button label="Next" to="/LogIn" />
      </div>
    </div>
  );
}
export default Onboarding3;
