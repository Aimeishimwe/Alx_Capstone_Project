import React from "react";
import Button from "../common/Button";

function Onboarding1() {
  return (
    <div className="h-screen flex flex-col">
      {/*Image section*/}
      <div
        className="h-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('img.jpg')" }}
      ></div>
      {/*Text section*/}
      <div className="h-1/2 flex flex-col items-center justify-center bg-gray-900 text-black">
        <h1 className="text-4xl font-bold mb-4">Track Your Goals</h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Don't worry if you have trouble determing your goals, We are help to
          support you along the jounry
        </p>
        <Button label="Next" to="/Onboarding2" />
      </div>
    </div>
  );
}
export default Onboarding1;
