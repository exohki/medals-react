import React, { useState } from "react";
import "./App.css";

function Country() {
  const [name] = useState("United States");
  const [gold, setGold] = useState(0);

  const handleClick = () => {
    setGold(gold + 1);
  };

  return (
    <div className="country-card">
      <h2>{name} 🇺🇸</h2>
      <p className="medal-text">Gold Medals: <strong>{gold}</strong></p>
      <button className="medal-button" onClick={handleClick}>
        Add Gold Medal 🥇
      </button>
    </div>
  );
}

export default Country;
