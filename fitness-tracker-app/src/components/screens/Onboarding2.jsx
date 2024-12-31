import React from "react";
import Button from "../common/Button";

function Onboarding2() {
  return (
    <div className="h-screen flex flex-col">
      {/*Image sction*/}
      <div
        className="h-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('img.jpg')" }}
      ></div>
      <div className="h-1/2 flex flex-col items-center justify-center bg-gray-900">
        <h1 className="text-4xl font-bold text-black">Get Burn</h1>
        <p className="text-left text-lg text-gray-600">
          Let's keep buring to achieve your goals, it hurts only temporarily, if
          you give up now you'll be in pain forever
        </p>
        <Button label="Next" to="/Onboarding3" />
      </div>
    </div>
  );
}
export default Onboarding2;
