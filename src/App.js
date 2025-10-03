import React, { useState, useEffect, useRef } from "react";
import Country from "./Country";
import NewCountry from "./NewCountry";
import "./App.css";
import { fetchCountries, addCountry, deleteCountry } from "./Api";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const medals = useRef([
    { id: 1, name: "gold" },
    { id: 2, name: "silver" },
    { id: 3, name: "bronze" },
  ]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  const handleIncrement = (countryId, medalType) => {
    setCountries(
      countries.map((c) =>
        c.id === countryId ? { ...c, [medalType]: c[medalType] + 1 } : c
      )
    );
  };

  const handleDecrement = (countryId, medalType) => {
    setCountries(
      countries.map((c) =>
        c.id === countryId && c[medalType] > 0
          ? { ...c, [medalType]: c[medalType] - 1 }
          : c
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteCountry(id);
      setCountries(countries.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (name) => {
    try {
      const newCountry = await addCountry(name);
      setCountries([...countries, newCountry]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading countries...</p>;

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
        <p>
          <strong>🏆 Total Medals: {grandTotal}</strong>
        </p>
      </div>

      <NewCountry onAdd={handleAdd} />

      <div className="countries-list">
        {countries.map((country) => (
          <Country
            key={country.id}
            country={country}
            medals={medals.current}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;