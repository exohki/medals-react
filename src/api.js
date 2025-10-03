const API_BASE = "https://olympicmedalsapiapp.azurewebsites.net/api/Country";

export const fetchCountries = async () => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
};

export const addCountry = async (name) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to add country");
  return res.json();
};

export const deleteCountry = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete country");
  return res;
};
