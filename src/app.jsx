import React from "react";
import TripDashboard from "./components/TripDashboard";

export default function App() {
  return (
    <div>
      <h1>CFD-FB4-BRNKL Dashboard</h1>
      <TripDashboard videoSrc="/path-to-your-video.mp4" tripData={[]} />
    </div>
  );
}
