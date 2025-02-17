import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App"; // ✅ Ensure this path is correct
import "leaflet/dist/leaflet.css"; // If using Leaflet

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
