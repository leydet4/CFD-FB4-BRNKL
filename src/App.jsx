import React, { useState, useEffect } from "react";
import TripDashboard from "./components/TripDashboard";

export default function App() {
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    // Load CSV dynamically
    fetch("/path-to-your-csv-file.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const rows = csvText.split("\n").slice(1);
        const formattedData = rows.map((row) => {
          const [timestamp, latitude, longitude] = row.split(",");
          return { timestamp: parseInt(timestamp), latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
        });
        setTripData(formattedData);
      });
  }, []);

  return (
    <div>
      <TripDashboard videoSrc="/path-to-your-video.mp4" tripData={tripData} />
    </div>
  );
}
