import React, { useState, useRef } from "react";

function NewCountry({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const dialogRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName("");
      setIsOpen(false);
    }
  };

  return (
    <div className="new-country">
      <button className="add-btn" onClick={() => setIsOpen(true)}>
        ➕ Add Country
      </button>

      {isOpen && (
        <dialog
          ref={dialogRef}
          open
          className="country-dialog"
          onClose={() => setIsOpen(false)}
        >
          <h2>Add New Country</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter country name"
            />
            <div className="dialog-actions">
              <button type="submit">Add</button>
              <button type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default NewCountry;
