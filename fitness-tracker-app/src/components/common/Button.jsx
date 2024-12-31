import React from "react";
import { Link } from "react-router-dom";
function Button({ label, to }) {
  return (
    <Link to={to}>
      <button className="mt-8 px-6 py-3 bg-blue-500 text-black font-bold rounded-full hover:bg-blue-700 transition duration-300 w-60">
        {label}
      </button>
    </Link>
  );
}
export default Button;
