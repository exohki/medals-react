import React, { useState } from "react";
import Country from "./Country";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([
    { id: 1, name: "United States", gold: 2 },
    { id: 2, name: "China", gold: 3 },
    { id: 3, name: "France", gold: 0 },
  ]);

  // Function to handle incrementing gold medals
  const incrementGold = (id) => {
    setCountries(
      countries.map((country) =>
        country.id === id ? { ...country, gold: country.gold + 1 } : country
      )
    );
  };

  // Function to handle deleting a country
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
            id={country.id}
            name={country.name}
            gold={country.gold}
            onIncrement={incrementGold}
            onDelete={deleteCountry}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
