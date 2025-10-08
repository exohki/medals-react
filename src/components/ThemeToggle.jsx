import React, { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import "./ThemeToggle.css";

function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="theme-toggle">
      <span>☀️</span>
      <Switch.Root
        className="switch-root"
        checked={dark}
        onCheckedChange={setDark}
      >
        <Switch.Thumb className="switch-thumb" />
      </Switch.Root>
      <span>🌙</span>
    </div>
  );
}

export default ThemeToggle;
