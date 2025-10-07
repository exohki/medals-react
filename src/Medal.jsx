import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import "./App.css";

function Medal({ medal, count, countryId, onIncrement, onDecrement, canEdit }) {
  return (
    <div className="medal-card">
      <span>
        {medal.name.charAt(0).toUpperCase() + medal.name.slice(1)}: {count}
      </span>

      <div className="button-group">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className={`medal-button ${medal.name}`}
              onClick={() => onIncrement(countryId, medal.name)}
              disabled={!canEdit}
            >
              +
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="tooltip-content" sideOffset={5}>
              {canEdit ? "Add a medal" : "Login required to modify medals"}
              <Tooltip.Arrow className="tooltip-arrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className={`medal-button ${medal.name}`}
              onClick={() => onDecrement(countryId, medal.name)}
              disabled={!canEdit || count === 0}
            >
              –
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="tooltip-content" sideOffset={5}>
              {canEdit ? "Remove a medal" : "Login required to modify medals"}
              <Tooltip.Arrow className="tooltip-arrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </div>
  );
}

export default Medal;
