import React from "react";
import "./Landing.css";

const Landing = ({ onStartShopping }) => {
  return (
    <div>
      <h1>🌱 Welcome to Plant Shop</h1>
      <button onClick={onStartShopping}>Shop Now</button>
    </div>
  );
};

export default Landing;