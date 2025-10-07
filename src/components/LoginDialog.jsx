import * as Dialog from "@radix-ui/react-dialog";
import React, { useState, useContext } from "react";
import { loginUser } from "../api";
import { ToastContext } from "./ToastProvider";

export default function LoginDialog({ onLogin }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { notify } = useContext(ToastContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await loginUser(username.trim(), password.trim());
      localStorage.setItem("auth", JSON.stringify(user));
      onLogin(user);
      notify(`Welcome, ${user.username}!`);
      setOpen(false);
    } catch {
      setError("Invalid username or password");
      notify("Login failed");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="btn primary">🔐 Login</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">Login</Dialog.Title>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-text">{error}</p>}
            <div className="dialog-actions">
              <button type="submit" className="btn primary">
                Login
              </button>
              <Dialog.Close asChild>
                <button type="button" className="btn secondary">
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
