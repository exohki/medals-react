import React from "react";
import "./App.css";

function Country({ id, name, gold, onIncrement, onDelete }) {
  return (
    <div className="country-card">
      <h2>{name}</h2>
      <p className="medal-text">Gold Medals: <strong>{gold}</strong></p>
      
      <div className="button-group">
        <button className="medal-button" onClick={() => onIncrement(id)}>
          Add Gold Medal 🥇
        </button>
        <button className="delete-button" onClick={() => onDelete(id)}>
          ❌ Remove Country
        </button>
      </div>
    </div>
  );
}

export default Country;
