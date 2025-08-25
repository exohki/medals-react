import React, { useState, useRef } from "react";
import Country from "./Country";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([
    { id: 1, name: "United States", gold: 2, silver: 1, bronze: 0 },
    { id: 2, name: "China", gold: 3, silver: 0, bronze: 1 },
    { id: 3, name: "France", gold: 0, silver: 2, bronze: 2 },
  ]);

  const medals = useRef([
    { id: 1, name: "gold" },
    { id: 2, name: "silver" },
    { id: 3, name: "bronze" },
  ]);

  const incrementMedal = (countryId, medalType) => {
    setCountries(
      countries.map((country) =>
        country.id === countryId
          ? { ...country, [medalType]: country[medalType] + 1 }
          : country
      )
    );
  };

  // Delete country
  const deleteCountry = (id) => {
    setCountries(countries.filter((country) => country.id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="title">🏅 Olympic Medals 🏅</h1>
      <div className="countries-list">
        {countries.map((country) => (
          <Country
            key={country.id}
            country={country}
            medals={medals.current}
            onIncrement={incrementMedal}
            onDelete={deleteCountry}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
