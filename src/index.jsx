import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import ToastProvider from "./components/ToastProvider";
import * as Tooltip from "@radix-ui/react-tooltip";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <Tooltip.Provider delayDuration={200}>
        <App />
      </Tooltip.Provider>
    </ToastProvider>
  </React.StrictMode>
);
