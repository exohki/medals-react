import React from "react";
import "./App.css";

function Medal({ medal, count, countryId, onIncrement, onDecrement }) {
  return (
    <div className="medal-card">
      <span>
        {medal.name.charAt(0).toUpperCase() + medal.name.slice(1)}: {count}
      </span>
      <div className="button-group">
        <button
          className={`medal-button ${medal.name}`}
          onClick={() => onIncrement(countryId, medal.name)}
        >
          +
        </button>
        <button
          className={`medal-button ${medal.name}`}
          onClick={() => onDecrement(countryId, medal.name)}
          disabled={count === 0}
        >
          –
        </button>
      </div>
    </div>
  );
}

export default Medal;
