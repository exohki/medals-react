import React from "react";
import Medal from "./Medal";
import "./App.css";

function Country({ country, medals, onIncrement, onDelete }) {
  return (
    <div className="country-card">
      <h2>{country.name}</h2>

      <div className="medals-container">
        {medals.map((medal) => (
          <Medal
            key={medal.id}
            medal={medal}
            count={country[medal.name]}
            onIncrement={() => onIncrement(country.id, medal.name)}
          />
        ))}
      </div>

      <button className="delete-button" onClick={() => onDelete(country.id)}>
        ❌ Remove Country
      </button>
    </div>
  );
}

export default Country;
