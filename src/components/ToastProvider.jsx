import * as Toast from "@radix-ui/react-toast";
import React, { createContext, useState } from "react";
export const ToastContext = createContext({ notify: () => {} });

export default function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const notify = (msg) => {
    setMessage(msg);
    setOpen(false);
    requestAnimationFrame(() => setOpen(true));
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className="toast-root"
        >
          <Toast.Title className="toast-title">Notification</Toast.Title>
          <Toast.Description>{message}</Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="toast-viewport" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
