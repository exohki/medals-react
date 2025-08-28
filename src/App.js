import React, { useState, useRef } from "react";
import Country from "./Country";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([
    { id: 1, name: "United States", gold: 2, silver: 2, bronze: 3 },
    { id: 2, name: "China", gold: 3, silver: 1, bronze: 0 },
    { id: 3, name: "France", gold: 0, silver: 2, bronze: 2 },
  ]);

  const medals = useRef([
    { id: 1, name: "gold" },
    { id: 2, name: "silver" },
    { id: 3, name: "bronze" },
  ]);

  const handleIncrement = (countryId, medalType) => {
    setCountries(
      countries.map((country) =>
        country.id === countryId
          ? { ...country, [medalType]: country[medalType] + 1 }
          : country
      )
    );
  };

  const handleDecrement = (countryId, medalType) => {
    setCountries(
      countries.map((country) =>
        country.id === countryId && country[medalType] > 0
          ? { ...country, [medalType]: country[medalType] - 1 }
          : country
      )
    );
  };

  const deleteCountry = (id) => {
    setCountries(countries.filter((country) => country.id !== id));
  };

  const totalGold = countries.reduce((sum, c) => sum + c.gold, 0);
  const totalSilver = countries.reduce((sum, c) => sum + c.silver, 0);
  const totalBronze = countries.reduce((sum, c) => sum + c.bronze, 0);
  const grandTotal = totalGold + totalSilver + totalBronze;

  return (
    <div className="app-container">
      <h1 className="title">🏅 Olympic Medals 🏅</h1>

      <div className="overall-totals">
        <h2>Overall Totals</h2>
        <p>🥇 Gold: {totalGold}</p>
        <p>🥈 Silver: {totalSilver}</p>
        <p>🥉 Bronze: {totalBronze}</p>
        <p><strong>🏆 Total Medals: {grandTotal}</strong></p>
      </div>

      <div className="countries-list">
        {countries.map((country) => (
          <Country
            key={country.id}
            country={country}
            medals={medals.current}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDelete={deleteCountry}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
