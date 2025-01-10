import React from "react";
import { Link } from "react-router-dom";

function Button({ label, to }) {
  return (
    <Link to={to}>
      <button className="mt-8 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-blue-500 text-sm sm:text-base md:text-lg lg:text-xl text-black font-bold rounded-full hover:bg-blue-700 transition duration-300 w-40 sm:w-48 md:w-60 lg:w-72">
        {label}
      </button>
    </Link>
  );
}

export default Button;
