import React, { useState, useEffect, useRef, useContext } from "react";
import Country from "./Country";
import NewCountry from "./NewCountry";
import "./App.css";
import { fetchCountries, addCountry, deleteCountry, patchCountry } from "./api";
import LoginDialog from "./components/LoginDialog";
import TooltipWrap from "./components/TooltipWrap";
import { ToastContext } from "./components/ToastProvider";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [countries, setCountries] = useState([]);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("auth"))
  );
  const { notify } = useContext(ToastContext);

  const medals = useRef([
    { id: 1, name: "gold" },
    { id: 2, name: "silver" },
    { id: 3, name: "bronze" },
  ]);

  useEffect(() => {
    fetchCountries()
      .then(setCountries)
      .catch(() => notify("Failed to load countries"));
  }, [notify]);

  const token = user?.token || "";

  const handleAdd = async (name) => {
    try {
      const newCountry = await addCountry(name, token);
      setCountries([...countries, newCountry]);
      notify(`Added ${name}`);
    } catch {
      notify("Add failed — check your role or token");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCountry(id, token);
      setCountries(countries.filter((c) => c.id !== id));
      notify("Country deleted");
    } catch {
      notify("Delete failed — check your role or token");
    }
  };

  const handleIncrement = async (countryId, medalType) => {
    setCountries((prev) =>
      prev.map((c) =>
        c.id === countryId ? { ...c, [medalType]: c[medalType] + 1 } : c
      )
    );

    const updated = countries.find((c) => c.id === countryId);
    if (updated && user?.token) {
      try {
        await patchCountry(
          { ...updated, [medalType]: updated[medalType] + 1 },
          user.token
        );
      } catch {
        notify("Failed to save medal change");
      }
    }
  };

  const handleDecrement = async (countryId, medalType) => {
    setCountries((prev) =>
      prev.map((c) =>
        c.id === countryId && c[medalType] > 0
          ? { ...c, [medalType]: c[medalType] - 1 }
          : c
      )
    );

    const updated = countries.find((c) => c.id === countryId);
    if (updated && user?.token && updated[medalType] > 0) {
      try {
        await patchCountry(
          { ...updated, [medalType]: updated[medalType] - 1 },
          user.token
        );
      } catch {
        notify("Failed to save medal change");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    notify("Logged out");
  };

  const totalGold = countries.reduce((s, c) => s + c.gold, 0);
  const totalSilver = countries.reduce((s, c) => s + c.silver, 0);
  const totalBronze = countries.reduce((s, c) => s + c.bronze, 0);
  const grandTotal = totalGold + totalSilver + totalBronze;

  return (
    <div className="app-container">
      <header className="app-header">
        <ThemeToggle />
        <h1 className="title">🏅 Olympic Medals 🏅</h1>
        <div className="auth-controls">
          {user ? (
            <TooltipWrap label={`Logged in as ${user.username}`}>
              <button className="auth-btn logout" onClick={logout}>
                🚪 Logout
              </button>
            </TooltipWrap>
          ) : (
            <TooltipWrap label="Login to add or edit countries">
              <LoginDialog onLogin={setUser} className="auth-btn" />
            </TooltipWrap>
          )}
        </div>
      </header>

      <section className="overall-totals">
        <h2>Overall Totals</h2>
        <p>🥇 Gold: {totalGold}</p>
        <p>🥈 Silver: {totalSilver}</p>
        <p>🥉 Bronze: {totalBronze}</p>
        <p>
          <strong>🏆 Total: {grandTotal}</strong>
        </p>
      </section>

      {user && <NewCountry onAdd={handleAdd} />}
      <div className="countries-list">
        {countries.map((country) => (
          <Country
            key={country.id}
            country={country}
            medals={medals.current}
            onDelete={handleDelete}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            canDelete={!!user}
            canEdit={!!user}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
