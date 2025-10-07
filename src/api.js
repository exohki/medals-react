// ✅ Use your Azure-hosted API base URL
const API_BASE = "https://olympicmedalsapiapp.azurewebsites.net/api/Country";
const AUTH_URL = "https://olympicmedalsapiapp.azurewebsites.net/api/Auth/login";

// ---------------- AUTH ----------------
export const loginUser = async (username, password) => {
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};

// ---------------- COUNTRY ----------------
export const fetchCountries = async () => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
};

export const addCountry = async (name, token) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to add country");
  return res.json();
};

export const deleteCountry = async (id, token) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete country");
  return res;
};

export const patchCountry = async (country, token) => {
  const res = await fetch(`${API_BASE}/${country.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(country),
  });
  if (!res.ok) throw new Error("Failed to update country");
  return res.json();
};

