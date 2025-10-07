import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Medal from "./Medal";
import "./App.css";

function Country({ country, medals, onDelete, onIncrement, onDecrement, canDelete, canEdit }) {
  const total = country.gold + country.silver + country.bronze;

  return (
    <div className="country-card">
      <div className="country-card-head">
        <h2>{country.name}</h2>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className="delete-button"
              onClick={() => onDelete(country.id)}
              disabled={!canDelete}
              aria-disabled={!canDelete}
            >
              ❌ Remove
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="tooltip-content" side="left" sideOffset={5}>
              {canDelete ? "Delete this country" : "Need medals-delete or admin"}
              <Tooltip.Arrow className="tooltip-arrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>

      {/* ✅ Render medals */}
      <div className="medals-container">
        {medals.map((medal) => (
          <Medal
            key={medal.id}
            medal={medal}
            count={country[medal.name] ?? 0}
            countryId={country.id}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            canEdit={canEdit}
          />
        ))}
      </div>

      <p className="total-text">
        🏆 Total Medals: <strong>{total}</strong>
      </p>
    </div>
  );
}

export default Country;
