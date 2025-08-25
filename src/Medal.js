import React from "react";
import "./App.css";

function Medal({ medal, count, onIncrement }) {
  return (
    <div className="medal-card">
      <p>
        {medal.name.charAt(0).toUpperCase() + medal.name.slice(1)}:{" "}
        <strong>{count}</strong>
      </p>
      <button className={`medal-button ${medal.name}`} onClick={onIncrement}>
        Add {medal.name} 🏅
      </button>
    </div>
  );
}

export default Medal;
