import React from "react";
import Medal from "./Medal";
import "./App.css";

function Country({ country, medals, onIncrement, onDecrement, onDelete }) {
  const total = country.gold + country.silver + country.bronze;

  return (
    <div className="country-card">
      <h2>{country.name}</h2>

      <div className="medals-container">
        {medals.map((medal) => (
          <Medal
            key={medal.id}
            medal={medal}
            count={country[medal.name]}
            countryId={country.id}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        ))}
      </div>

      <p className="total-text">
        🏆 Total Medals: <strong>{total}</strong>
      </p>

      <button className="delete-button" onClick={() => onDelete(country.id)}>
        ❌ Remove Country
      </button>
    </div>
  );
}

export default Country;
