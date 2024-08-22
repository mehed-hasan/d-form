import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
